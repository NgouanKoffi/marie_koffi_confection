"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Locale, Dictionary } from "@/app/[lang]/dictionaries";
import { SplitText, MaskReveal, ClipReveal } from "./Reveal";
import HeroPortrait from "./HeroPortrait";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yPortrait = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const ySide = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden pt-24 md:pt-24 pb-10"
    >
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 relative">
        <div className="grid grid-cols-12 gap-4 lg:gap-8 items-stretch lg:min-h-[82vh]">
          <aside className="hidden lg:flex col-span-1 flex-col justify-between py-8 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.2 }}
              className="vertical-label text-muted"
            >
              EST · 2024 · ABIDJAN
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.4 }}
              className="vertical-label text-muted flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] pulse-dot" />
              N° 01 — LA COLLECTION
            </motion.div>
          </aside>

          <motion.div
            style={{ opacity: opacityText }}
            className="col-span-12 lg:col-span-5 flex flex-col justify-center py-12 lg:py-0 items-center text-center lg:items-start lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="eyebrow">{dict.hero.eyebrow}</span>
            </motion.div>

            <h1 className="font-display font-light text-[2.8rem] sm:text-[4rem] lg:text-[5rem] leading-[0.95] tracking-[-0.025em] text-balance">
              <MaskReveal delay={0.1}>
                <span className="block">{dict.hero.title_1}</span>
              </MaskReveal>
              <MaskReveal delay={0.25}>
                <span className="block italic font-normal text-accent">
                  {dict.hero.title_2}
                </span>
              </MaskReveal>
              <MaskReveal delay={0.4}>
                <span className="block">{dict.hero.title_3}</span>
              </MaskReveal>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.7 }}
              className="mt-6 max-w-md text-[14px] leading-relaxed text-muted text-pretty"
            >
              {dict.hero.lead}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85 }}
              className="mt-7 flex flex-col items-center gap-5 lg:flex-row lg:gap-6"
            >
              <Link
                href={`/${lang}/gallery`}
                className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-[11px] uppercase tracking-[0.22em] font-semibold transition"
                style={{ background: "var(--fg)", color: "var(--bg)" }}
              >
                {dict.hero.cta_primary}
                <span
                  className="w-9 h-9 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-500"
                  style={{ background: "var(--bg)", color: "var(--fg)" }}
                >
                  <ArrowUpRight size={14} />
                </span>
              </Link>
              <Link
                href={`/${lang}/contact`}
                className="ink-link text-[11px] uppercase tracking-[0.22em] font-semibold"
              >
                {dict.hero.cta_secondary}
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-10 grid grid-cols-3 gap-8 max-w-md"
            >
              <Stat n="80+" label={lang === "fr" ? "Créations" : "Creations"} />
              <Stat n="100%" label={lang === "fr" ? "Fait main" : "Handmade"} />
              <Stat n="01" label={lang === "fr" ? "Maison" : "House"} />
            </motion.div>
          </motion.div>

          <div className="col-span-12 lg:col-span-6 relative py-8 lg:py-12 flex items-center justify-center lg:justify-start lg:-ml-4">
            <HeroPortrait lang={lang} />
          </div>
        </div>

      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-light">
        <SplitText text={n} />
      </div>
      <div className="eyebrow text-muted mt-1">{label}</div>
    </div>
  );
}
