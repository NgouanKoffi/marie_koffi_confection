"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { ProductRow, ProductCategory } from "@/lib/data";
import type { Locale, Dictionary } from "@/app/[lang]/dictionaries";

export default function LookbookStrip({
  lang,
  dict,
  products,
  categories,
}: {
  lang: Locale;
  dict: Dictionary;
  products: ProductRow[];
  categories: ProductCategory[];
}) {
  if (products.length === 0) return null;

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
            <span className="font-mono text-[10px] tracking-widest opacity-60">CHAPITRE / 02</span>
            <span className="h-px w-10 bg-[var(--dark-fg)]" />
            <span className="eyebrow opacity-70">{dict.shop.featured_eyebrow}</span>
          </div>
          <h2 className="font-display font-light text-[2rem] md:text-[3.5rem] leading-[0.95] tracking-tight">
            {dict.shop.featured_title}
            <span className="italic" style={{ color: "var(--dark-accent)" }}>.</span>
          </h2>
          <Link
            href={`/${lang}/boutique`}
            className="ink-link text-[11px] uppercase tracking-[0.2em] font-medium self-start md:self-end shrink-0"
            style={{ color: "var(--dark-fg)" }}
          >
            {dict.shop.see_all}
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
        {products.map((p) => {
          const cover = p.cover_url || p.photos[0] || "";
          const category = categories.find((c) => c.slug === p.category_slug);
          const categoryLabel = category ? (lang === "fr" ? category.label_fr : category.label_en) : "";
          const fabric = (lang === "fr" ? p.fabric_fr : p.fabric_en) ?? "";
          return (
            <Link
              key={p.slug}
              href={`/${lang}/boutique/${p.slug}`}
              className="snap-start shrink-0 w-[58vw] sm:w-[32vw] lg:w-[22vw] group"
            >
              <div className="relative aspect-[3/4] overflow-hidden hover-zoom bg-[var(--paper)]">
                {cover && (
                  <Image
                    src={cover}
                    alt={p.name}
                    fill
                    sizes="(min-width: 1024px) 22vw, 50vw"
                    className="object-cover"
                  />
                )}
                {categoryLabel && (
                  <div className="absolute top-2 left-2 font-mono text-[9px] tracking-widest text-white bg-black/40 backdrop-blur px-1.5 py-0.5 uppercase">
                    {categoryLabel}
                  </div>
                )}
              </div>
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <span className="font-display text-lg">
                  {p.name}
                  <span className="italic" style={{ color: "var(--dark-accent)" }}>.</span>
                </span>
                <span className="font-mono text-[11px] opacity-80 shrink-0">
                  {formatPrice(p.price_xof, lang)}
                </span>
              </div>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-mono text-[9px] tracking-widest uppercase opacity-60">{fabric}</span>
                <ArrowUpRight size={12} className="opacity-60 group-hover:rotate-45 transition" />
              </div>
            </Link>
          );
        })}
        <div className="shrink-0 w-6 sm:w-10" />
      </motion.div>
    </section>
  );
}
