-- 005_projects.sql
create table projects (
    id uuid primary key default uuid_generate_v4(),
    client_id uuid references clients(id) on delete cascade not null,
    name text not null,
    description text,
    status text default 'planning' not null,
    budget numeric(12,2) default 0.00 not null,
    start_date date,
    due_date date,
    progress_percent integer default 0 not null check (progress_percent >= 0 and progress_percent <= 100),
    deleted_at timestamp with time zone,
    deleted_by uuid references profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table milestones (
    id uuid primary key default uuid_generate_v4(),
    project_id uuid references projects(id) on delete cascade not null,
    name text not null,
    description text,
    due_date date,
    status text default 'pending' not null
);
