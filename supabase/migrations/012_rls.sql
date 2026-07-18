-- 012_rls.sql
-- Setup Access Control Helper Functions
create or replace function user_has_permission(perm_name text)
returns boolean as $$
  select exists (
    select 1 
    from public.profiles p
    join public.role_permissions rp on p.role_id = rp.role_id
    join public.permissions per on rp.permission_id = per.id
    where p.id = auth.uid() and per.name = perm_name
  ) or exists (
    select 1 
    from public.profiles p
    join public.roles r on p.role_id = r.id
    where p.id = auth.uid() and r.name = 'owner'
  );
$$ language sql security definer;

-- Enable Row Level Security
alter table profiles enable row level security;
alter table roles enable row level security;
alter table permissions enable row level security;
alter table role_permissions enable row level security;
alter table clients enable row level security;
alter table client_websites enable row level security;
alter table projects enable row level security;
alter table milestones enable row level security;
alter table tasks enable row level security;
alter table task_assignees enable row level security;
alter table task_checklists enable row level security;
alter table task_comments enable row level security;
alter table task_attachments enable row level security;
alter table task_dependencies enable row level security;
alter table time_logs enable row level security;
alter table leave_requests enable row level security;
alter table attendance enable row level security;
alter table quotes enable row level security;
alter table quote_items enable row level security;
alter table invoices enable row level security;
alter table invoice_items enable row level security;
alter table payments enable row level security;
alter table expenses enable row level security;
alter table documents enable row level security;
alter table notifications enable row level security;
alter table notification_preferences enable row level security;
alter table email_logs enable row level security;
alter table company_settings enable row level security;
alter table dashboard_preferences enable row level security;
alter table feature_flags enable row level security;

-- Index Optimization
create index idx_profiles_role_id on profiles(role_id);
create index idx_clients_email on clients(email);
create index idx_projects_status on projects(status);
create index idx_tasks_status on tasks(status);
create index idx_invoices_status on invoices(status);

-- Triggers
create or replace function public.check_owner_modification()
returns trigger as $$
declare
  executor_role text;
  target_role text;
begin
  select r.name into executor_role 
  from public.profiles p 
  join public.roles r on p.role_id = r.id 
  where p.id = auth.uid();

  select r.name into target_role 
  from public.roles r 
  where r.id = old.role_id;

  if target_role = 'owner' then
    if executor_role is null or executor_role != 'owner' then
      raise exception 'Access Denied: Only Owner profiles can update or delete Owner records.';
    end if;
  end if;
  return new;
end;
$$ language plpgsql security definer;

create trigger enforce_owner_lock
  before update or delete on public.profiles
  for each row execute procedure public.check_owner_modification();

create or replace function public.handle_new_user()
returns trigger as $$
declare
  default_role_id uuid;
begin
  select id into default_role_id from public.roles where name = 'staff';
  
  insert into public.profiles (id, first_name, last_name, email, role_id)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', 'New'),
    coalesce(new.raw_user_meta_data->>'last_name', 'Staff'),
    new.email,
    coalesce((new.raw_user_meta_data->>'role_id')::uuid, default_role_id)
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Policies
create policy "Authenticated users can select profiles" on profiles 
    for select using (auth.uid() is not null and deleted_at is null);
create policy "Staff managers can write profiles" on profiles 
    for all using (user_has_permission('manage:staff'));

create policy "Staff crm permission read clients" on clients 
    for select using (user_has_permission('view:crm') and deleted_at is null);
create policy "Staff crm permission write clients" on clients 
    for all using (user_has_permission('view:crm'));

create policy "Staff view projects" on projects 
    for select using (auth.uid() is not null and deleted_at is null);
create policy "Staff write projects" on projects 
    for all using (user_has_permission('view:crm'));

create policy "Staff view tasks" on tasks 
    for select using (auth.uid() is not null and deleted_at is null);
create policy "Staff write tasks" on tasks 
    for all using (auth.uid() is not null);

create policy "Staff read quotes/invoices" on quotes 
    for select using (user_has_permission('view:billing') and deleted_at is null);
create policy "Staff edit quotes/invoices" on quotes 
    for all using (user_has_permission('edit:billing'));

create policy "Staff read invoices" on invoices 
    for select using (user_has_permission('view:billing') and deleted_at is null);
create policy "Staff edit invoices" on invoices 
    for all using (user_has_permission('edit:billing'));
