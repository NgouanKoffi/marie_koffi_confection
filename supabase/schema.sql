-- MARIE KOFFI CONFECTION — admin schema
-- Run in Supabase SQL Editor. Idempotent.

create extension if not exists "pgcrypto";

-- ============================================================
-- ADMINS
-- ============================================================
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

alter table public.admins enable row level security;
drop policy if exists "admin self read" on public.admins;
create policy "admin self read" on public.admins for select using (user_id = auth.uid());

-- ============================================================
-- SITE SETTINGS (single row id=1) — brand, hero, marquee, contact, socials, sections
-- ============================================================
create table if not exists public.site_settings (
  id int primary key default 1,
  brand   jsonb not null default '{}'::jsonb,
  hero    jsonb not null default '{}'::jsonb,
  contact jsonb not null default '{}'::jsonb,
  socials jsonb not null default '{}'::jsonb,
  sections jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
insert into public.site_settings (id) values (1) on conflict (id) do nothing;

-- ============================================================
-- MARQUEE ITEMS (scrolling band under hero)
-- ============================================================
create table if not exists public.marquee_items (
  id uuid primary key default gen_random_uuid(),
  label_fr text not null,
  label_en text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- TEAM MEMBERS (NEW section "Notre équipe")
-- ============================================================
create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role_fr text,
  role_en text,
  bio_fr text,
  bio_en text,
  photo_url text,
  instagram text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- EDITORIAL LOOKS (Sélection 01/02/03 on homepage)
-- ============================================================
create table if not exists public.editorial_looks (
  id uuid primary key default gen_random_uuid(),
  edition_label text not null,     -- "01", "02", "03"
  title_fr text,
  title_en text,
  caption_fr text,
  caption_en text,
  photo_main_url text,
  photo_thumb1_url text,
  photo_thumb2_url text,
  specs jsonb not null default '[]'::jsonb,  -- [{label_fr, label_en, value_fr, value_en}]
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- PRODUCT CATEGORIES
-- ============================================================
create table if not exists public.product_categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  label_fr text not null,
  label_en text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- PRODUCTS (Boutique)
-- ============================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  category_slug text references public.product_categories(slug) on delete set null,
  price_xof int not null default 0,
  fabric_fr text,
  fabric_en text,
  description_fr text,
  description_en text,
  details_fr jsonb not null default '[]'::jsonb,
  details_en jsonb not null default '[]'::jsonb,
  cover_url text,
  featured boolean not null default false,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.product_photos (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  url text not null,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- ABOUT — values + atelier teaser
-- ============================================================
create table if not exists public.about_values (
  id uuid primary key default gen_random_uuid(),
  numeral text not null,
  title_fr text,
  title_en text,
  text_fr text,
  text_en text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.about_meta (
  id int primary key default 1,
  data jsonb not null default '{}'::jsonb,  -- { eyebrow_fr/en, title_fr/en, lead_fr/en, p1_fr/en, p2_fr/en, founder_photo_url, atelier_eyebrow_fr/en, atelier_title_fr/en, atelier_text_fr/en, atelier_photo_left_url, atelier_photo_right_url, cta_fr/en }
  updated_at timestamptz not null default now(),
  constraint about_single_row check (id = 1)
);
insert into public.about_meta (id) values (1) on conflict (id) do nothing;

-- ============================================================
-- JOURNEY (parcours) — chapters + stats + highlights + meta
-- ============================================================
create table if not exists public.journey_chapters (
  id uuid primary key default gen_random_uuid(),
  numeral text not null,           -- "I", "II", "III", ...
  label_fr text,
  label_en text,
  title_fr text,
  title_en text,
  text_fr text,
  text_en text,
  photo_url text,
  extra_photo_url text,            -- chapter V has victoire.png
  year text,
  place_fr text,
  place_en text,
  keywords_fr jsonb not null default '[]'::jsonb,
  keywords_en jsonb not null default '[]'::jsonb,
  detail_fr text,
  detail_en text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.journey_stats (
  id uuid primary key default gen_random_uuid(),
  n text not null,
  label_fr text,
  label_en text,
  value_fr text,
  value_en text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.journey_highlights (
  id uuid primary key default gen_random_uuid(),
  icon text,                       -- lucide icon name
  title_fr text,
  title_en text,
  subtitle_fr text,
  subtitle_en text,
  text_fr text,
  text_en text,
  order_index int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.journey_meta (
  id int primary key default 1,
  data jsonb not null default '{}'::jsonb, -- { quote_fr/en, quote_author_fr/en, cta_eyebrow_fr/en, cta_title_fr/en, cta_lead_fr/en, cta_button_fr/en, fb_embed_url, photo_mosaic: [{url, span_class}] }
  updated_at timestamptz not null default now(),
  constraint journey_single_row check (id = 1)
);
insert into public.journey_meta (id) values (1) on conflict (id) do nothing;

-- ============================================================
-- MEDIA (bunny upload tracking)
-- ============================================================
create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  path text not null,
  url text not null,
  mime text,
  size_bytes bigint,
  uploaded_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

-- ============================================================
-- RLS
-- ============================================================
do $$
declare t text;
begin
  for t in select unnest(array[
    'site_settings','marquee_items','team_members','editorial_looks',
    'product_categories','products','product_photos',
    'about_values','about_meta',
    'journey_chapters','journey_stats','journey_highlights','journey_meta',
    'media'
  ]) loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "%I public read" on public.%I', t, t);
    execute format('create policy "%I public read" on public.%I for select using (true)', t, t);
    execute format('drop policy if exists "%I admin write" on public.%I', t, t);
    execute format('create policy "%I admin write" on public.%I for all using (public.is_admin()) with check (public.is_admin())', t, t);
  end loop;
end $$;

-- ============================================================
-- DEFAULT SEED: site_settings.sections + brand
-- ============================================================
update public.site_settings
   set brand = jsonb_build_object(
        'name', 'Marie Koffi Confection',
        'short', 'MARIE KOFFI',
        'sub', 'CONFECTION',
        'tagline_fr', 'Maison de couture',
        'tagline_en', 'Couture House',
        'subtitle_fr', 'Confection sur mesure & prêt-à-porter',
        'subtitle_en', 'Made-to-measure & Ready-to-wear'
       )
 where id = 1 and (brand is null or brand = '{}'::jsonb);

update public.site_settings
   set sections = jsonb_build_array(
     jsonb_build_object('key','marquee',      'enabled', true),
     jsonb_build_object('key','team',         'enabled', true),
     jsonb_build_object('key','editorial',    'enabled', true),
     jsonb_build_object('key','lookbook',     'enabled', true),
     jsonb_build_object('key','about_teaser', 'enabled', true)
   )
 where id = 1 and (sections is null or jsonb_array_length(sections) = 0);
