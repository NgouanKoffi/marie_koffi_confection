import "server-only";
import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/lib/supabase/public";

export { SECTION_META, DEFAULT_SECTIONS, normalizeSections } from "./sections";
export type { SectionKey, Section } from "./sections";
import { normalizeSections, type Section } from "./sections";

// ============================================================
// Site settings (brand, hero, contact, socials, sections)
// ============================================================

export type Bilingual = { fr?: string; en?: string };

export type BrandData = {
  name?: string;
  short?: string;
  sub?: string;
  tagline_fr?: string; tagline_en?: string;
  subtitle_fr?: string; subtitle_en?: string;
  logo_url?: string;
};

export type HeroData = {
  eyebrow_fr?: string; eyebrow_en?: string;
  title_1_fr?: string; title_1_en?: string;
  title_2_fr?: string; title_2_en?: string;
  title_3_fr?: string; title_3_en?: string;
  lead_fr?: string; lead_en?: string;
  cta_primary_fr?: string; cta_primary_en?: string;
  cta_secondary_fr?: string; cta_secondary_en?: string;
  portrait_url?: string;
  stats?: { n: string; label_fr?: string; label_en?: string }[];
  vertical_left?: string;
  vertical_right?: string;
};

export type ContactData = {
  whatsapp?: string;
  whatsapp_label?: string;
  phone?: string;
  email?: string;
  address_fr?: string; address_en?: string;
};

export type SocialsData = {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  linkedin?: string;
};

export type SiteSettings = {
  brand: BrandData;
  hero: HeroData;
  contact: ContactData;
  socials: SocialsData;
  sections: Section[];
};

export const getSiteSettings = unstable_cache(
  async (): Promise<SiteSettings> => {
    const sb = createPublicClient();
    const { data } = await sb
      .from("site_settings")
      .select("brand, hero, contact, socials, sections")
      .eq("id", 1)
      .maybeSingle();
    return {
      brand:    data?.brand    ?? {},
      hero:     data?.hero     ?? {},
      contact:  data?.contact  ?? {},
      socials:  data?.socials  ?? {},
      sections: normalizeSections(data?.sections),
    };
  },
  ["site_settings"],
  { tags: ["site_settings"], revalidate: 3600 },
);

// ============================================================
// Marquee
// ============================================================

export type MarqueeItem = {
  id: string;
  label_fr: string;
  label_en: string;
};

export const getMarquee = unstable_cache(
  async (): Promise<MarqueeItem[]> => {
    const sb = createPublicClient();
    const { data } = await sb
      .from("marquee_items")
      .select("id, label_fr, label_en")
      .order("order_index");
    return data ?? [];
  },
  ["marquee_items"],
  { tags: ["marquee_items"], revalidate: 3600 },
);

// ============================================================
// Team
// ============================================================

export type TeamMember = {
  id: string;
  name: string;
  role_fr: string | null;
  role_en: string | null;
  bio_fr: string | null;
  bio_en: string | null;
  photo_url: string | null;
  instagram: string | null;
};

export const getTeam = unstable_cache(
  async (): Promise<TeamMember[]> => {
    const sb = createPublicClient();
    const { data } = await sb
      .from("team_members")
      .select("id, name, role_fr, role_en, bio_fr, bio_en, photo_url, instagram")
      .order("order_index")
      .order("created_at");
    return data ?? [];
  },
  ["team_members"],
  { tags: ["team_members"], revalidate: 3600 },
);

// ============================================================
// Editorial looks (Sélection)
// ============================================================

export type EditorialSpec = {
  label_fr?: string; label_en?: string;
  value_fr?: string; value_en?: string;
};

export type EditorialLook = {
  id: string;
  edition_label: string;
  title_fr: string | null;
  title_en: string | null;
  caption_fr: string | null;
  caption_en: string | null;
  photo_main_url: string | null;
  photo_thumb1_url: string | null;
  photo_thumb2_url: string | null;
  specs: EditorialSpec[];
};

export const getEditorial = unstable_cache(
  async (): Promise<EditorialLook[]> => {
    const sb = createPublicClient();
    const { data } = await sb
      .from("editorial_looks")
      .select("id, edition_label, title_fr, title_en, caption_fr, caption_en, photo_main_url, photo_thumb1_url, photo_thumb2_url, specs, order_index")
      .order("order_index");
    return (data ?? []).map((r: any) => ({
      ...r,
      specs: Array.isArray(r.specs) ? r.specs : [],
    }));
  },
  ["editorial_looks"],
  { tags: ["editorial_looks"], revalidate: 3600 },
);

