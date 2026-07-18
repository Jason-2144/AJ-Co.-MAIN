-- 003_profiles.sql
create table profiles (
    id uuid primary key references auth.users on delete cascade,
    first_name text not null,
    last_name text not null,
    email text not null unique,
    role_id uuid references roles(id) on delete set null,
    status text default 'active' not null,
    deleted_at timestamp with time zone,
    deleted_by uuid references auth.users(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
