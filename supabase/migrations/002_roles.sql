-- 002_roles.sql
create table permissions (
    id uuid primary key default uuid_generate_v4(),
    name text unique not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table roles (
    id uuid primary key default uuid_generate_v4(),
    name text unique not null,
    description text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table role_permissions (
    role_id uuid references roles(id) on delete cascade,
    permission_id uuid references permissions(id) on delete cascade,
    primary key (role_id, permission_id)
);
