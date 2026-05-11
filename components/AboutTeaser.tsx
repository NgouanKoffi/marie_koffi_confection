"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Locale, Dictionary } from "@/app/[lang]/dictionaries";
import { FadeUp, ClipReveal, SplitText } from "./Reveal";

const journey = [
  { year: "I", labelFr: "Origine", labelEn: "Origin", textFr: "Abidjan, héritage textile.", textEn: "Abidjan, textile heritage." },
  { year: "II", labelFr: "Apprentissage", labelEn: "Apprenticeship", textFr: "Années à perfectionner la coupe.", textEn: "Years perfecting the cut." },
  { year: "III", labelFr: "Maison", labelEn: "House", textFr: "Fondation Marie Koffi Confection.", textEn: "Founding Marie Koffi Confection." },
  { year: "IV", labelFr: "Aujourd'hui", labelEn: "Today", textFr: "80+ créations, vision libre.", textEn: "80+ creations, free vision." },
];

export default function AboutTeaser({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ background: "var(--paper)" }}
    >
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
        <header
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14 pb-5 border-b"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-widest text-muted">
              CHAPITRE / 03
            </span>
            <span className="h-px w-10 bg-fg" />
            <span className="eyebrow">{dict.home.about_eyebrow}</span>
          </div>
          <h2 className="font-display font-light text-[2rem] md:text-[3.5rem] leading-[0.95] tracking-tight">
            <SplitText text={dict.home.about_title} />
            <span className="italic text-accent">.</span>
          </h2>
          <Link
            href={`/${lang}/about`}
            className="ink-link text-[11px] uppercase tracking-[0.2em] font-medium self-start md:self-end shrink-0"
          >
            {dict.home.about_cta}
            <ArrowUpRight size={12} />
          </Link>
        </header>

        <div className="flex flex-col items-center text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          <FadeUp>
            <div className="flex items-baseline justify-center gap-3 mb-3">
              <span className="font-display italic text-5xl font-light text-accent leading-none">
                &ldquo;
              </span>
              <span className="font-mono text-[10px] tracking-widest text-muted">
                CITATION · MK
              </span>
            </div>
            <p className="font-display text-xl md:text-3xl italic font-light leading-[1.2] tracking-tight">
              {lang === "fr"
                ? "Le tissu raconte ce que la voix ne dit pas. Chaque couture est une mémoire, chaque drapé une promesse."
                : "Fabric tells what the voice does not say. Every stitch is memory, every drape a promise."}
            </p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-fg" />
              <span className="font-mono text-[10px] tracking-widest text-muted">
                MARIE KOFFI · FONDATRICE
              </span>
            </div>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-6 text-[14px] leading-relaxed text-muted text-left">
              <span className="font-display text-4xl float-left leading-none mr-2 mt-1 text-accent italic font-medium">
                {dict.home.about_lead.charAt(0)}
              </span>
              {dict.home.about_lead.slice(1)}
            </p>
          </FadeUp>
        </div>

        <div className="grid md:grid-cols-12 gap-5 md:gap-8 items-stretch">
          <FadeUp className="md:col-span-5 flex flex-col justify-center">
            <div className="flex items-baseline gap-3 mb-3">
              <span className="font-mono text-[10px] tracking-widest text-muted">
                ATELIER · ABIDJAN
              </span>
              <span className="h-px flex-1 bg-fg/30" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-light leading-tight tracking-tight">
              {lang === "fr"
                ? "L'atelier, la main, la pièce."
                : "The atelier, the hand, the piece."}
            </h3>
            <p className="mt-4 text-[13px] leading-relaxed text-muted">
              {lang === "fr"
                ? "Chaque création est pensée comme une pièce d'exception, réalisée à la main dans nos ateliers. Sur-mesure ou prêt-à-porter, le geste reste artisanal."
                : "Every creation is treated as exceptional, handmade in our ateliers. Bespoke or ready-to-wear, the craft stays artisanal."}
            </p>
            <Link
              href={`/${lang}/about`}
              className="ink-link mt-5 self-start text-[11px] uppercase tracking-[0.2em] font-medium"
            >
              {dict.home.about_cta}
              <ArrowUpRight size={12} />
            </Link>
          </FadeUp>

          <div className="md:col-span-7 grid grid-cols-2 gap-3 min-h-[280px] md:min-h-[340px]">
            <ClipReveal direction="bottom" delay={0.1} className="relative">
              <div className="relative w-full h-full overflow-hidden hover-zoom">
                <Image
                  src="/gallery/look-22.jpeg"
                  alt="Atelier"
                  fill
                  sizes="(min-width: 768px) 28vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 font-mono text-[9px] tracking-widest text-white drop-shadow">
                  ATELIER
                </div>
              </div>
            </ClipReveal>
            <ClipReveal direction="bottom" delay={0.2} className="relative">
              <div className="relative w-full h-full overflow-hidden hover-zoom">
                <Image
                  src="/gallery/look-45.jpeg"
                  alt="Création"
                  fill
                  sizes="(min-width: 768px) 28vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute bottom-2 left-2 font-mono text-[9px] tracking-widest text-white drop-shadow">
                  CRÉATION
                </div>
              </div>
            </ClipReveal>
          </div>
        </div>

        <div
          className="mt-10 md:mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-px border"
          style={{ background: "var(--line)", borderColor: "var(--line)" }}
        >
          {journey.map((step, i) => (
            <motion.div
              key={step.year}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="p-5 md:p-6 flex items-start gap-4"
              style={{ background: "var(--paper)" }}
            >
              <span className="font-display italic text-3xl font-light text-accent leading-none">
                {step.year}
              </span>
              <div>
                <div className="font-display text-lg md:text-xl font-medium tracking-tight">
                  {lang === "fr" ? step.labelFr : step.labelEn}
                </div>
                <p className="mt-1 text-[12px] leading-snug text-muted">
                  {lang === "fr" ? step.textFr : step.textEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