// ============================================================
// Products + categories
// ============================================================

export type ProductCategory = {
  id: string;
  slug: string;
  label_fr: string;
  label_en: string;
};

export const getCategories = unstable_cache(
  async (): Promise<ProductCategory[]> => {
    const sb = createPublicClient();
    const { data } = await sb
      .from("product_categories")
      .select("id, slug, label_fr, label_en")
      .order("order_index");
    return data ?? [];
  },
  ["product_categories"],
  { tags: ["product_categories"], revalidate: 3600 },
);

export type ProductRow = {
  id: string;
  slug: string;
  name: string;
  category_slug: string | null;
  price_xof: number;
  fabric_fr: string | null;
  fabric_en: string | null;
  description_fr: string | null;
  description_en: string | null;
  details_fr: string[];
  details_en: string[];
  cover_url: string | null;
  featured: boolean;
  photos: string[];
};

export const getProducts = unstable_cache(
  async (): Promise<ProductRow[]> => {
    const sb = createPublicClient();
    const { data } = await sb
      .from("products")
      .select(`
        id, slug, name, category_slug, price_xof,
        fabric_fr, fabric_en, description_fr, description_en,
        details_fr, details_en, cover_url, featured, order_index,
        photos:product_photos(url, order_index)
      `)
      .order("order_index");

    return (data ?? []).map((p: any) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category_slug: p.category_slug,
      price_xof: p.price_xof,
      fabric_fr: p.fabric_fr,
      fabric_en: p.fabric_en,
      description_fr: p.description_fr,
      description_en: p.description_en,
      details_fr: Array.isArray(p.details_fr) ? p.details_fr : [],
      details_en: Array.isArray(p.details_en) ? p.details_en : [],
      cover_url: p.cover_url,
      featured: !!p.featured,
      photos: (p.photos ?? [])
        .slice()
        .sort((a: any, b: any) => a.order_index - b.order_index)
        .map((ph: any) => ph.url),
    }));
  },
  ["products"],
  { tags: ["products"], revalidate: 3600 },
);

export async function getProductBySlug(slug: string): Promise<ProductRow | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export const getLatestProducts = unstable_cache(
  async (limit = 10): Promise<ProductRow[]> => {
    const sb = createPublicClient();
    const { data } = await sb
      .from("products")
      .select(`
        id, slug, name, category_slug, price_xof,
        fabric_fr, fabric_en, description_fr, description_en,
        details_fr, details_en, cover_url, featured, order_index,
        photos:product_photos(url, order_index)
      `)
      .order("created_at", { ascending: false })
      .limit(limit);

    return (data ?? []).map((p: any) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      category_slug: p.category_slug,
      price_xof: p.price_xof,
      fabric_fr: p.fabric_fr,
      fabric_en: p.fabric_en,
      description_fr: p.description_fr,
      description_en: p.description_en,
      details_fr: Array.isArray(p.details_fr) ? p.details_fr : [],
      details_en: Array.isArray(p.details_en) ? p.details_en : [],
      cover_url: p.cover_url,
      featured: !!p.featured,
      photos: (p.photos ?? [])
        .slice()
        .sort((a: any, b: any) => a.order_index - b.order_index)
        .map((ph: any) => ph.url),
    }));
  },
  ["latest_products"],
  { tags: ["products"], revalidate: 3600 },
);

// ============================================================
// About
// ============================================================

export type AboutValue = {
  id: string;
  numeral: string;
  title_fr: string | null;
  title_en: string | null;
  text_fr: string | null;
  text_en: string | null;
};

export const getAboutValues = unstable_cache(
  async (): Promise<AboutValue[]> => {
    const sb = createPublicClient();
    const { data } = await sb
      .from("about_values")
      .select("id, numeral, title_fr, title_en, text_fr, text_en")
      .order("order_index");
    return data ?? [];
  },
  ["about_values"],
  { tags: ["about_values"], revalidate: 3600 },
);

