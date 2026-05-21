// MKC seed — migrate hardcoded site content into Supabase + Bunny.
// Run: npm run seed
//
// Skips: products + product photos (admin will create those).
// Idempotent: re-running won't duplicate rows; same local image uploads to Bunny once.

import { readFileSync, existsSync } from "node:fs";
import { resolve, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const __filename = fileURLToPath(import.meta.url);
const __root     = resolve(__filename, "../../");

// ============================================================
// ENV
// ============================================================
const need = (k) => {
  const v = process.env[k];
  if (!v) {
    console.error(`✘ Missing env: ${k}`);
    process.exit(1);
  }
  return v;
};

const SUPABASE_URL   = need("NEXT_PUBLIC_SUPABASE_URL");
const SERVICE_KEY    = need("SUPABASE_SERVICE_ROLE_KEY");
const BUNNY_HOST     = process.env.BUNNY_STORAGE_HOST || "storage.bunnycdn.com";
const BUNNY_ZONE     = need("BUNNY_STORAGE_ZONE");
const BUNNY_PASSWORD = need("BUNNY_STORAGE_PASSWORD");
const BUNNY_CDN      = need("NEXT_PUBLIC_BUNNY_CDN_HOST");
const BUNNY_FOLDER   = process.env.BUNNY_PROJECT_FOLDER || "mkc";

const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

// ============================================================
// BUNNY UPLOAD (with local dedup cache)
// ============================================================
const MIME_BY_EXT = {
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png":  "image/png",
  ".webp": "image/webp",
  ".gif":  "image/gif",
  ".avif": "image/avif",
};

const uploadCache = new Map(); // localPath -> CDN url

async function uploadOne(localRel, subfolder) {
  if (!localRel) return null;
  if (uploadCache.has(localRel)) return uploadCache.get(localRel);

  const localAbs = resolve(__root, "public", localRel.replace(/^\/+/, ""));
  if (!existsSync(localAbs)) {
    console.warn(`  ! local file missing: ${localRel}`);
    uploadCache.set(localRel, null);
    return null;
  }

  const buf = readFileSync(localAbs);
  const ext = extname(localAbs).toLowerCase();
  const mime = MIME_BY_EXT[ext] || "application/octet-stream";
  const safeExt = ext === ".jpeg" ? ".jpg" : ext;
  const key = `${BUNNY_FOLDER}/${subfolder}/${randomUUID()}${safeExt}`;
  const url = `https://${BUNNY_CDN}/${key}`;

  const res = await fetch(`https://${BUNNY_HOST}/${BUNNY_ZONE}/${key}`, {
    method: "PUT",
    headers: { AccessKey: BUNNY_PASSWORD, "Content-Type": "application/octet-stream" },
    body: buf,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    console.error(`  ✘ Bunny upload failed (${res.status}) ${localRel}: ${txt}`);
    uploadCache.set(localRel, null);
    return null;
  }

  // best-effort: track in media table
  try {
    await sb.from("media").insert({ path: key, url, mime, size_bytes: buf.byteLength });
  } catch {}

  console.log(`  ✓ uploaded ${basename(localRel)} -> ${url}`);
  uploadCache.set(localRel, url);
  return url;
}

// ============================================================
// SECTION 1 — site_settings (hero text, contact, socials, brand)
// ============================================================
async function seedSiteSettings() {
  console.log("→ site_settings (hero + contact + socials + brand)");

  const hero = {
    eyebrow_fr: "Maison de couture · Côte d'Ivoire",
    eyebrow_en: "Couture House · Côte d'Ivoire",
    title_1_fr: "L'élégance",      title_1_en: "African",
    title_2_fr: "africaine",       title_2_en: "elegance",
    title_3_fr: "réinventée",      title_3_en: "reimagined",
    lead_fr: "Pièces uniques, confection sur mesure et prêt-à-porter signés Marie Koffi. Chaque création est pensée pour célébrer la femme moderne.",
    lead_en: "Unique pieces, made-to-measure and ready-to-wear by Marie Koffi. Every creation is designed to celebrate the modern woman.",
    cta_primary_fr: "Voir la boutique",   cta_primary_en: "Shop the collection",
    cta_secondary_fr: "Prendre rendez-vous", cta_secondary_en: "Book a fitting",
    vertical_left:  "EST · 2024 · ABIDJAN",
    vertical_right: "N° 01 — LA COLLECTION",
    stats: [
      { n: "80+",  label_fr: "Créations", label_en: "Creations" },
      { n: "100%", label_fr: "Fait main", label_en: "Handmade" },
      { n: "01",   label_fr: "Maison",    label_en: "House" },
    ],
  };

  const contact = {
    whatsapp: "2250757595849",
    whatsapp_label: "+225 07 57 59 58 49",
    phone: "",
    email: "mkconfection@gmail.com",
    address_fr: "Abidjan, Côte d'Ivoire",
    address_en: "Abidjan, Côte d'Ivoire",
  };

  const socials = {
    instagram: "mariekoffi",
    facebook:  "",
    tiktok:    "",
    linkedin:  "",
  };

  const brand = {
    name: "Marie Koffi Confection",
    short: "MARIE KOFFI",
    sub: "CONFECTION",
    tagline_fr: "Maison de couture",
    tagline_en: "Couture House",
    subtitle_fr: "Confection sur mesure & prêt-à-porter",
    subtitle_en: "Made-to-measure & Ready-to-wear",
  };

  const { error } = await sb.from("site_settings").update({ hero, contact, socials, brand }).eq("id", 1);
  if (error) throw error;
  console.log("  ✓ site_settings updated");
}

// ============================================================
// SECTION 2 — marquee_items
// ============================================================
async function seedMarquee() {
  console.log("→ marquee_items");

  const items = [
    { label_fr: "Maison de couture",      label_en: "Couture House" },
    { label_fr: "Confection sur mesure",  label_en: "Made-to-measure" },
    { label_fr: "Prêt-à-porter",          label_en: "Ready-to-wear" },
    { label_fr: "Abidjan · Côte d'Ivoire", label_en: "Abidjan · Côte d'Ivoire" },
    { label_fr: "Pièces uniques",         label_en: "One-of-a-kind" },
  ];

  for (let i = 0; i < items.length; i++) {
    const m = items[i];
    const { data: existing } = await sb
      .from("marquee_items")
      .select("id")
      .eq("label_fr", m.label_fr)
      .maybeSingle();
    if (existing) {
      console.log(`  · skip "${m.label_fr}" (exists)`);
      continue;
    }
    const { error } = await sb.from("marquee_items").insert({ ...m, order_index: i });
    if (error) throw error;
    console.log(`  ✓ ${m.label_fr}`);
  }
}

// ============================================================
// SECTION 3 — product_categories
// ============================================================
async function seedCategories() {
  console.log("→ product_categories");

  const cats = [
    { slug: "soiree",        label_fr: "Robes de soirée",       label_en: "Evening gowns" },
    { slug: "traditionnel",  label_fr: "Tenues traditionnelles", label_en: "Traditional wear" },
    { slug: "ensemble",      label_fr: "Ensembles",             label_en: "Sets & suits" },
    { slug: "pret-a-porter", label_fr: "Prêt-à-porter",         label_en: "Ready-to-wear" },
    { slug: "mariee",        label_fr: "Mariée",                label_en: "Bridal" },
  ];

  for (let i = 0; i < cats.length; i++) {
    const c = cats[i];
    const { data: existing } = await sb
      .from("product_categories")
      .select("id")
      .eq("slug", c.slug)
      .maybeSingle();
    if (existing) {
      console.log(`  · skip ${c.slug} (exists)`);
      continue;
    }
    const { error } = await sb.from("product_categories").insert({ ...c, order_index: i });
    if (error) throw error;
    console.log(`  ✓ ${c.slug}`);
  }
}

// ============================================================
// SECTION 4 — editorial_looks
// ============================================================
async function seedEditorial() {
  console.log("→ editorial_looks");

  const looks = [
    {
      edition_label: "01",
      title_fr: "Wax & Volants",
      title_en: "Wax & Ruffles",
      caption_fr: "Confection sur mesure, organza teinté à la main. Volants en cascade, plastron brodé, manches bouffantes signature de la maison.",
      caption_en: "Bespoke, hand-dyed organza. Cascading ruffles, embroidered front, signature puff sleeves.",
      main:  "/gallery/look-05.jpeg",
      thumb1: "/gallery/look-06.jpeg",
      thumb2: "/gallery/look-07.jpeg",
      specs: [
        { label_fr: "Tissu",   label_en: "Fabric",    value_fr: "Coton organique",         value_en: "Organic cotton" },
        { label_fr: "Coupe",   label_en: "Cut",       value_fr: "Ample, manches bouffantes", value_en: "Loose, puff sleeves" },
        { label_fr: "Délai",   label_en: "Lead time", value_fr: "Sur-mesure · 6 essayages", value_en: "Bespoke · 6 fittings" },
        { label_fr: "Origine", label_en: "Origin",    value_fr: "Atelier Abidjan",          value_en: "Atelier Abidjan" },
      ],
    },
    {
      edition_label: "02",
      title_fr: "Tradition contemporaine",
      title_en: "Contemporary Tradition",
      caption_fr: "Robe longue, coton imprimé Korhogo, ceinture nouée. Manches asymétriques, dos ouvert, finitions main.",
      caption_en: "Long dress, printed Korhogo cotton, tied belt. Asymmetric sleeves, open back, hand finishings.",
      main:  "/gallery/look-18.jpeg",
      thumb1: "/gallery/look-19.jpeg",
      thumb2: "/gallery/look-20.jpeg",
      specs: [
        { label_fr: "Tissu",    label_en: "Fabric",  value_fr: "Coton imprimé Korhogo", value_en: "Korhogo printed cotton" },
        { label_fr: "Doublure", label_en: "Lining",  value_fr: "Soie naturelle",        value_en: "Natural silk" },
        { label_fr: "Édition",  label_en: "Edition", value_fr: "Pièce unique",          value_en: "One-of-a-kind" },
        { label_fr: "Origine",  label_en: "Origin",  value_fr: "Atelier Abidjan",       value_en: "Atelier Abidjan" },
      ],
    },
    {
      edition_label: "03",
      title_fr: "Silhouette d'audace",
      title_en: "Bold Silhouette",
      caption_fr: "Pièce unique. Confection atelier Abidjan. Drapé sculpté, fluidité maîtrisée, finitions exécutées à la main.",
      caption_en: "One-of-a-kind. Made in Abidjan atelier. Sculpted drape, fluid yet structured, hand-finished.",
      main:  "/gallery/look-31.jpeg",
      thumb1: "/gallery/look-32.jpeg",
      thumb2: "/gallery/look-33.jpeg",
      specs: [
        { label_fr: "Tissu",    label_en: "Fabric", value_fr: "Soie sauvage",     value_en: "Wild silk" },
        { label_fr: "Détail",   label_en: "Detail", value_fr: "Drapé sculpté",    value_en: "Sculpted drape" },
        { label_fr: "Finition", label_en: "Finish", value_fr: "Hand-finishing",   value_en: "Hand-finishing" },
        { label_fr: "Origine",  label_en: "Origin", value_fr: "Atelier Abidjan",  value_en: "Atelier Abidjan" },
      ],
    },
  ];

  for (let i = 0; i < looks.length; i++) {
    const l = looks[i];
    const { data: existing } = await sb
      .from("editorial_looks")
      .select("id")
      .eq("edition_label", l.edition_label)
      .maybeSingle();
    if (existing) {
      console.log(`  · skip édition ${l.edition_label} (exists)`);
      continue;
    }
    const [main, thumb1, thumb2] = await Promise.all([
      uploadOne(l.main,   "editorial"),
      uploadOne(l.thumb1, "editorial"),
      uploadOne(l.thumb2, "editorial"),
    ]);
    const { error } = await sb.from("editorial_looks").insert({
      edition_label: l.edition_label,
      title_fr: l.title_fr, title_en: l.title_en,
      caption_fr: l.caption_fr, caption_en: l.caption_en,
      photo_main_url: main,
      photo_thumb1_url: thumb1,
      photo_thumb2_url: thumb2,
      specs: l.specs,
      order_index: i,
    });
    if (error) throw error;
    console.log(`  ✓ édition ${l.edition_label}`);
  }
}

// ============================================================
// SECTION 5 — about_meta + about_values
// ============================================================
async function seedAbout() {
  console.log("→ about_meta + about_values");

  const founder = await uploadOne("/mesphotos/portrait.jpeg", "about");
  const atelierL = await uploadOne("/gallery/look-22.jpeg", "about");
  const atelierR = await uploadOne("/gallery/look-45.jpeg", "about");

  const aboutData = {
    eyebrow_fr: "La maison",
    eyebrow_en: "The house",
    title_fr: "À propos",
    title_en: "About",
    lead_fr: "Marie Koffi est styliste et créatrice ivoirienne. Sa maison de couture propose des pièces faites main, dans la pure tradition du sur-mesure.",
    lead_en: "Marie Koffi is an Ivorian stylist and designer. Her couture house offers handmade pieces in the pure tradition of bespoke tailoring.",
    p1_fr: "Fondée avec la volonté de mettre en valeur l'élégance africaine moderne, Marie Koffi Confection est plus qu'une marque : c'est une vision. Une vision où le wax, les tissus traditionnels et les coupes contemporaines dialoguent pour créer des silhouettes uniques.",
    p1_en: "Founded with the will to celebrate modern African elegance, Marie Koffi Confection is more than a brand: it is a vision. A vision where wax fabric, traditional textiles, and contemporary cuts come together to create unique silhouettes.",
    p2_fr: "Chaque création est pensée comme une pièce d'exception, réalisée à la main dans nos ateliers d'Abidjan. Que vous cherchiez une robe de cérémonie, une tenue traditionnelle ou un ensemble prêt-à-porter, nous concevons des vêtements à votre image.",
    p2_en: "Every creation is treated as an exceptional piece, handmade in our Abidjan workshops. Whether you are looking for a ceremony gown, a traditional outfit, or a ready-to-wear set, we design clothing that reflects who you are.",
    founder_photo_url: founder ?? "",
    atelier_eyebrow_fr: "Atelier · Abidjan",
    atelier_eyebrow_en: "Atelier · Abidjan",
    atelier_title_fr: "L'atelier, la main, la pièce.",
    atelier_title_en: "The atelier, the hand, the piece.",
    atelier_text_fr: "Chaque création est pensée comme une pièce d'exception, réalisée à la main dans nos ateliers. Sur-mesure ou prêt-à-porter, le geste reste artisanal.",
    atelier_text_en: "Every creation is treated as exceptional, handmade in our ateliers. Bespoke or ready-to-wear, the craft stays artisanal.",
    atelier_photo_left_url:  atelierL ?? "",
    atelier_photo_right_url: atelierR ?? "",
    atelier_cta_fr: "En savoir plus",
    atelier_cta_en: "Learn more",
    cta_fr: "Discuter de votre projet",
    cta_en: "Discuss your project",
  };

  const { error: e1 } = await sb.from("about_meta").update({ data: aboutData }).eq("id", 1);
  if (e1) throw e1;
  console.log("  ✓ about_meta");

  const values = [
    { numeral: "I",   title_fr: "Sur mesure", title_en: "Bespoke",   text_fr: "Chaque pièce est ajustée à votre morphologie, vos goûts et l'occasion.", text_en: "Every piece is tailored to your body, your taste, and the occasion." },
    { numeral: "II",  title_fr: "Fait main",  title_en: "Handmade",  text_fr: "Confection artisanale, tissus sélectionnés, finitions soignées.",          text_en: "Artisanal craftsmanship, selected fabrics, refined finishings." },
    { numeral: "III", title_fr: "Héritage",   title_en: "Heritage",  text_fr: "Inspirations puisées dans la richesse des textiles ouest-africains.",     text_en: "Inspired by the richness of West African textiles." },
  ];

  for (let i = 0; i < values.length; i++) {
    const v = values[i];
    const { data: existing } = await sb
      .from("about_values")
      .select("id")
      .eq("numeral", v.numeral)
      .maybeSingle();
    if (existing) {
      console.log(`  · skip valeur ${v.numeral} (exists)`);
      continue;
    }
    const { error } = await sb.from("about_values").insert({ ...v, order_index: i });
    if (error) throw error;
    console.log(`  ✓ valeur ${v.numeral}`);
  }
}

// ============================================================
// SECTION 6 — journey (chapters + stats + highlights + meta)
// ============================================================
async function seedJourney() {
  console.log("→ journey_chapters");

  const chapters = [
    {
      numeral: "I",
      label_fr: "Chapitre I · Origines", label_en: "Chapter I · Origins",
      title_fr: "Yamoussoukro, Bac A",   title_en: "Yamoussoukro, Literary Baccalaureate",
      text_fr: "Tout commence à Yamoussoukro. Lycéenne brillante en série littéraire, elle décroche son BAC A. Déjà l'écriture, déjà le verbe, déjà cette envie de raconter — par les mots ou par la matière.",
      text_en: "It all begins in Yamoussoukro. A brilliant literary track student, she earns her BAC A. Already the writing, already the word, already this urge to tell — through words or through fabric.",
      photo: "/mesphotos/480497069_610950928407103_532161729464403580_n.jpg",
      year: "BAC A",
      place_fr: "Yamoussoukro · CI", place_en: "Yamoussoukro · CI",
      keywords_fr: ["Lettres", "Philosophie", "Écriture"],
      keywords_en: ["Literature", "Philosophy", "Writing"],
      detail_fr: "Une élève qui dévore les classiques.",
      detail_en: "A student who devours the classics.",
    },
    {
      numeral: "II",
      label_fr: "Chapitre II · La robe noire", label_en: "Chapter II · The black robe",
      title_fr: "Master 2 · Droit, voie de la magistrature", title_en: "Master's in Law · Path to magistracy",
      text_fr: "Cap sur le droit. Master 2 en poche, elle s'engage dans la voie exigeante qui mène à la magistrature. Discipline, rigueur, esprit critique — l'école d'une autre couture, celle des dossiers.",
      text_en: "Heading toward law. Master's degree in hand, she steps onto the demanding path to the bench. Discipline, rigor, critical thinking — another kind of couture, the couture of files.",
      photo: "/mesphotos/480781487_610315395137323_8148975816750054486_n.jpg",
      year: "MASTER 2",
      place_fr: "Faculté de Droit", place_en: "Law school",
      keywords_fr: ["Magistrature", "Rigueur", "Plaidoirie"],
      keywords_en: ["Magistracy", "Rigor", "Pleading"],
      detail_fr: "La robe noire avant la robe de soirée.",
      detail_en: "The black robe before the evening gown.",
    },
    {
      numeral: "III",
      label_fr: "Chapitre III · Sous les projecteurs", label_en: "Chapter III · Under the spotlight",
      title_fr: "Mannequin et modèle", title_en: "Model & runway",
      text_fr: "Le podium l'appelle. Mannequin, modèle, elle apprend la lumière, le geste, la silhouette — tout ce que les robes diront un jour. La mode n'est plus un loisir, c'est un langage.",
      text_en: "The runway calls. Model and figure, she learns the light, the gesture, the silhouette — everything her dresses will one day say. Fashion is no longer a hobby, it's a language.",
      photo: "/mesphotos/481272153_619099780925551_6017103622447122142_n.jpg",
      year: "RUNWAY",
      place_fr: "Abidjan · Lagos · Dakar", place_en: "Abidjan · Lagos · Dakar",
      keywords_fr: ["Podium", "Éditorial", "Lumière"],
      keywords_en: ["Runway", "Editorial", "Light"],
      detail_fr: "Apprendre la silhouette, de l'intérieur.",
      detail_en: "Learning the silhouette, from within.",
    },
    {
      numeral: "IV",
      label_fr: "Chapitre IV · La main qui crée", label_en: "Chapter IV · The hand that creates",
      title_fr: "Marie Koffi Confection",         title_en: "Marie Koffi Confection",
      text_fr: "La styliste prend le dessus. Elle fonde Marie Koffi Confection — une maison où héritage africain et coupes contemporaines se rencontrent. Chaque pièce, faite main, raconte une femme.",
      text_en: "The designer takes over. She founds Marie Koffi Confection — a house where African heritage meets contemporary cuts. Every piece, handmade, tells a woman's story.",
      photo: "/mesphotos/482081906_619099434258919_2903472902691343312_n.jpg",
      year: "M·K·C",
      place_fr: "Atelier · Abidjan", place_en: "Atelier · Abidjan",
      keywords_fr: ["Sur-mesure", "Wax", "Coupe"],
      keywords_en: ["Bespoke", "Wax", "Cut"],
      detail_fr: "Fondation d'une maison à part.",
      detail_en: "Founding a house of its own.",
    },
    {
      numeral: "V",
      label_fr: "Chapitre V · La consécration", label_en: "Chapter V · The crowning",
      title_fr: "Lauréate · Concours 2026",     title_en: "Winner · 2026 Competition",
      text_fr: "Récemment couronnée — une victoire qui scelle ce parcours hors normes. La reconnaissance d'une vision : celle d'une créatrice qui ose tout, et le fait avec élégance.",
      text_en: "Recently crowned — a victory that seals this remarkable path. Recognition of a vision: that of a designer who dares everything, and does it with elegance.",
      photo: "/mesphotos/499162283_1018510446938027_7382958951504068487_n.jpg",
      extra_photo: "/mesphotos/victoire.png",
      year: "2026",
      place_fr: "Côte d'Ivoire", place_en: "Côte d'Ivoire",
      keywords_fr: ["Lauréate", "Reconnaissance", "2026"],
      keywords_en: ["Winner", "Recognition", "2026"],
      detail_fr: "Une couronne pour une vision.",
      detail_en: "A crown for a vision.",
    },
  ];

  for (let i = 0; i < chapters.length; i++) {
    const c = chapters[i];
    const { data: existing } = await sb
      .from("journey_chapters")
      .select("id")
      .eq("numeral", c.numeral)
      .maybeSingle();
    if (existing) {
      console.log(`  · skip chapitre ${c.numeral} (exists)`);
      continue;
    }
    const [photo, extra_photo] = await Promise.all([
      uploadOne(c.photo, "parcours"),
      c.extra_photo ? uploadOne(c.extra_photo, "parcours") : Promise.resolve(null),
    ]);
    const { error } = await sb.from("journey_chapters").insert({
      numeral: c.numeral,
      label_fr: c.label_fr, label_en: c.label_en,
      title_fr: c.title_fr, title_en: c.title_en,
      text_fr: c.text_fr,   text_en: c.text_en,
      photo_url: photo,
      extra_photo_url: extra_photo,
      year: c.year,
      place_fr: c.place_fr, place_en: c.place_en,
      keywords_fr: c.keywords_fr, keywords_en: c.keywords_en,
      detail_fr: c.detail_fr, detail_en: c.detail_en,
      order_index: i,
    });
    if (error) throw error;
    console.log(`  ✓ chapitre ${c.numeral}`);
  }

  // stats
  console.log("→ journey_stats");
  const stats = [
    { n: "01", label_fr: "Yamoussoukro",     label_en: "Yamoussoukro", value_fr: "BAC A",         value_en: "BAC A" },
    { n: "02", label_fr: "Droit · Master 2", label_en: "Law · Master's", value_fr: "Magistrature", value_en: "Magistracy" },
    { n: "03", label_fr: "Podium",           label_en: "Runway",        value_fr: "Mannequin",     value_en: "Model" },
    { n: "04", label_fr: "Concours",         label_en: "Competition",   value_fr: "Lauréate 2026", value_en: "Winner 2026" },
  ];
  for (let i = 0; i < stats.length; i++) {
    const s = stats[i];
    const { data: existing } = await sb.from("journey_stats").select("id").eq("n", s.n).maybeSingle();
    if (existing) { console.log(`  · skip stat ${s.n}`); continue; }
    const { error } = await sb.from("journey_stats").insert({ ...s, order_index: i });
    if (error) throw error;
    console.log(`  ✓ stat ${s.n}`);
  }

  // highlights
  console.log("→ journey_highlights");
  const highlights = [
    { icon: "GraduationCap", title_fr: "BAC A",            title_en: "BAC A",            subtitle_fr: "Yamoussoukro",          subtitle_en: "Yamoussoukro",          text_fr: "Série littéraire, formation aux humanités.",         text_en: "Literary track, humanities education." },
    { icon: "Scale",         title_fr: "Master 2 · Droit", title_en: "Master's · Law",   subtitle_fr: "Voie magistrature",     subtitle_en: "Path to magistracy",    text_fr: "Discipline de la robe noire, rigueur juridique.",    text_en: "Discipline of the black robe, legal rigor." },
    { icon: "Camera",        title_fr: "Mannequin",        title_en: "Model",            subtitle_fr: "Podium · Édito",        subtitle_en: "Runway · Editorial",    text_fr: "La silhouette comme langage.",                       text_en: "Silhouette as a language." },
    { icon: "Scissors",      title_fr: "MKC",              title_en: "MKC",              subtitle_fr: "Maison fondée",         subtitle_en: "House founded",         text_fr: "Couture, héritage, modernité.",                      text_en: "Couture, heritage, modernity." },
    { icon: "Award",         title_fr: "Lauréate",         title_en: "Winner",           subtitle_fr: "Concours 2026",         subtitle_en: "2026 contest",          text_fr: "Reconnaissance d'une vision.",                        text_en: "Recognition of a vision." },
    { icon: "Heart",         title_fr: "80+ pièces",       title_en: "80+ pieces",       subtitle_fr: "Créations à ce jour",   subtitle_en: "Creations to date",     text_fr: "Chaque pièce, faite à la main.",                     text_en: "Each piece, handmade." },
  ];
  for (let i = 0; i < highlights.length; i++) {
    const h = highlights[i];
    const { data: existing } = await sb.from("journey_highlights").select("id").eq("title_fr", h.title_fr).maybeSingle();
    if (existing) { console.log(`  · skip highlight ${h.title_fr}`); continue; }
    const { error } = await sb.from("journey_highlights").insert({ ...h, order_index: i });
    if (error) throw error;
    console.log(`  ✓ highlight ${h.title_fr}`);
  }

  // meta (quote, cta, fb embed, mosaic)
  console.log("→ journey_meta");
  const mosaicUrls = await Promise.all([
    uploadOne("/mesphotos/480497069_610950928407103_532161729464403580_n.jpg", "parcours"),
    uploadOne("/mesphotos/480781487_610315395137323_8148975816750054486_n.jpg", "parcours"),
    uploadOne("/mesphotos/481272153_619099780925551_6017103622447122142_n.jpg", "parcours"),
    uploadOne("/mesphotos/482081906_619099434258919_2903472902691343312_n.jpg", "parcours"),
    uploadOne("/mesphotos/499162283_1018510446938027_7382958951504068487_n.jpg", "parcours"),
    uploadOne("/mesphotos/portrait.jpeg", "parcours"),
  ]);
  const photo_mosaic = mosaicUrls.filter(Boolean).map((url) => ({ url }));

  const journeyData = {
    quote_fr: "On ne quitte pas le droit. On l'habille autrement.",
    quote_en: "You don't leave the law. You dress it differently.",
    quote_author_fr: "Marie Koffi",
    quote_author_en: "Marie Koffi",
    cta_eyebrow_fr: "Et vous ?",
    cta_eyebrow_en: "And you?",
    cta_title_fr: "Une pièce, une histoire.",
    cta_title_en: "One piece, one story.",
    cta_lead_fr: "Chaque création est pensée pour celle qui la portera. Racontons la vôtre.",
    cta_lead_en: "Every creation is designed for the woman who will wear it. Let's tell yours.",
    cta_button_fr: "Commencer le dialogue",
    cta_button_en: "Start the conversation",
    fb_embed_url: "https://web.facebook.com/reel/25972205395807555/",
    photo_mosaic,
  };
  const { error } = await sb.from("journey_meta").update({ data: journeyData }).eq("id", 1);
  if (error) throw error;
  console.log("  ✓ journey_meta");
}

// ============================================================
// RUN
// ============================================================
async function main() {
  console.log("=== MKC seed ===");
  console.log(`Supabase: ${SUPABASE_URL}`);
  console.log(`Bunny: ${BUNNY_CDN} (zone ${BUNNY_ZONE}, folder ${BUNNY_FOLDER})\n`);

  await seedSiteSettings();
  await seedMarquee();
  await seedCategories();
  await seedEditorial();
  await seedAbout();
  await seedJourney();

  console.log("\n✓ Done. Products skipped — add via /admin/boutique.");
}

main().catch((e) => {
  console.error("\n✘ Seed failed:", e);
  process.exit(1);
});
