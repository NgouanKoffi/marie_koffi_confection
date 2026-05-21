# MKC — Setup & Status

## What's built

### Admin panel (`/admin/*`) — fully functional
- Login + auth guard + admins table
- Dashboard with counts
- **Hero & marquee** — brand, hero copy, stats, marquee items
- **Notre équipe** — list/new/edit/delete/reorder
- **Éditorial** — list/new/edit/delete/reorder (Sélection 01-03)
- **Boutique** — products + categories (list/new/edit/delete/reorder, prix FCFA, featured flag, multi-photos)
- **À propos** — meta (atelier, values, founder photo) + values list
- **Parcours** — chapters + stats + highlights + meta (citation, CTA, FB embed, mosaic)
- **Contact & socials** — single form (WhatsApp, email, address, IG/FB/TikTok/LinkedIn)
- **Sections du site** — toggle/reorder homepage sections

### Public site
- ✅ Homepage respects `sections` order/visibility from DB
- ✅ "Notre équipe" section renders when DB has members (after Hero)
- ✅ Marquee uses DB items (fallback to dict if empty)
- ✅ Footer reads contact + socials from DB
- ⏳ Hero, Editorial, LookbookStrip, AboutTeaser still use dict — admin saves to DB but components need wiring
- ⏳ /boutique, /boutique/[slug], /about, /parcours, /contact still use lib/products + dict — need wiring

## Required setup steps (do in order)

### 1. Apply schema in Supabase
- Open Supabase dashboard for `wgawoyygnvfneyifbygz` → SQL Editor
- Paste `supabase/schema.sql` → run
- It creates all tables + RLS + seeds defaults

### 2. Bunny.net storage zone
Create new zone in Bunny dashboard:
- Storage Zone: `mkc-media` (or any name) — note the password
- Pull Zone connected to that storage: ex `mkc-cdn.b-cdn.net`

Update `.env.local`:
```
BUNNY_STORAGE_ZONE=mkc-media
BUNNY_STORAGE_PASSWORD=<your password from Bunny>
NEXT_PUBLIC_BUNNY_CDN_HOST=mkc-cdn.b-cdn.net   # adjust if different
BUNNY_PROJECT_FOLDER=mkc
```

Restart dev server after changing `.env.local`.

### 3. Create admin user
1. Run dev: `npm run dev`
2. Go to `http://localhost:3000/admin/login` — it'll redirect to login
3. Sign up via Supabase Dashboard → Authentication → Users → **Add user** (email + password)
4. Open `supabase/bootstrap-admin.sql`, replace email, run in SQL Editor
5. Now log in at `/admin/login` with that email/password

### 4. Test
- Login → dashboard
- Add a team member → check homepage shows the Team section
- Edit contact → check footer updates after refresh

## Next iteration (TODO — public pages wiring)

Components/pages still using hardcoded data:
1. `components/Hero.tsx` — wire to `getSiteSettings().hero`
2. `components/Editorial.tsx` — wire to `getEditorial()`
3. `components/LookbookStrip.tsx` — wire to `getProducts().filter(featured)`
4. `components/AboutTeaser.tsx` — wire to `getAboutMeta()`
5. `components/ShopGrid.tsx` — wire to `getProducts()` (currently imports `@/lib/products`)
6. `app/[lang]/boutique/[slug]/page.tsx` — fetch via `getProductBySlug()`
7. `app/[lang]/about/page.tsx` — read `getAboutMeta()` + `getAboutValues()`
8. `app/[lang]/parcours/page.tsx` — read `getJourneyChapters/Stats/Highlights/Meta`
9. `app/[lang]/contact/page.tsx` — read `getSiteSettings().contact + .socials`

Pattern for each: replace hardcoded `const data = [...]` with `await getX()` (server component fetch). Translate via `lang === "fr" ? row.field_fr : row.field_en`.

## Notes

- `revalidateTag` was renamed `updateTag` in Next 16 — already using new API.
- `proxy.ts` (was `middleware.ts`) handles locale routing + admin Supabase auth.
- `unstable_cache` cached reads (1h tag-based) — admin actions call `updateTag` to bust.
- Schema tables for editorial/products/etc are empty by default. Admin must populate.
- Until DB is populated, public site shows dict fallback content (so it doesn't break).
- Image uploads will fail until Bunny env vars are filled with real values.
