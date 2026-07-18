-- 007_billing.sql
create table quotes (
    id uuid primary key default uuid_generate_v4(),
    client_id uuid references clients(id) on delete cascade not null,
    quote_number text unique not null,
    subtotal numeric(12,2) default 0.00 not null,
    tax numeric(12,2) default 0.00 not null,
    discount numeric(12,2) default 0.00 not null,
    total numeric(12,2) default 0.00 not null,
    status text default 'draft' not null,
    due_date date,
    deleted_at timestamp with time zone,
    deleted_by uuid references profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table quote_items (
    id uuid primary key default uuid_generate_v4(),
    quote_id uuid references quotes(id) on delete cascade not null,
    description text not null,
    quantity integer default 1 not null,
    unit_price numeric(12,2) not null,
    amount numeric(12,2) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table invoices (
    id uuid primary key default uuid_generate_v4(),
    client_id uuid references clients(id) on delete cascade not null,
    quote_id uuid references quotes(id) on delete set null,
    invoice_number text unique not null,
    subtotal numeric(12,2) default 0.00 not null,
    tax numeric(12,2) default 0.00 not null,
    discount numeric(12,2) default 0.00 not null,
    total numeric(12,2) default 0.00 not null,
    status text default 'draft' not null,
    issue_date date default current_date not null,
    due_date date not null,
    deleted_at timestamp with time zone,
    deleted_by uuid references profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table invoice_items (
    id uuid primary key default uuid_generate_v4(),
    invoice_id uuid references invoices(id) on delete cascade not null,
    description text not null,
    quantity integer default 1 not null,
    unit_price numeric(12,2) not null,
    amount numeric(12,2) not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table payments (
    id uuid primary key default uuid_generate_v4(),
    invoice_id uuid references invoices(id) on delete cascade not null,
    amount numeric(12,2) not null,
    payment_date timestamp with time zone default timezone('utc'::text, now()) not null,
    method text not null
);

create table expenses (
    id uuid primary key default uuid_generate_v4(),
    amount numeric(12,2) not null,
    category text not null,
    description text,
    expense_date date default current_date not null,
    logged_by uuid references profiles(id) on delete set null,
    deleted_at timestamp with time zone,
    deleted_by uuid references profiles(id) on delete set null
);
