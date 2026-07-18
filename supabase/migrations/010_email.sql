-- 010_email.sql
create table email_logs (
    id uuid primary key default uuid_generate_v4(),
    sender text not null,
    recipient text not null,
    subject text not null,
    body_html text,
    status text default 'draft' not null,
    provider text default 'resend' not null,
    sent_time timestamp with time zone,
    delivered_time timestamp with time zone,
    opened_time timestamp with time zone,
    failed_time timestamp with time zone,
    error_message text,
    attachments jsonb,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
