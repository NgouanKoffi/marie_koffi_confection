"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { galleryImages } from "@/lib/images";
import type { Locale, Dictionary } from "@/app/[lang]/dictionaries";

const PICKS = [2, 9, 16, 22, 29, 36, 44, 52, 60, 68, 75, 80];

export default function LookbookStrip({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const items = PICKS.map((i) => galleryImages[i] ?? galleryImages[0]);

  return (
    <section
      className="relative py-16 md:py-20 overflow-hidden grain"
      style={{ background: "var(--dark-bg)", color: "var(--dark-fg)" }}
    >
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
        <header
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12 pb-4 border-b"
          style={{ borderColor: "color-mix(in srgb, var(--dark-fg) 20%, transparent)" }}
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-widest opacity-60">
              CHAPITRE / 02
            </span>
            <span className="h-px w-10 bg-[var(--dark-fg)]" />
            <span className="eyebrow opacity-70">Lookbook</span>
          </div>
          <h2 className="font-display font-light text-[2rem] md:text-[3.5rem] leading-[0.95] tracking-tight">
            {lang === "fr" ? "Un défilé silencieux" : "A silent runway"}
            <span className="italic" style={{ color: "var(--dark-accent)" }}>
              {" "}
              — {lang === "fr" ? "à votre rythme." : "at your pace."}
            </span>
          </h2>
          <Link
            href={`/${lang}/gallery`}
            className="ink-link text-[11px] uppercase tracking-[0.2em] font-medium self-start md:self-end shrink-0"
            style={{ color: "var(--dark-fg)" }}
          >
            {dict.home.see_all}
            <ArrowUpRight size={12} />
          </Link>
        </header>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="pl-6 sm:pl-10 flex gap-3 md:gap-4 overflow-x-auto no-scrollbar snap-x-mandatory"
      >
        {items.map((img, idx) => (
          <Link
            key={img.src}
            href={`/${lang}/gallery`}
            className="snap-start shrink-0 w-[52vw] sm:w-[30vw] lg:w-[20vw] group"
          >
            <div className="relative aspect-[3/4] overflow-hidden hover-zoom">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 20vw, 50vw"
                className="object-cover"
              />
              <div className="absolute top-2 left-2 font-mono text-[9px] tracking-widest text-white/90 bg-black/30 backdrop-blur px-1.5 py-0.5 rounded-sm">
                {String(idx + 1).padStart(2, "0")} / {items.length}
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="font-display italic text-sm">
                Look n°{String(idx + 1).padStart(2, "0")}
              </span>
              <ArrowUpRight
                size={12}
                className="opacity-60 group-hover:rotate-45 transition"
              />
            </div>
          </Link>
        ))}
        <div className="shrink-0 w-6 sm:w-10" />
      </motion.div>
    </section>
  );
}
