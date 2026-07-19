-- 014_outreach.sql
-- Extension to company_settings for AI credentials configuration
alter table public.company_settings add column if not exists ai_base_url text default 'http://localhost:1234/v1';
alter table public.company_settings add column if not exists ai_model_name text default 'local-model';
alter table public.company_settings add column if not exists ai_api_key text;

-- Seed additional feature flag for outreach module
insert into feature_flags (key, name, is_enabled, description)
values ('ai_outreach', 'AI Outreach Module', true, 'Intelligent scraping and local LLM outreach campaigns')
on conflict (key) do update set is_enabled = true;

-- 1. Outreach Campaigns Table
create table outreach_campaigns (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    description text,
    status text default 'active' not null, -- 'active', 'paused', 'completed'
    created_by uuid references profiles(id) on delete set null,
    deleted_at timestamp with time zone,
    deleted_by uuid references profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Outreach Targeted Companies Table
create table outreach_companies (
    id uuid primary key default uuid_generate_v4(),
    campaign_id uuid references outreach_campaigns(id) on delete cascade not null,
    company_name text not null,
    website_url text not null,
    contact_name text,
    contact_email text not null,
    linkedin_url text,
    status text default 'pending' not null, -- 'pending', 'researching', 'analyzed', 'drafted', 'sent', 'failed'
    created_by uuid references profiles(id) on delete set null,
    deleted_at timestamp with time zone,
    deleted_by uuid references profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Scraped Company Research Table
create table company_research (
    id uuid primary key default uuid_generate_v4(),
    company_id uuid references outreach_companies(id) on delete cascade not null unique,
    raw_scrape_content text,
    linkedin_data jsonb,
    merged_notes text,
    confidence_score numeric(4,2) default 0.00,
    created_by uuid references profiles(id) on delete set null,
    deleted_at timestamp with time zone,
    deleted_by uuid references profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Generated AI Structured Reports Table
create table ai_reports (
    id uuid primary key default uuid_generate_v4(),
    company_id uuid references outreach_companies(id) on delete cascade not null unique,
    report_data jsonb not null, -- description, industry, services, opportunities, pain_points, recommended_services, prospect_summary
    created_by uuid references profiles(id) on delete set null,
    deleted_at timestamp with time zone,
    deleted_by uuid references profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Generated Outreach Emails Table
create table generated_emails (
    id uuid primary key default uuid_generate_v4(),
    company_id uuid references outreach_companies(id) on delete cascade not null,
    subject text not null,
    body_text text not null,
    tone text default 'professional' not null, -- 'professional', 'friendly', 'executive', 'casual'
    status text default 'draft' not null, -- 'draft', 'approved', 'sent'
    created_by uuid references profiles(id) on delete set null,
    deleted_at timestamp with time zone,
    deleted_by uuid references profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Sent Outreach Emails Table
create table sent_emails (
    id uuid primary key default uuid_generate_v4(),
    company_id uuid references outreach_companies(id) on delete cascade,
    sender_email text not null,
    recipient_email text not null,
    subject text not null,
    body_html text not null,
    provider text not null, -- 'resend', 'gmail', 'outlook', 'smtp'
    status text default 'sent' not null, -- 'sent', 'delivered', 'opened', 'failed'
    error_message text,
    sent_at timestamp with time zone default timezone('utc'::text, now()) not null,
    created_by uuid references profiles(id) on delete set null,
    deleted_at timestamp with time zone,
    deleted_by uuid references profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Email Dispatch Event Audits Table
create table email_events (
    id uuid primary key default uuid_generate_v4(),
    email_id uuid references sent_emails(id) on delete cascade not null,
    event_type text not null, -- 'sent', 'delivered', 'opened', 'failed'
    error_message text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 8. Email Templates Table
create table email_templates (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    subject text not null,
    body_template text not null,
    created_by uuid references profiles(id) on delete set null,
    deleted_at timestamp with time zone,
    deleted_by uuid references profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table outreach_campaigns enable row level security;
alter table outreach_companies enable row level security;
alter table company_research enable row level security;
alter table ai_reports enable row level security;
alter table generated_emails enable row level security;
alter table sent_emails enable row level security;
alter table email_events enable row level security;
alter table email_templates enable row level security;

-- Policies for Authenticated users
create policy "Auth read campaigns" on outreach_campaigns for select using (auth.uid() is not null and deleted_at is null);
create policy "Auth write campaigns" on outreach_campaigns for all using (auth.uid() is not null);

create policy "Auth read outreach_companies" on outreach_companies for select using (auth.uid() is not null and deleted_at is null);
create policy "Auth write outreach_companies" on outreach_companies for all using (auth.uid() is not null);

create policy "Auth read company_research" on company_research for select using (auth.uid() is not null and deleted_at is null);
create policy "Auth write company_research" on company_research for all using (auth.uid() is not null);

create policy "Auth read ai_reports" on ai_reports for select using (auth.uid() is not null and deleted_at is null);
create policy "Auth write ai_reports" on ai_reports for all using (auth.uid() is not null);

create policy "Auth read generated_emails" on generated_emails for select using (auth.uid() is not null and deleted_at is null);
create policy "Auth write generated_emails" on generated_emails for all using (auth.uid() is not null);

create policy "Auth read sent_emails" on sent_emails for select using (auth.uid() is not null and deleted_at is null);
create policy "Auth write sent_emails" on sent_emails for all using (auth.uid() is not null);

create policy "Auth read email_events" on email_events for select using (auth.uid() is not null);
create policy "Auth write email_events" on email_events for all using (auth.uid() is not null);

create policy "Auth read email_templates" on email_templates for select using (auth.uid() is not null and deleted_at is null);
create policy "Auth write email_templates" on email_templates for all using (auth.uid() is not null);

-- Optimizing Indexes
create index idx_outreach_comp_campaign on outreach_companies(campaign_id);
create index idx_research_company on company_research(company_id);
create index idx_reports_company on ai_reports(company_id);
create index idx_emails_company on generated_emails(company_id);
create index idx_sent_emails_company on sent_emails(company_id);
