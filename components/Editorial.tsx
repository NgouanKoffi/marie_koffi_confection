"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Locale, Dictionary } from "@/app/[lang]/dictionaries";
import { FadeUp, ClipReveal, SplitText } from "./Reveal";

const looks = [
  {
    n: "01",
    src: "/gallery/look-05.jpeg",
    thumbs: ["/gallery/look-06.jpeg", "/gallery/look-07.jpeg"],
    titleFr: "Wax & Volants",
    titleEn: "Wax & Ruffles",
    capFr:
      "Confection sur mesure, organza teinté à la main. Volants en cascade, plastron brodé, manches bouffantes signature de la maison.",
    capEn:
      "Bespoke, hand-dyed organza. Cascading ruffles, embroidered front, signature puff sleeves.",
    specsFr: [
      ["Tissu", "Coton organique"],
      ["Coupe", "Ample, manches bouffantes"],
      ["Délai", "Sur-mesure · 6 essayages"],
      ["Origine", "Atelier Abidjan"],
    ],
    specsEn: [
      ["Fabric", "Organic cotton"],
      ["Cut", "Loose, puff sleeves"],
      ["Lead time", "Bespoke · 6 fittings"],
      ["Origin", "Atelier Abidjan"],
    ],
  },
  {
    n: "02",
    src: "/gallery/look-18.jpeg",
    thumbs: ["/gallery/look-19.jpeg", "/gallery/look-20.jpeg"],
    titleFr: "Tradition contemporaine",
    titleEn: "Contemporary Tradition",
    capFr:
      "Robe longue, coton imprimé Korhogo, ceinture nouée. Manches asymétriques, dos ouvert, finitions main.",
    capEn:
      "Long dress, printed Korhogo cotton, tied belt. Asymmetric sleeves, open back, hand finishings.",
    specsFr: [
      ["Tissu", "Coton imprimé Korhogo"],
      ["Doublure", "Soie naturelle"],
      ["Édition", "Pièce unique"],
      ["Origine", "Atelier Abidjan"],
    ],
    specsEn: [
      ["Fabric", "Korhogo printed cotton"],
      ["Lining", "Natural silk"],
      ["Edition", "One-of-a-kind"],
      ["Origin", "Atelier Abidjan"],
    ],
  },
  {
    n: "03",
    src: "/gallery/look-31.jpeg",
    thumbs: ["/gallery/look-32.jpeg", "/gallery/look-33.jpeg"],
    titleFr: "Silhouette d'audace",
    titleEn: "Bold Silhouette",
    capFr:
      "Pièce unique. Confection atelier Abidjan. Drapé sculpté, fluidité maîtrisée, finitions exécutées à la main.",
    capEn:
      "One-of-a-kind. Made in Abidjan atelier. Sculpted drape, fluid yet structured, hand-finished.",
    specsFr: [
      ["Tissu", "Soie sauvage"],
      ["Détail", "Drapé sculpté"],
      ["Finition", "Hand-finishing"],
      ["Origine", "Atelier Abidjan"],
    ],
    specsEn: [
      ["Fabric", "Wild silk"],
      ["Detail", "Sculpted drape"],
      ["Finish", "Hand-finishing"],
      ["Origin", "Atelier Abidjan"],
    ],
  },
];

