import { supabase } from '../lib/supabase';

export interface InvoiceItem {
  id?: string;
  invoice_id?: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export interface Invoice {
  id?: string;
  client_id: string;
  quote_id?: string | null;
  invoice_number: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issue_date?: string;
  due_date: string;
  deleted_at?: string | null;
  deleted_by?: string | null;
  created_at?: string;
  invoice_items?: InvoiceItem[];
  clients?: {
    company_name: string;
  };
}

export interface QuoteItem {
  id?: string;
  quote_id?: string;
  description: string;
  quantity: number;
  unit_price: number;
  amount: number;
}

export interface Quote {
  id?: string;
  client_id: string;
  quote_number: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'draft' | 'sent' | 'accepted' | 'declined' | 'invoiced';
  due_date?: string;
  deleted_at?: string | null;
  deleted_by?: string | null;
  created_at?: string;
  quote_items?: QuoteItem[];
  clients?: {
    company_name: string;
  };
}

export interface Expense {
  id?: string;
  amount: number;
  category: string;
  description?: string;
  expense_date: string;
  logged_by?: string | null;
  deleted_at?: string | null;
  deleted_by?: string | null;
}

export const invoicesService = {
  async getInvoices(): Promise<Invoice[]> {
    const { data, error } = await supabase
      .from('invoices')
      .select('*, invoice_items(*), clients(company_name)')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as any || [];
  },

  async createInvoice(invoice: Omit<Invoice, 'id' | 'created_at' | 'invoice_items' | 'clients'>, items: Omit<InvoiceItem, 'id' | 'invoice_id'>[]): Promise<Invoice> {
    const { data: invoiceData, error: invoiceError } = await supabase
      .from('invoices')
      .insert(invoice)
      .select()
      .single();
    
    if (invoiceError) throw invoiceError;

    if (items.length > 0) {
      const itemRows = items.map(item => ({
        ...item,
        invoice_id: invoiceData.id
      }));
      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(itemRows);
      
      if (itemsError) throw itemsError;
    }

    return invoiceData;
  },

  async updateInvoice(id: string, invoice: Partial<Invoice>, items?: Omit<InvoiceItem, 'id' | 'invoice_id'>[]): Promise<Invoice> {
    const { data: invoiceData, error: invoiceError } = await supabase
      .from('invoices')
      .update(invoice)
      .eq('id', id)
      .select()
      .single();
    
    if (invoiceError) throw invoiceError;

    if (items !== undefined) {
      // Clear old items
      const { error: clearError } = await supabase
        .from('invoice_items')
        .delete()
        .eq('invoice_id', id);
      
      if (clearError) throw clearError;

      // Add new items
      if (items.length > 0) {
        const itemRows = items.map(item => ({
          ...item,
          invoice_id: id
        }));
        const { error: itemsError } = await supabase
          .from('invoice_items')
          .insert(itemRows);
        
        if (itemsError) throw itemsError;
      }
    }

    return invoiceData;
  },

  async softDeleteInvoice(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('invoices')
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: userId
      })
      .eq('id', id);
    
    if (error) throw error;
  },

  async getQuotes(): Promise<Quote[]> {
    const { data, error } = await supabase
      .from('quotes')
      .select('*, quote_items(*), clients(company_name)')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as any || [];
  },

  async createQuote(quote: Omit<Quote, 'id' | 'created_at' | 'quote_items' | 'clients'>, items: Omit<QuoteItem, 'id' | 'quote_id'>[]): Promise<Quote> {
    const { data: quoteData, error: quoteError } = await supabase
      .from('quotes')
      .insert(quote)
      .select()
      .single();
    
    if (quoteError) throw quoteError;

    if (items.length > 0) {
      const itemRows = items.map(item => ({
        ...item,
        quote_id: quoteData.id
      }));
      const { error: itemsError } = await supabase
        .from('quote_items')
        .insert(itemRows);
      
      if (itemsError) throw itemsError;
    }

    return quoteData;
  },

  async updateQuote(id: string, quote: Partial<Quote>, items?: Omit<QuoteItem, 'id' | 'quote_id'>[]): Promise<Quote> {
    const { data: quoteData, error: quoteError } = await supabase
      .from('quotes')
      .update(quote)
      .eq('id', id)
      .select()
      .single();
    
    if (quoteError) throw quoteError;

    if (items !== undefined) {
      const { error: clearError } = await supabase
        .from('quote_items')
        .delete()
        .eq('quote_id', id);
      
      if (clearError) throw clearError;

      if (items.length > 0) {
        const itemRows = items.map(item => ({
          ...item,
          quote_id: id
        }));
        const { error: itemsError } = await supabase
          .from('quote_items')
          .insert(itemRows);
        
        if (itemsError) throw itemsError;
      }
    }

    return quoteData;
  },

  async softDeleteQuote(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('quotes')
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: userId
      })
      .eq('id', id);
    
    if (error) throw error;
  },

  async convertQuoteToInvoice(quoteId: string, invoiceNumber: string, dueDate: string): Promise<Invoice> {
    // 1. Fetch quote
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .select('*, quote_items(*)')
      .eq('id', quoteId)
      .single();
    
    if (quoteError) throw quoteError;

    // 2. Create invoice
    const invoice = {
      client_id: quote.client_id,
      quote_id: quote.id,
      invoice_number: invoiceNumber,
      subtotal: quote.subtotal,
      tax: quote.tax,
      discount: quote.discount,
      total: quote.total,
      status: 'draft' as const,
      due_date: dueDate
    };

    const invoiceItems = quote.quote_items.map((item: any) => ({
      description: item.description,
      quantity: item.quantity,
      unit_price: item.unit_price,
      amount: item.amount
    }));

    const newInvoice = await this.createInvoice(invoice, invoiceItems);

    // 3. Mark quote as invoiced
    const { error: updateQuoteError } = await supabase
      .from('quotes')
      .update({ status: 'invoiced' })
      .eq('id', quoteId);
    
    if (updateQuoteError) throw updateQuoteError;

    return newInvoice;
  },

  async getExpenses(): Promise<Expense[]> {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .is('deleted_at', null)
      .order('expense_date', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createExpense(expense: Omit<Expense, 'id' | 'deleted_at' | 'deleted_by'>): Promise<Expense> {
    const { data, error } = await supabase
      .from('expenses')
      .insert(expense)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
