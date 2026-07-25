-- ScriptBridge waitlist table setup
-- Legacy bootstrap only. For current production hardening, run:
-- sql/C-security-hardening.sql

create table if not exists public.waitlist_signups (
  id bigint generated always as identity primary key,
  email text not null unique,
  role text not null check (role in ('creator', 'buyer')),
  source text default 'landing',
  created_at timestamptz not null default now()
);

alter table public.waitlist_signups enable row level security;

-- Supabase/Postgres does not support "create policy if not exists" in all versions,
-- so we drop old policies first, then recreate.
drop policy if exists "waitlist_insert_public" on public.waitlist_signups;
drop policy if exists "waitlist_update_public" on public.waitlist_signups;
drop policy if exists "waitlist_select_public" on public.waitlist_signups;

-- Allow public website visitors to submit waitlist emails.
create policy "waitlist_insert_public"
on public.waitlist_signups
for insert
to anon
with check (
  role in ('creator', 'buyer')
  and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
);

-- Do not allow anonymous select/update here.
-- Use C-security-hardening.sql RPC functions for duplicate handling, public counts,
-- and admin exports.
