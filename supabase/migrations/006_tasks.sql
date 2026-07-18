-- 006_tasks.sql
create table tasks (
    id uuid primary key default uuid_generate_v4(),
    project_id uuid references projects(id) on delete cascade,
    title text not null,
    description text,
    status text default 'todo' not null,
    priority text default 'medium' not null,
    due_date date,
    tags text[],
    deleted_at timestamp with time zone,
    deleted_by uuid references profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table task_assignees (
    task_id uuid references tasks(id) on delete cascade,
    staff_id uuid references profiles(id) on delete cascade,
    primary key (task_id, staff_id)
);

create table task_checklists (
    id uuid primary key default uuid_generate_v4(),
    task_id uuid references tasks(id) on delete cascade not null,
    item_text text not null,
    is_completed boolean default false not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table task_comments (
    id uuid primary key default uuid_generate_v4(),
    task_id uuid references tasks(id) on delete cascade not null,
    author_id uuid references profiles(id) on delete cascade not null,
    comment text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table task_attachments (
    id uuid primary key default uuid_generate_v4(),
    task_id uuid references tasks(id) on delete cascade not null,
    uploader_id uuid references profiles(id) on delete cascade not null,
    file_name text not null,
    file_url text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table task_dependencies (
    task_id uuid references tasks(id) on delete cascade,
    depends_on_task_id uuid references tasks(id) on delete cascade,
    primary key (task_id, depends_on_task_id)
);

create table time_logs (
    id uuid primary key default uuid_generate_v4(),
    staff_id uuid references profiles(id) on delete cascade not null,
    task_id uuid references tasks(id) on delete set null,
    duration_minutes integer not null,
    log_date date default current_date not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table leave_requests (
    id uuid primary key default uuid_generate_v4(),
    staff_id uuid references profiles(id) on delete cascade not null,
    start_date date not null,
    end_date date not null,
    type text not null,
    status text default 'pending' not null,
    reason text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table attendance (
    id uuid primary key default uuid_generate_v4(),
    staff_id uuid references profiles(id) on delete cascade not null,
    date date default current_date not null,
    check_in timestamp with time zone,
    check_out timestamp with time zone,
    unique(staff_id, date)
);
