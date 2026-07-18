-- 004_clients.sql
create table clients (
    id uuid primary key default uuid_generate_v4(),
    company_name text not null,
    contact_name text not null,
    email text not null unique,
    phone text,
    website text,
    notes text,
    deleted_at timestamp with time zone,
    deleted_by uuid references profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table leads (
    id uuid primary key default uuid_generate_v4(),
    client_id uuid references clients(id) on delete cascade not null,
    title text not null,
    value numeric(12,2) default 0.00 not null,
    stage text default 'new' not null,
    notes text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table meeting_notes (
    id uuid primary key default uuid_generate_v4(),
    client_id uuid references clients(id) on delete cascade not null,
    title text not null,
    notes text not null,
    summary text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table client_websites (
    id uuid primary key default uuid_generate_v4(),
    client_id uuid references clients(id) on delete cascade not null,
    domain text not null unique,
    registrar text,
    hosting_provider text,
    dns_status text default 'unknown' not null,
    ssl_expiry date,
    repository_link text,
    deployment_platform text,
    search_console_status text,
    analytics_status text,
    renewal_dates jsonb,
    maintenance_notes text,
    deleted_at timestamp with time zone,
    deleted_by uuid references profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
