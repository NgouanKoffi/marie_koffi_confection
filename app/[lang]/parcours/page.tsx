import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Quote,
  Sparkles,
  GraduationCap,
  Scale,
  Camera,
  Scissors,
  Award,
  Star,
  MapPin,
  Heart,
} from "lucide-react";
import { getDictionary, hasLocale } from "../dictionaries";

const PHOTOS = {
  p1: "/mesphotos/480497069_610950928407103_532161729464403580_n.jpg",
  p2: "/mesphotos/480781487_610315395137323_8148975816750054486_n.jpg",
  p3: "/mesphotos/481272153_619099780925551_6017103622447122142_n.jpg",
  p4: "/mesphotos/482081906_619099434258919_2903472902691343312_n.jpg",
  p5: "/mesphotos/499162283_1018510446938027_7382958951504068487_n.jpg",
  portrait: "/mesphotos/portrait.jpeg",
  victoire: "/mesphotos/victoire.png",
};

export async function generateMetadata({ params }: PageProps<"/[lang]/parcours">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.journey.title };
}

export default async function ParcoursPage({
  params,
}: PageProps<"/[lang]/parcours">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const j = dict.journey;

  const chapters = [
    {
      n: "I",
      label: j.chapter_1_label,
      title: j.chapter_1_title,
      text: j.chapter_1_text,
      photo: PHOTOS.p1,
      year: "BAC A",
      icon: GraduationCap,
      place: "Yamoussoukro · CI",
      keywords: lang === "fr"
        ? ["Lettres", "Philosophie", "Écriture"]
        : ["Literature", "Philosophy", "Writing"],
      detail: lang === "fr"
        ? "Une élève qui dévore les classiques."
        : "A student who devours the classics.",
    },
    {
      n: "II",
      label: j.chapter_2_label,
      title: j.chapter_2_title,
      text: j.chapter_2_text,
      photo: PHOTOS.p2,
      year: "MASTER 2",
      icon: Scale,
      place: lang === "fr" ? "Faculté de Droit" : "Law school",
      keywords: lang === "fr"
        ? ["Magistrature", "Rigueur", "Plaidoirie"]
        : ["Magistracy", "Rigor", "Pleading"],
      detail: lang === "fr"
        ? "La robe noire avant la robe de soirée."
        : "The black robe before the evening gown.",
    },
    {
      n: "III",
      label: j.chapter_3_label,
      title: j.chapter_3_title,
      text: j.chapter_3_text,
      photo: PHOTOS.p3,
      year: "RUNWAY",
      icon: Camera,
      place: "Abidjan · Lagos · Dakar",
      keywords: lang === "fr"
        ? ["Podium", "Éditorial", "Lumière"]
        : ["Runway", "Editorial", "Light"],
      detail: lang === "fr"
        ? "Apprendre la silhouette, de l'intérieur."
        : "Learning the silhouette, from within.",
    },
    {
      n: "IV",
      label: j.chapter_4_label,
      title: j.chapter_4_title,
      text: j.chapter_4_text,
      photo: PHOTOS.p4,
      year: "M·K·C",
      icon: Scissors,
      place: "Atelier · Abidjan",
      keywords: lang === "fr"
        ? ["Sur-mesure", "Wax", "Coupe"]
        : ["Bespoke", "Wax", "Cut"],
      detail: lang === "fr"
        ? "Fondation d'une maison à part."
        : "Founding a house of its own.",
    },
  ];

  const highlights = [
    {
      icon: GraduationCap,
      title: "BAC A",
      sub: "Yamoussoukro",
      text: lang === "fr"
        ? "Série littéraire, formation aux humanités."
        : "Literary track, humanities education.",
    },
    {
      icon: Scale,
      title: lang === "fr" ? "Master 2 · Droit" : "Master's · Law",
      sub: lang === "fr" ? "Voie magistrature" : "Path to magistracy",
      text: lang === "fr"
        ? "Discipline de la robe noire, rigueur juridique."
        : "Discipline of the black robe, legal rigor.",
    },
    {
      icon: Camera,
      title: lang === "fr" ? "Mannequin" : "Model",
      sub: lang === "fr" ? "Podium · Édito" : "Runway · Editorial",
      text: lang === "fr"
        ? "La silhouette comme langage."
        : "Silhouette as a language.",
    },
    {
      icon: Scissors,
      title: "MKC",
      sub: lang === "fr" ? "Maison fondée" : "House founded",
      text: lang === "fr"
        ? "Couture, héritage, modernité."
        : "Couture, heritage, modernity.",
    },
    {
      icon: Award,
      title: lang === "fr" ? "Lauréate" : "Winner",
      sub: lang === "fr" ? "Concours 2026" : "2026 contest",
      text: lang === "fr"
        ? "Reconnaissance d'une vision."
        : "Recognition of a vision.",
    },
    {
      icon: Heart,
      title: lang === "fr" ? "80+ pièces" : "80+ pieces",
      sub: lang === "fr" ? "Créations à ce jour" : "Creations to date",
      text: lang === "fr"
        ? "Chaque pièce, faite à la main."
        : "Each piece, handmade.",
    },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
          <Image
            src={PHOTOS.portrait}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover blur-3xl"
          />
        </div>
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--bg) 70%, transparent), var(--bg) 80%)",
          }}
        />

        <div className="mx-auto max-w-[1500px] px-6 sm:px-10 grid grid-cols-12 gap-6 lg:gap-10 items-center">
          <aside className="hidden lg:flex col-span-1 flex-col justify-end h-full py-4 pointer-events-none">
            <div className="vertical-label text-[var(--muted)] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] pulse-dot" />
              EST · YAMOUSSOUKRO
            </div>
          </aside>

          <div className="col-span-12 lg:col-span-7">
            <div className="flex items-center gap-3 mb-6 text-[var(--muted)]">
              <Sparkles size={14} className="text-[var(--accent)]" />
              <span className="font-mono text-[10px] tracking-widest">
                {j.eyebrow}
              </span>
            </div>
            <h1 className="font-display font-light text-[2.8rem] sm:text-[4.5rem] lg:text-[6.5rem] leading-[0.92] tracking-tight">
              {j.title}
              <span className="italic text-[var(--accent)]">.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-[var(--muted)]">
              {j.lead}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {[
                lang === "fr" ? "Styliste" : "Designer",
                lang === "fr" ? "Mannequin" : "Model",
                lang === "fr" ? "Juriste" : "Jurist",
                lang === "fr" ? "Lauréate 2026" : "Winner 2026",
              ].map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] tracking-widest px-3 py-1.5 rounded-full ring-1"
                  style={{ borderColor: "var(--line)", color: "var(--muted)" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 relative">
            <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto overflow-hidden">
              <Image
                src={PHOTOS.portrait}
                alt="Marie Koffi"
                fill
                priority
                sizes="(min-width: 1024px) 25vw, 70vw"
                className="object-cover"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                <span className="font-mono text-[9px] tracking-widest bg-black/40 backdrop-blur px-2 py-1 rounded-sm">
                  MARIE KOFFI
                </span>
                <span className="font-display italic text-lg">2026</span>
              </div>
              <div
                className="absolute -top-2 -left-2 px-2.5 py-1 font-mono text-[9px] tracking-widest rounded-full"
                style={{ background: "var(--accent)", color: "white" }}
              >
                CHAPTER · 00
              </div>
            </div>

            <div
              className="hidden md:flex absolute -bottom-4 -right-2 lg:-right-6 flex-col items-center gap-1 px-3 py-2.5 rounded-2xl shadow-xl ring-1"
              style={{
                background: "var(--card)",
                borderColor: "var(--line)",
              }}
            >
              <Star size={14} className="text-[var(--accent)]" />
              <span className="font-mono text-[9px] tracking-widest text-[var(--muted)]">
                LAURÉATE
              </span>
              <span className="font-display italic text-base font-light">
                2026
              </span>
            </div>

            <div
              className="hidden md:flex absolute top-6 -left-3 lg:-left-8 items-center gap-2 px-2.5 py-1.5 rounded-full ring-1"
              style={{
                background: "var(--card)",
                borderColor: "var(--line)",
              }}
            >
              <MapPin size={11} className="text-[var(--accent)]" />
              <span className="font-mono text-[9px] tracking-widest">
                ABIDJAN · CI
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE INTRO STAT BAND */}
      <section className="border-y" style={{ borderColor: "var(--line)" }}>
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10 py-8 md:py-12 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center md:text-left">
          {[
            { n: "01", l: lang === "fr" ? "Yamoussoukro" : "Yamoussoukro", v: "BAC A" },
            { n: "02", l: lang === "fr" ? "Droit · Master 2" : "Law · Master's", v: lang === "fr" ? "Magistrature" : "Magistracy" },
            { n: "03", l: lang === "fr" ? "Podium" : "Runway", v: lang === "fr" ? "Mannequin" : "Model" },
            { n: "04", l: lang === "fr" ? "Concours" : "Competition", v: lang === "fr" ? "Lauréate 2026" : "Winner 2026" },
          ].map((s) => (
            <div key={s.n}>
              <div className="font-mono text-[10px] tracking-widest text-[var(--muted)] mb-2">
                {s.n}
              </div>
              <div className="font-display text-xl md:text-2xl font-light leading-tight tracking-tight">
                {s.v}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CHAPTERS — alternating */}
      <section className="mx-auto max-w-[1500px] px-6 sm:px-10 py-16 md:py-24 space-y-20 md:space-y-32">
        {chapters.map((c, i) => {
          const reverse = i % 2 === 1;
          return (
            <article
              key={c.n}
              className="grid lg:grid-cols-12 gap-8 md:gap-14 items-center"
            >
              <div
                className={`lg:col-span-5 relative ${
                  reverse ? "lg:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/5] w-full max-w-[380px] mx-auto overflow-hidden hover-zoom">
                  <Image
                    src={c.photo}
                    alt={c.title}
                    fill
                    sizes="(min-width: 1024px) 30vw, 85vw"
                    className="object-cover"
                  />
                  <div
                    className="absolute top-3 left-3 font-mono text-[9px] tracking-widest backdrop-blur px-2 py-1 rounded-sm text-white"
                    style={{ background: "rgba(0,0,0,0.4)" }}
                  >
                    {c.year}
                  </div>
                  <div
                    className="absolute -bottom-2 right-3 font-display italic text-6xl md:text-8xl font-light leading-none pointer-events-none"
                    style={{ color: "var(--accent)", textShadow: "0 0 30px var(--bg)" }}
                  >
                    {c.n}
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-7 ${reverse ? "lg:order-1" : ""}`}>
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="h-px w-10"
                    style={{ background: "var(--accent)" }}
                  />
                  <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
                    {c.label}
                  </span>
                </div>
                <h2 className="font-display font-light text-[2rem] md:text-[3rem] leading-[1] tracking-tight">
                  {c.title}
                  <span className="italic text-[var(--accent)]">.</span>
                </h2>
                <p className="mt-5 text-[15px] leading-relaxed text-[var(--muted)] max-w-xl">
                  {c.text}
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-2">
                  {c.keywords.map((k) => (
                    <span
                      key={k}
                      className="font-mono text-[10px] tracking-widest px-3 py-1.5 rounded-full ring-1"
                      style={{ borderColor: "var(--line)", color: "var(--muted)" }}
                    >
                      {k}
                    </span>
                  ))}
                </div>

                <div className="mt-8 grid sm:grid-cols-2 gap-px max-w-xl" style={{ background: "var(--line)" }}>
                  <div className="p-4 flex items-start gap-3" style={{ background: "var(--bg)" }}>
                    <c.icon size={16} className="mt-0.5 text-[var(--accent)] shrink-0" />
                    <div>
                      <div className="font-mono text-[9px] tracking-widest text-[var(--muted)] mb-1">
                        {lang === "fr" ? "JALON" : "MILESTONE"}
                      </div>
                      <div className="font-display text-base font-light leading-tight">
                        {c.year}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex items-start gap-3" style={{ background: "var(--bg)" }}>
                    <MapPin size={16} className="mt-0.5 text-[var(--accent)] shrink-0" />
                    <div>
                      <div className="font-mono text-[9px] tracking-widest text-[var(--muted)] mb-1">
                        {lang === "fr" ? "LIEU" : "PLACE"}
                      </div>
                      <div className="font-display text-base font-light leading-tight">
                        {c.place}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-6 font-display italic text-base md:text-lg text-[var(--accent)] max-w-xl">
                  — {c.detail}
                </p>
              </div>
            </article>
          );
        })}
      </section>

      {/* FACEBOOK MEDIA */}
      <section
        className="relative py-16 md:py-24 border-t"
        style={{ borderColor: "var(--line)" }}
      >
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-5 border-b mb-10 md:mb-12"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
                MÉDIAS · 04
              </span>
              <span className="h-px w-10 bg-fg" />
              <span className="eyebrow">
                {lang === "fr" ? "Interviews & publications" : "Interviews & posts"}
              </span>
            </div>
            <h2 className="font-display font-light text-[1.8rem] md:text-[2.8rem] leading-[0.95] tracking-tight">
              {lang === "fr" ? "Sa voix, ses mots" : "Her voice, her words"}
              <span className="italic text-[var(--accent)]">.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="lg:col-span-6 flex justify-center">
              <div className="flex flex-col gap-3 w-full max-w-[267px]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-px w-8"
                      style={{ background: "var(--accent)" }}
                    />
                    <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
                      REEL · FACEBOOK
                    </span>
                  </div>
                  <a
                    href="https://web.facebook.com/reel/25972205395807555/"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-mono tracking-widest text-[var(--muted)] hover:text-[var(--accent)] transition"
                  >
                    {lang === "fr" ? "OUVRIR" : "OPEN"}
                    <ArrowUpRight size={12} />
                  </a>
                </div>
                <div
                  className="relative w-full overflow-hidden rounded-sm ring-1"
                  style={{
                    borderColor: "var(--line)",
                    background: "var(--paper)",
                    aspectRatio: "267 / 476",
                  }}
                >
                  <iframe
                    src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fweb.facebook.com%2Freel%2F25972205395807555%2F&show_text=false&width=267&t=0"
                    title="Marie Koffi · Interview"
                    width={267}
                    height={476}
                    scrolling="no"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 w-full h-full border-0"
                    style={{ border: "none", overflow: "hidden" }}
                  />
                </div>
                <div className="font-display italic text-base md:text-lg">
                  {lang === "fr" ? "Interview" : "Interview"}
                  <span className="text-[var(--accent)]">.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={14} className="text-[var(--accent)]" />
                <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
                  {lang === "fr" ? "PRISE DE PAROLE" : "ON THE RECORD"}
                </span>
              </div>
              <h3 className="font-display font-light text-[1.8rem] md:text-[2.6rem] leading-[1] tracking-tight">
                {lang === "fr"
                  ? "Sa parole, sans filtre"
                  : "Her words, unfiltered"}
                <span className="italic text-[var(--accent)]">.</span>
              </h3>
              <p className="mt-5 text-[14px] leading-relaxed text-[var(--muted)] max-w-xl">
                {lang === "fr"
                  ? "Un témoignage direct sur sa vision, son parcours et la maison qu'elle bâtit. La caméra capte ce que les mots écrits n'osent pas toujours dire."
                  : "A direct testimony about her vision, her journey, and the house she is building. The camera catches what written words don't always dare to say."}
              </p>

              <div
                className="mt-7 grid grid-cols-3 gap-px max-w-md"
                style={{ background: "var(--line)" }}
              >
                {[
                  { k: lang === "fr" ? "Format" : "Format", v: "Reel" },
                  { k: lang === "fr" ? "Plateforme" : "Platform", v: "Facebook" },
                  { k: lang === "fr" ? "Durée" : "Length", v: "≈ 1min" },
                ].map((s) => (
                  <div
                    key={s.k}
                    className="p-3 text-center"
                    style={{ background: "var(--bg)" }}
                  >
                    <div className="font-display text-base font-light tracking-tight">
                      {s.v}
                    </div>
                    <div className="font-mono text-[9px] tracking-widest text-[var(--muted)] mt-1">
                      {s.k.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS GRID */}
      <section
        className="relative py-16 md:py-24 border-t"
        style={{ borderColor: "var(--line)", background: "var(--paper)" }}
      >
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-5 border-b mb-10"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
                SYNTHÈSE · 05
              </span>
              <span className="h-px w-10 bg-fg" />
              <span className="eyebrow">
                {lang === "fr" ? "En bref" : "At a glance"}
              </span>
            </div>
            <h2 className="font-display font-light text-[1.8rem] md:text-[2.8rem] leading-[0.95] tracking-tight">
              {lang === "fr" ? "Six jalons, une trajectoire" : "Six milestones, one trajectory"}
              <span className="italic text-[var(--accent)]">.</span>
            </h2>
          </div>

          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px"
            style={{ background: "var(--line)" }}
          >
            {highlights.map((h, idx) => (
              <div
                key={h.title}
                className="p-6 md:p-7 flex flex-col gap-3 min-h-[180px]"
                style={{ background: "var(--bg)" }}
              >
                <div className="flex items-center justify-between">
                  <h.icon size={20} className="text-[var(--accent)]" />
                  <span className="font-mono text-[9px] tracking-widest text-[var(--muted)]">
                    {String(idx + 1).padStart(2, "0")} / {String(highlights.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-auto">
                  <div className="font-display text-xl md:text-2xl font-light tracking-tight">
                    {h.title}
                  </div>
                  <div className="font-mono text-[10px] tracking-widest text-[var(--muted)] mt-1">
                    {h.sub.toUpperCase()}
                  </div>
                  <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted)]">
                    {h.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE BAND */}
      <section
        className="relative py-20 md:py-28 grain overflow-hidden"
        style={{ background: "var(--dark-bg)", color: "var(--dark-fg)" }}
      >
        <div className="mx-auto max-w-[1100px] px-6 sm:px-10 text-center relative">
          <Quote
            size={56}
            className="mx-auto mb-8 opacity-40"
            style={{ color: "var(--dark-accent)" }}
          />
          <p className="font-display italic font-light text-[2rem] md:text-[3.6rem] leading-[1.1] tracking-tight">
            “{j.quote}”
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <span
              className="h-px w-10"
              style={{ background: "var(--dark-fg)" }}
            />
            <span className="font-mono text-[10px] tracking-widest opacity-70">
              {j.quote_author}
            </span>
          </div>
        </div>
      </section>

      {/* CHAPTER V — VICTOIRE / AWARD */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-5 border-b mb-10 md:mb-14" style={{ borderColor: "var(--line)" }}>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
                {j.chapter_5_label}
              </span>
            </div>
            <h2 className="font-display font-light text-[2.2rem] md:text-[3.8rem] leading-[0.95] tracking-tight">
              {j.chapter_5_title}
              <span className="italic text-[var(--accent)]">.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full max-w-[400px] mx-auto overflow-hidden hover-zoom ring-1" style={{ borderColor: "var(--line)" }}>
                <Image
                  src={PHOTOS.victoire}
                  alt={lang === "fr" ? "Lauréate — Victoire" : "Winner — Trophy"}
                  fill
                  sizes="(min-width: 1024px) 35vw, 85vw"
                  className="object-cover"
                />
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 font-mono text-[10px] tracking-widest rounded-full text-white"
                  style={{ background: "var(--accent)" }}
                >
                  ★ {lang === "fr" ? "LAURÉATE 2026" : "WINNER 2026"}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={14} className="text-[var(--accent)]" />
                <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
                  {lang === "fr" ? "RECONNAISSANCE" : "RECOGNITION"}
                </span>
              </div>
              <p className="text-[15px] leading-relaxed text-[var(--muted)] mb-6">
                {j.chapter_5_text}
              </p>

              <div className="grid grid-cols-3 gap-px mb-6" style={{ background: "var(--line)" }}>
                {[
                  { k: lang === "fr" ? "Année" : "Year", v: "2026" },
                  { k: lang === "fr" ? "Rang" : "Rank", v: lang === "fr" ? "Lauréate" : "Winner" },
                  { k: lang === "fr" ? "Pays" : "Country", v: "CI" },
                ].map((s) => (
                  <div key={s.k} className="p-4 text-center" style={{ background: "var(--bg)" }}>
                    <div className="font-display text-xl md:text-2xl font-light tracking-tight">
                      {s.v}
                    </div>
                    <div className="font-mono text-[9px] tracking-widest text-[var(--muted)] mt-1">
                      {s.k.toUpperCase()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-px" style={{ background: "var(--line)" }}>
                {[
                  { k: lang === "fr" ? "Distinction" : "Award", v: lang === "fr" ? "Lauréate — Concours mode 2026" : "Winner — Fashion competition 2026" },
                  { k: lang === "fr" ? "Catégorie" : "Category", v: lang === "fr" ? "Création couture" : "Couture creation" },
                  { k: "Atelier", v: "Marie Koffi Confection · Abidjan" },
                ].map((r) => (
                  <div
                    key={r.k}
                    className="flex items-baseline justify-between gap-6 p-4"
                    style={{ background: "var(--bg)" }}
                  >
                    <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
                      {r.k.toUpperCase()}
                    </span>
                    <span className="font-display text-base md:text-lg font-light text-right">
                      {r.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHOTO MOSAIC */}
      <section
        className="relative py-16 md:py-24 grain"
        style={{ background: "var(--dark-bg)", color: "var(--dark-fg)" }}
      >
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 pb-5 border-b mb-10" style={{ borderColor: "color-mix(in srgb, var(--dark-fg) 20%, transparent)" }}>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-widest opacity-60">
                ALBUM · 06
              </span>
            </div>
            <h2 className="font-display font-light text-[2rem] md:text-[3.2rem] leading-[0.95] tracking-tight">
              {lang === "fr" ? "Fragments d'un parcours" : "Fragments of a journey"}
              <span className="italic" style={{ color: "var(--dark-accent)" }}>.</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[
              { src: PHOTOS.p1, span: "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto", label: "01" },
              { src: PHOTOS.p2, span: "aspect-[3/4]", label: "02" },
              { src: PHOTOS.p3, span: "aspect-[3/4]", label: "03" },
              { src: PHOTOS.p4, span: "aspect-[3/4]", label: "04" },
              { src: PHOTOS.p5, span: "aspect-[3/4]", label: "05" },
              { src: PHOTOS.portrait, span: "md:col-span-2 aspect-[3/4] md:aspect-[3/2]", label: "06" },
            ].map((p) => (
              <div
                key={p.src + p.label}
                className={`relative overflow-hidden hover-zoom ${p.span}`}
              >
                <Image
                  src={p.src}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
                <div
                  className="absolute top-2 left-2 font-mono text-[9px] tracking-widest px-1.5 py-0.5 rounded-sm text-white"
                  style={{ background: "rgba(0,0,0,0.4)" }}
                >
                  {p.label} / 06
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <div className="font-mono text-[10px] tracking-widest text-[var(--muted)] mb-4">
              {j.cta_eyebrow}
            </div>
            <h2 className="font-display font-light text-[2rem] md:text-[3.4rem] leading-[1] tracking-tight">
              {j.cta_title.replace(".", "")}
              <span className="italic text-[var(--accent)]">.</span>
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-[var(--muted)]">
              {j.cta_lead}
            </p>
          </div>
          <Link
            href={`/${lang}/contact`}
            className="group inline-flex items-center gap-3 bg-[var(--fg)] text-[var(--bg)] pl-6 pr-2 py-2 rounded-full text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[var(--accent)] transition self-start md:self-end shrink-0"
          >
            {j.cta_button}
            <span className="w-9 h-9 rounded-full bg-[var(--bg)] text-[var(--fg)] flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
              <ArrowUpRight size={14} />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
