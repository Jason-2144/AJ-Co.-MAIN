-- 009_notifications.sql
create table notifications (
    id uuid primary key default uuid_generate_v4(),
    profile_id uuid references profiles(id) on delete cascade not null,
    title text not null,
    message text not null,
    type text default 'general' not null,
    is_read boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table notification_preferences (
    profile_id uuid primary key references profiles(id) on delete cascade,
    browser_notifications boolean default true not null,
    email_notifications boolean default true not null,
    task_reminders boolean default true not null,
    invoice_alerts boolean default true not null
);
