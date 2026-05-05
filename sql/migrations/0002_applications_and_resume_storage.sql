-- ═══════════════════════════════════════════════════════════════
-- 0002 — Job applications + resume storage
-- Adds:
--   1. `applications` table (linked to jobs, nullable for general apps)
--   2. `resumes` storage bucket (private, 10 MB cap, PDF/DOC/DOCX only)
--   3. RLS — anyone can submit, admins can read/delete
-- ═══════════════════════════════════════════════════════════════

-- ─── APPLICATIONS TABLE ────────────────────────────────────────
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid references public.jobs(id) on delete set null,
  name text not null,
  email text not null,
  phone text,
  resume_path text not null,
  cover_note text,
  status text not null default 'new' check (status in ('new', 'reviewed', 'shortlisted', 'rejected', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.applications enable row level security;

drop policy if exists "Anyone applies" on public.applications;
create policy "Anyone applies" on public.applications
  for insert to anon, authenticated with check (true);

drop policy if exists "Admins read applications" on public.applications;
create policy "Admins read applications" on public.applications
  for select to authenticated using (public.is_admin());

drop policy if exists "Admins update applications" on public.applications;
create policy "Admins update applications" on public.applications
  for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Admins delete applications" on public.applications;
create policy "Admins delete applications" on public.applications
  for delete to authenticated using (public.is_admin());

-- Realtime
do $$ begin
  alter publication supabase_realtime add table public.applications;
exception when duplicate_object then null; end $$;

-- ─── RESUMES BUCKET ────────────────────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'resumes',
  'resumes',
  false,                                -- private bucket — admin reads via signed URLs
  10485760,                             -- 10 MB max per file
  array[
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- ─── STORAGE RLS ───────────────────────────────────────────────
-- Anyone (anon or authed) can upload a resume.
drop policy if exists "Anyone uploads resume" on storage.objects;
create policy "Anyone uploads resume" on storage.objects
  for insert to anon, authenticated
  with check (bucket_id = 'resumes');

-- Only admins can read (download / list).
drop policy if exists "Admins read resumes" on storage.objects;
create policy "Admins read resumes" on storage.objects
  for select to authenticated
  using (bucket_id = 'resumes' and public.is_admin());

-- Only admins can delete.
drop policy if exists "Admins delete resumes" on storage.objects;
create policy "Admins delete resumes" on storage.objects
  for delete to authenticated
  using (bucket_id = 'resumes' and public.is_admin());