export type AboutMeta = {
  // Page À propos
  eyebrow_fr?: string; eyebrow_en?: string;
  title_fr?: string; title_en?: string;
  lead_fr?: string; lead_en?: string;
  p1_fr?: string; p1_en?: string;
  p2_fr?: string; p2_en?: string;
  founder_photo_url?: string;
  cta_fr?: string; cta_en?: string;
  // Bloc Atelier accueil — header
  home_header_eyebrow_fr?: string; home_header_eyebrow_en?: string;
  home_header_title_fr?: string;   home_header_title_en?: string;
  home_lead_fr?: string; home_lead_en?: string;
  // Bloc Atelier accueil — citation
  home_quote_fr?: string; home_quote_en?: string;
  home_quote_author_fr?: string; home_quote_author_en?: string;
  // Bloc Atelier accueil — sous-bloc atelier
  atelier_eyebrow_fr?: string; atelier_eyebrow_en?: string;
  atelier_title_fr?: string; atelier_title_en?: string;
  atelier_text_fr?: string; atelier_text_en?: string;
  atelier_photo_left_url?: string;
  atelier_photo_right_url?: string;
  atelier_cta_fr?: string; atelier_cta_en?: string;
  // Bloc Atelier accueil — parcours 4 étapes
  home_steps?: { year: string; label_fr: string; label_en: string; text_fr: string; text_en: string }[];
};

export const getAboutMeta = unstable_cache(
  async (): Promise<AboutMeta> => {
    const sb = createPublicClient();
    const { data } = await sb
      .from("about_meta")
      .select("data")
      .eq("id", 1)
      .maybeSingle();
    return (data?.data ?? {}) as AboutMeta;
  },
  ["about_meta"],
  { tags: ["about_meta"], revalidate: 3600 },
);

// ============================================================
// Journey (parcours)
// ============================================================

export type JourneyChapter = {
  id: string;
  numeral: string;
  label_fr: string | null;
  label_en: string | null;
  title_fr: string | null;
  title_en: string | null;
  text_fr: string | null;
  text_en: string | null;
  photo_url: string | null;
  extra_photo_url: string | null;
  year: string | null;
  place_fr: string | null;
  place_en: string | null;
  keywords_fr: string[];
  keywords_en: string[];
  detail_fr: string | null;
  detail_en: string | null;
};

export const getJourneyChapters = unstable_cache(
  async (): Promise<JourneyChapter[]> => {
    const sb = createPublicClient();
    const { data } = await sb
      .from("journey_chapters")
      .select("*")
      .order("order_index");
    return (data ?? []).map((c: any) => ({
      ...c,
      keywords_fr: Array.isArray(c.keywords_fr) ? c.keywords_fr : [],
      keywords_en: Array.isArray(c.keywords_en) ? c.keywords_en : [],
    }));
  },
  ["journey_chapters"],
  { tags: ["journey_chapters"], revalidate: 3600 },
);

export type JourneyStat = {
  id: string;
  n: string;
  label_fr: string | null;
  label_en: string | null;
  value_fr: string | null;
  value_en: string | null;
};

export const getJourneyStats = unstable_cache(
  async (): Promise<JourneyStat[]> => {
    const sb = createPublicClient();
    const { data } = await sb
      .from("journey_stats")
      .select("id, n, label_fr, label_en, value_fr, value_en")
      .order("order_index");
    return data ?? [];
  },
  ["journey_stats"],
  { tags: ["journey_stats"], revalidate: 3600 },
);

export type JourneyHighlight = {
  id: string;
  icon: string | null;
  title_fr: string | null;
  title_en: string | null;
  subtitle_fr: string | null;
  subtitle_en: string | null;
  text_fr: string | null;
  text_en: string | null;
};

export const getJourneyHighlights = unstable_cache(
  async (): Promise<JourneyHighlight[]> => {
    const sb = createPublicClient();
    const { data } = await sb
      .from("journey_highlights")
      .select("id, icon, title_fr, title_en, subtitle_fr, subtitle_en, text_fr, text_en")
      .order("order_index");
    return data ?? [];
  },
  ["journey_highlights"],
  { tags: ["journey_highlights"], revalidate: 3600 },
);

export type JourneyMeta = {
  quote_fr?: string; quote_en?: string;
  quote_author_fr?: string; quote_author_en?: string;
  cta_eyebrow_fr?: string; cta_eyebrow_en?: string;
  cta_title_fr?: string; cta_title_en?: string;
  cta_lead_fr?: string; cta_lead_en?: string;
  cta_button_fr?: string; cta_button_en?: string;
  fb_embed_url?: string;
  photo_mosaic?: { url: string; span_class?: string }[];
};

export const getJourneyMeta = unstable_cache(
  async (): Promise<JourneyMeta> => {
    const sb = createPublicClient();
    const { data } = await sb
      .from("journey_meta")
      .select("data")
      .eq("id", 1)
      .maybeSingle();
    return (data?.data ?? {}) as JourneyMeta;
  },
  ["journey_meta"],
  { tags: ["journey_meta"], revalidate: 3600 },
);
