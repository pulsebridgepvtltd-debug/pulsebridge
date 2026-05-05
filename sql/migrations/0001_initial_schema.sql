-- ═══════════════════════════════════════════════════════════════
-- 0001 — Initial schema
-- Profiles, demo_requests, contact_messages, jobs + RLS + realtime
-- Run this once after creating the Supabase project.
-- ═══════════════════════════════════════════════════════════════

-- ─── PROFILES (role per user) ──────────────────────────────────
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do nothing;

create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

drop policy if exists "Users read own profile" on public.profiles;
create policy "Users read own profile" on public.profiles
  for select to authenticated using (auth.uid() = id);

-- ─── DEMO REQUESTS ─────────────────────────────────────────────
create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text not null,
  source text,
  status text not null default 'new' check (status in ('new', 'contacted', 'converted', 'archived')),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.demo_requests enable row level security;

drop policy if exists "Anyone submits demo" on public.demo_requests;
create policy "Anyone submits demo" on public.demo_requests
  for insert to anon, authenticated with check (true);

drop policy if exists "Admins read demo" on public.demo_requests;
create policy "Admins read demo" on public.demo_requests
  for select to authenticated using (public.is_admin());

drop policy if exists "Admins update demo" on public.demo_requests;
create policy "Admins update demo" on public.demo_requests
  for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins delete demo" on public.demo_requests;
create policy "Admins delete demo" on public.demo_requests
  for delete to authenticated using (public.is_admin());

-- ─── CONTACT MESSAGES ──────────────────────────────────────────
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  inquiry_type text not null check (inquiry_type in ('Service', 'Clinical', 'Partnership')),
  message text not null,
  status text not null default 'new' check (status in ('new', 'replied', 'archived')),
  notes text,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "Anyone submits message" on public.contact_messages;
create policy "Anyone submits message" on public.contact_messages
  for insert to anon, authenticated with check (true);

drop policy if exists "Admins read messages" on public.contact_messages;
create policy "Admins read messages" on public.contact_messages
  for select to authenticated using (public.is_admin());

drop policy if exists "Admins update messages" on public.contact_messages;
create policy "Admins update messages" on public.contact_messages
  for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins delete messages" on public.contact_messages;
create policy "Admins delete messages" on public.contact_messages
  for delete to authenticated using (public.is_admin());

-- ─── JOBS ──────────────────────────────────────────────────────
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  department text not null,
  location text not null,
  type text not null check (type in ('Full-time', 'Part-time', 'Contract', 'Internship')),
  description text not null,
  requirements text[] not null default '{}',
  responsibilities text[] not null default '{}',
  salary_range text,
  salary_currency text not null default 'USD' check (salary_currency in ('USD', 'INR')),
  apply_email text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.jobs enable row level security;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists jobs_updated_at on public.jobs;
create trigger jobs_updated_at
  before update on public.jobs
  for each row execute function public.set_updated_at();

drop policy if exists "Anyone reads active jobs" on public.jobs;
create policy "Anyone reads active jobs" on public.jobs
  for select to anon, authenticated
  using (active = true or public.is_admin());

drop policy if exists "Admins insert jobs" on public.jobs;
create policy "Admins insert jobs" on public.jobs
  for insert to authenticated with check (public.is_admin());

drop policy if exists "Admins update jobs" on public.jobs;
create policy "Admins update jobs" on public.jobs
  for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins delete jobs" on public.jobs;
create policy "Admins delete jobs" on public.jobs
  for delete to authenticated using (public.is_admin());

-- ─── REALTIME ──────────────────────────────────────────────────
do $$ begin
  alter publication supabase_realtime add table public.demo_requests;
exception when duplicate_object then null; end $$;
do $$ begin
  alter publication supabase_realtime add table public.contact_messages;
exception when duplicate_object then null; end $$;
do $$ begin
  alter publication supabase_realtime add table public.jobs;
exception when duplicate_object then null; end $$;

-- ─── SEED SAMPLE JOBS ──────────────────────────────────────────
insert into public.jobs (title, department, location, type, description, requirements, responsibilities, salary_range, salary_currency, apply_email, active)
select * from (values
  ('Senior Embedded Firmware Engineer', 'Hardware', 'Hyderabad, IN', 'Full-time',
    'Own firmware for our medical wearable line. Build and ship reliable, low-power code on Cortex-M class MCUs running BLE 5.0 stacks.',
    array['5+ years embedded C/C++ in production', 'Hands-on with ARM Cortex-M, RTOS (FreeRTOS/Zephyr)', 'BLE 5.0 stack experience'],
    array['Design, implement, and verify firmware for ECG and biosensor patches', 'Build robust OTA update pipelines', 'Collaborate on V&V protocols'],
    '28L–42L', 'INR', 'careers@pulsebridgehealthcare.com', true),
  ('Cardiologist · Holter Reader', 'Clinical', 'Remote', 'Contract',
    'Provide remote Holter interpretation for our global reading network. Flexible hours, structured handoff.',
    array['Board-certified cardiologist (ABIM or equivalent)', 'Active license in at least one major jurisdiction', 'Prior Holter / MCT reading experience'],
    array['Interpret Holter studies within agreed turnaround time', 'Issue signed cardiology reports through our portal', 'Flag QC issues to upstream device team'],
    'Per-read', 'USD', 'clinical@pulsebridgehealthcare.com', true),
  ('Senior Frontend Engineer', 'Engineering', 'Remote · Global', 'Full-time',
    'Help us build the best clinician dashboard on the market. Next.js 15, React Server Components, and a design system.',
    array['5+ years React in production', 'Strong TypeScript fluency', 'Solid intuition for accessibility and motion design'],
    array['Lead frontend architecture for the live monitoring dashboard', 'Mentor mid-level engineers on the team', 'Partner with design on a shared component library'],
    '140k–185k', 'USD', 'careers@pulsebridgehealthcare.com', true)
) as v
where not exists (select 1 from public.jobs);

-- ─── PROMOTE ADMIN ─────────────────────────────────────────────
update public.profiles
set role = 'admin', updated_at = now()
where email = 'pulsebridge.pvtltd@gmail.com';
