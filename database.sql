-- =========================================================
-- KINDLY — Supabase database schema
-- Run this in Supabase: Project → SQL Editor → New query → paste → Run
-- =========================================================

-- 1. Waitlist signups (from the main "Join Waitlist" form)
create table if not exists waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  first_name text not null,
  last_name text not null,
  email text not null,
  country text not null,
  age_range text not null,
  interests text,
  newsletter_opt_in boolean not null default false
);

-- 2. Contact form messages
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  country text,
  reason text,
  message text not null
);

-- 3. Footer newsletter subscribers
create table if not exists newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique
);

-- =========================================================
-- Row Level Security
-- The site uses the public "anon" key in the browser, so RLS
-- must be on, with policies that only allow INSERT — never
-- SELECT/UPDATE/DELETE — from that key. You'll read the data
-- from the Supabase Table Editor (logged in as the owner),
-- which bypasses RLS.
-- =========================================================

alter table waitlist_signups enable row level security;
alter table contact_messages enable row level security;
alter table newsletter_subscribers enable row level security;

create policy "Allow public insert on waitlist_signups"
  on waitlist_signups for insert
  to anon
  with check (true);

create policy "Allow public insert on contact_messages"
  on contact_messages for insert
  to anon
  with check (true);

create policy "Allow public insert on newsletter_subscribers"
  on newsletter_subscribers for insert
  to anon
  with check (true);

-- No select/update/delete policies are created for "anon" —
-- this means the public site can only ever add rows, never
-- read, edit, or delete them. You view/export everything from
-- the Table Editor in the Supabase dashboard, or by connecting
-- with your service_role key (never expose that key in the browser).
