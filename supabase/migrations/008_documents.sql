-- 008_documents.sql
create table documents (
    id uuid primary key default uuid_generate_v4(),
    client_id uuid references clients(id) on delete set null,
    project_id uuid references projects(id) on delete set null,
    category doc_category not null,
    title text not null,
    file_url text not null,
    version integer default 1 not null,
    deleted_at timestamp with time zone,
    deleted_by uuid references profiles(id) on delete set null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
