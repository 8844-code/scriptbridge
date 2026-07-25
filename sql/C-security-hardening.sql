-- ScriptBridge security hardening
-- Run in Supabase SQL Editor after reviewing table/column names against production.

update storage.buckets
set public = false
where id = 'scripts-files';

update public.scripts
set file_url = split_part(file_url, '/storage/v1/object/public/scripts-files/', 2)
where file_url like '%/storage/v1/object/public/scripts-files/%';

alter table public.waitlist_signups enable row level security;
alter table public.scripts enable row level security;
alter table public.purchase_requests enable row level security;

drop policy if exists "waitlist_insert_public" on public.waitlist_signups;
drop policy if exists "waitlist_update_public" on public.waitlist_signups;
drop policy if exists "waitlist_select_public" on public.waitlist_signups;

create policy "waitlist_insert_public"
on public.waitlist_signups
for insert
to anon
with check (
  role in ('creator', 'buyer')
  and email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
);

create or replace function public.upsert_waitlist_signup(
  p_email text,
  p_role text,
  p_source text default 'landing'
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  already_exists boolean;
begin
  if p_role not in ('creator', 'buyer') then
    raise exception 'Invalid role';
  end if;

  if p_email !~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$' then
    raise exception 'Invalid email';
  end if;

  select exists (
    select 1 from public.waitlist_signups where email = lower(trim(p_email))
  ) into already_exists;

  insert into public.waitlist_signups(email, role, source)
  values (lower(trim(p_email)), p_role, coalesce(p_source, 'landing'))
  on conflict (email) do update
  set role = excluded.role,
      source = excluded.source;

  return already_exists;
end;
$$;

create or replace function public.waitlist_public_count()
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::integer from public.waitlist_signups;
$$;

create or replace function public.admin_waitlist_rows()
returns table(email text, role text, created_at timestamptz)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.email() <> 'qtian904@gmail.com' then
    raise exception 'Access restricted';
  end if;

  return query
  select w.email, w.role, w.created_at
  from public.waitlist_signups w
  order by w.created_at desc;
end;
$$;

create or replace function public.get_public_author_names(p_user_ids text[])
returns table(user_id text, full_name text)
language sql
security definer
set search_path = public
as $$
  select u.user_id::text, coalesce(nullif(u.full_name, ''), 'Unknown author') as full_name
  from public.users u
  where u.user_id::text = any(p_user_ids);
$$;

drop policy if exists "scripts_owner_select" on public.scripts;
drop policy if exists "scripts_owner_insert" on public.scripts;
drop policy if exists "scripts_owner_update" on public.scripts;
drop policy if exists "scripts_owner_delete" on public.scripts;

create policy "scripts_owner_select"
on public.scripts
for select
to authenticated
using (user_id = auth.uid());

create policy "scripts_owner_insert"
on public.scripts
for insert
to authenticated
with check (user_id = auth.uid());

create policy "scripts_owner_update"
on public.scripts
for update
to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "scripts_owner_delete"
on public.scripts
for delete
to authenticated
using (user_id = auth.uid());

create or replace function public.list_published_scripts()
returns table(
  id text,
  title text,
  description text,
  script_type text,
  price numeric,
  created_at timestamptz,
  user_id text,
  rights_type text,
  region text,
  rights_years text,
  status text,
  preview_text text
)
language sql
security definer
set search_path = public
as $$
  select
    s.id::text,
    s.title,
    s.description,
    s.script_type,
    s.price,
    s.created_at,
    s.user_id::text,
    s.rights_type,
    s.region,
    s.rights_years,
    s.status,
    s.preview_text
  from public.scripts s
  where s.status = 'published'
  order by s.created_at desc;
$$;

create or replace function public.get_script_detail(p_script_id text)
returns table(
  id text,
  title text,
  description text,
  script_type text,
  price numeric,
  created_at timestamptz,
  user_id text,
  rights_type text,
  region text,
  rights_years text,
  status text,
  preview_text text
)
language sql
security definer
set search_path = public
as $$
  select
    s.id::text,
    s.title,
    s.description,
    s.script_type,
    s.price,
    s.created_at,
    s.user_id::text,
    s.rights_type,
    s.region,
    s.rights_years,
    s.status,
    s.preview_text
  from public.scripts s
  where s.id::text = p_script_id
    and (
      s.status = 'published'
      or s.user_id = auth.uid()
      or exists (
        select 1
        from public.purchase_requests pr
        where pr.script_id::text = s.id::text
          and pr.buyer_id = auth.uid()
          and pr.status = 'accepted'
      )
    );
$$;

create or replace function public.get_script_file_path(p_script_id text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  file_path text;
begin
  select s.file_url
  into file_path
  from public.scripts s
  where s.id::text = p_script_id
    and (
      s.user_id = auth.uid()
      or exists (
        select 1
        from public.purchase_requests pr
        where pr.script_id::text = s.id::text
          and pr.buyer_id = auth.uid()
          and pr.status = 'accepted'
      )
    );

  return file_path;
end;
$$;

drop policy if exists "purchase_requests_participant_select" on public.purchase_requests;
drop policy if exists "purchase_requests_buyer_insert" on public.purchase_requests;
drop policy if exists "purchase_requests_seller_update" on public.purchase_requests;

create policy "purchase_requests_participant_select"
on public.purchase_requests
for select
to authenticated
using (buyer_id = auth.uid() or seller_id = auth.uid());

create policy "purchase_requests_buyer_insert"
on public.purchase_requests
for insert
to authenticated
with check (buyer_id = auth.uid() and seller_id <> auth.uid());

create policy "purchase_requests_seller_update"
on public.purchase_requests
for update
to authenticated
using (seller_id = auth.uid())
with check (seller_id = auth.uid());

create or replace function public.review_purchase_request(
  p_request_id text,
  p_status text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  target_request public.purchase_requests%rowtype;
  target_rights text;
begin
  if p_status not in ('accepted', 'rejected') then
    raise exception 'Invalid status';
  end if;

  select *
  into target_request
  from public.purchase_requests
  where id::text = p_request_id
    and seller_id = auth.uid()
  for update;

  if not found then
    raise exception 'Request not found';
  end if;

  update public.purchase_requests
  set status = p_status
  where id::text = p_request_id
    and seller_id = auth.uid();

  if p_status = 'accepted' then
    select rights_type
    into target_rights
    from public.scripts
    where id::text = target_request.script_id::text
    for update;

    if target_rights in ('exclusive', '独家授权', '独家') then
      update public.scripts
      set status = 'sold'
      where id::text = target_request.script_id::text
        and user_id = auth.uid();
    end if;
  end if;
end;
$$;

drop policy if exists "scripts_files_owner_insert" on storage.objects;
drop policy if exists "scripts_files_authorized_select" on storage.objects;
drop policy if exists "scripts_files_owner_update" on storage.objects;
drop policy if exists "scripts_files_owner_delete" on storage.objects;

create policy "scripts_files_owner_insert"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'scripts-files'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "scripts_files_authorized_select"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'scripts-files'
  and (
    (storage.foldername(name))[1] = auth.uid()::text
    or exists (
      select 1
      from public.scripts s
      where s.file_url = name
        and exists (
          select 1
          from public.purchase_requests pr
          where pr.script_id::text = s.id::text
            and pr.buyer_id = auth.uid()
            and pr.status = 'accepted'
        )
    )
  )
);

create policy "scripts_files_owner_update"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'scripts-files'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'scripts-files'
  and (storage.foldername(name))[1] = auth.uid()::text
);

create policy "scripts_files_owner_delete"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'scripts-files'
  and (storage.foldername(name))[1] = auth.uid()::text
);

grant execute on function public.upsert_waitlist_signup(text, text, text) to anon, authenticated;
grant execute on function public.waitlist_public_count() to anon, authenticated;
grant execute on function public.admin_waitlist_rows() to authenticated;
grant execute on function public.get_public_author_names(text[]) to anon, authenticated;
grant execute on function public.list_published_scripts() to anon, authenticated;
grant execute on function public.get_script_detail(text) to authenticated;
grant execute on function public.get_script_file_path(text) to authenticated;
grant execute on function public.review_purchase_request(text, text) to authenticated;
