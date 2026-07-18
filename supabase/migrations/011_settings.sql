-- 011_settings.sql
create table company_settings (
    id text primary key default 'main',
    company_name text not null,
    logo_url text,
    gst_number text,
    address text,
    phone text,
    email text,
    website text,
    invoice_prefix text default 'INV-' not null,
    currency text default 'USD' not null,
    tax_rate numeric(4,2) default 0.00 not null,
    timezone text default 'UTC' not null,
    branding_settings jsonb,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table dashboard_preferences (
    profile_id uuid primary key references profiles(id) on delete cascade,
    widget_positions jsonb not null,
    hidden_widgets jsonb not null,
    sidebar_collapsed boolean default false not null,
    layout_type text default 'standard' not null
);

create table feature_flags (
    id uuid primary key default uuid_generate_v4(),
    key text unique not null,
    name text not null,
    is_enabled boolean default false not null,
    description text
);
