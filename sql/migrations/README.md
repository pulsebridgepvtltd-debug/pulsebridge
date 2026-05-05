# SQL Migrations

Run these in **Supabase → SQL Editor** in numeric order. Each file is idempotent — safe to re-run.

| # | File | Adds |
|---|---|---|
| 1 | [`0001_initial_schema.sql`](./0001_initial_schema.sql) | Profiles · demo_requests · contact_messages · jobs · RLS · realtime · seeds 3 sample jobs · promotes `pulsebridge.pvtltd@gmail.com` to admin |
| 2 | [`0002_applications_and_resume_storage.sql`](./0002_applications_and_resume_storage.sql) | `applications` table · `resumes` storage bucket (private, 10 MB cap, PDF/DOC/DOCX) · storage RLS |
| 3 | [`0003_remove_replied_status.sql`](./0003_remove_replied_status.sql) | Drops the `replied` option from `contact_messages.status` (admins can only view/archive) |

## Adding a new migration

1. Create the next-numbered file: `0004_<short_description>.sql`
2. Always wrap destructive operations in `if exists` / `do $$ exception when …` so the file is idempotent
3. Document the change in this README's table