function LookCard({
  look,
  idx,
  lang,
}: {
  look: (typeof looks)[number];
  idx: number;
  lang: Locale;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const specs = lang === "fr" ? look.specsFr : look.specsEn;
  const flip = idx % 2 === 1;

  return (
    <article
      ref={ref}
      className="grid md:grid-cols-12 gap-5 md:gap-8 items-stretch"
    >
      <div
        className={`md:col-span-6 flex flex-col gap-4 md:gap-5 ${
          flip ? "md:col-start-7 md:row-start-1" : ""
        }`}
      >
        <FadeUp>
          <div className="flex items-baseline gap-4">
            <span className="font-display italic text-5xl md:text-6xl font-light text-accent leading-none">
              {look.n}
            </span>
            <span className="font-mono text-[10px] tracking-widest text-muted">
              {lang === "fr" ? "ÉDITION" : "EDITION"} {look.n} / 03
            </span>
          </div>
        </FadeUp>

        <h3 className="font-display text-2xl md:text-3xl font-light leading-[1.1] tracking-tight">
          <SplitText
            text={lang === "fr" ? look.titleFr : look.titleEn}
            delay={0.05}
          />
        </h3>

        <FadeUp delay={0.2}>
          <p className="text-[13px] leading-relaxed text-muted">
            {lang === "fr" ? look.capFr : look.capEn}
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <dl className="border-t" style={{ borderColor: "var(--line)" }}>
            {specs.map(([k, v], i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b text-[12px]"
                style={{ borderColor: "var(--line)" }}
              >
                <dt className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {k}
                </dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </FadeUp>

        <FadeUp delay={0.4}>
          <Link
            href={`/${lang}/gallery`}
            className="ink-link self-start text-[11px] uppercase tracking-[0.2em] font-medium"
          >
            {lang === "fr" ? "Voir la pièce" : "View the piece"}
            <ArrowUpRight size={12} />
          </Link>
        </FadeUp>
      </div>

      <div
        className={`md:col-span-6 grid grid-cols-2 gap-3 md:gap-4 ${
          flip ? "md:col-start-1 md:row-start-1" : ""
        }`}
      >
        <motion.div style={{ y }} className="relative aspect-[4/5]">
          <Link
            href={`/${lang}/gallery`}
            className="absolute inset-0 block overflow-hidden hover-zoom group"
          >
            <Image
              src={look.thumbs[0]}
              alt={lang === "fr" ? look.titleFr : look.titleEn}
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover"
            />
            <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest bg-black/30 backdrop-blur px-2 py-1 rounded-sm text-white">
              PL. {look.n}.1
            </div>
            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white pointer-events-none">
              <span className="font-display italic text-sm">
                {lang === "fr" ? look.titleFr : look.titleEn}
              </span>
            </div>
          </Link>
        </motion.div>

        <motion.div style={{ y }} className="relative aspect-[4/5]">
          <Link
            href={`/${lang}/gallery`}
            className="absolute inset-0 block overflow-hidden hover-zoom group"
          >
            <Image
              src={look.thumbs[1]}
              alt=""
              fill
              sizes="(min-width: 768px) 25vw, 50vw"
              className="object-cover"
            />
            <div className="absolute top-3 left-3 font-mono text-[10px] tracking-widest bg-black/30 backdrop-blur px-2 py-1 rounded-sm text-white">
              PL. {look.n}.2
            </div>
            <div className="absolute bottom-3 right-3 vertical-label text-white">
              MKC / {look.n}
            </div>
          </Link>
        </motion.div>
      </div>
    </article>
  );
}

export default function Editorial({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
        <header
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14 pb-5 border-b"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-widest text-muted">
              CHAPITRE / 01
            </span>
            <span className="h-px w-10 bg-fg" />
            <span className="eyebrow">{dict.home.featured_eyebrow}</span>
          </div>
          <h2 className="font-display font-light text-[2rem] md:text-[3.5rem] leading-[0.95] tracking-tight">
            <SplitText text={dict.home.featured_title} />
            <span className="italic text-accent"> — </span>
            <span className="italic text-accent">
              <SplitText
                text={lang === "fr" ? "édition rare" : "rare edition"}
                delay={0.3}
              />
            </span>
          </h2>
          <Link
            href={`/${lang}/gallery`}
            className="ink-link text-[11px] uppercase tracking-[0.2em] font-medium self-start md:self-end shrink-0"
          >
            {dict.home.see_all}
            <ArrowUpRight size={12} />
          </Link>
        </header>

        <div className="space-y-16 md:space-y-24">
          {looks.map((l, idx) => (
            <LookCard key={l.n} look={l} idx={idx} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
