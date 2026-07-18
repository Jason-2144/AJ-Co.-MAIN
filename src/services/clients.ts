import { supabase } from '../lib/supabase';

export interface Client {
  id?: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  website?: string;
  notes?: string;
  deleted_at?: string | null;
  deleted_by?: string | null;
  created_at?: string;
}

export interface Lead {
  id?: string;
  client_id: string;
  title: string;
  value: number;
  stage: 'new' | 'contacted' | 'proposal' | 'negotiation' | 'won' | 'lost';
  notes?: string;
  created_at?: string;
  clients?: Client;
}

export interface MeetingNote {
  id?: string;
  client_id: string;
  title: string;
  notes: string;
  summary?: string;
  created_at?: string;
}

export const clientsService = {
  async getClients(): Promise<Client[]> {
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .is('deleted_at', null)
      .order('company_name', { ascending: true });
    
    if (error) throw error;
    return data || [];
  },

  async createClient(client: Omit<Client, 'id' | 'created_at'>): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .insert(client)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateClient(id: string, client: Partial<Client>): Promise<Client> {
    const { data, error } = await supabase
      .from('clients')
      .update(client)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async softDeleteClient(id: string, userId: string): Promise<void> {
    const { error } = await supabase
      .from('clients')
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: userId
      })
      .eq('id', id);
    
    if (error) throw error;
  },

  async getLeads(): Promise<Lead[]> {
    const { data, error } = await supabase
      .from('leads')
      .select('*, clients(company_name)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<Lead> {
    const { data, error } = await supabase
      .from('leads')
      .insert(lead)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateLead(id: string, lead: Partial<Lead>): Promise<Lead> {
    const { data, error } = await supabase
      .from('leads')
      .update(lead)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getMeetingNotes(clientId: string): Promise<MeetingNote[]> {
    const { data, error } = await supabase
      .from('meeting_notes')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async createMeetingNote(note: Omit<MeetingNote, 'id' | 'created_at'>): Promise<MeetingNote> {
    const { data, error } = await supabase
      .from('meeting_notes')
      .insert(note)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
