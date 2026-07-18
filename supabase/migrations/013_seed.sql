-- 013_seed.sql
-- Seed Core Permissions
insert into permissions (name, description) values
  ('view:billing', 'Can view financial items'),
  ('edit:billing', 'Can modify quotes and invoices'),
  ('delete:billing', 'Can delete invoices'),
  ('view:crm', 'Can view CRM lists'),
  ('manage:staff', 'Can adjust profiles and workloads'),
  ('invite:staff', 'Can invite users'),
  ('delete:staff', 'Can disable users'),
  ('view:reports', 'Can view revenue metrics'),
  ('manage:settings', 'Can update company branding');

-- Seed Core Roles
insert into roles (name, description) values
  ('owner', 'Full unrestricted owner control'),
  ('admin', 'Admin permissions control'),
  ('manager', 'Manager level actions on CRM'),
  ('staff', 'Standard access to assigned tasks');

-- Link Admin to Permissions
insert into role_permissions (role_id, permission_id)
select r.id, p.id from roles r, permissions p where r.name = 'admin';

-- Link Manager to CRM, Billing, Tasks
insert into role_permissions (role_id, permission_id)
select r.id, p.id from roles r, permissions p where r.name = 'manager' and p.name in ('view:billing', 'edit:billing', 'view:crm');

-- Link Staff to CRM only (View)
insert into role_permissions (role_id, permission_id)
select r.id, p.id from roles r, permissions p where r.name = 'staff' and p.name in ('view:crm');

-- Seed Feature Flags
insert into feature_flags (key, name, is_enabled, description) values
  ('email_center', 'Email Center Management', false, 'SMTP messaging core dashboards'),
  ('expenses', 'Expenses Ledger', true, 'Asset mapping dashboards'),
  ('leave_management', 'HR Leave tracker', true, 'Attendance logs trackers'),
  ('ai_helper', 'AI Proposal generators', false, 'AI proposal templates compilation triggers');

-- Seed default company settings row
insert into company_settings (id, company_name, email, website) values
  ('main', 'AJ & Co.', 'team.ajandco@gmail.com', 'https://ajandco.site');
