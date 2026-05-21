"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SmartImage from "./SmartImage";
import { formatPrice } from "@/lib/format";
import type { ProductRow, ProductCategory } from "@/lib/data";
import type { Locale } from "@/app/[lang]/dictionaries";

type Props = {
  product: ProductRow;
  lang: Locale;
  categories: ProductCategory[];
  index?: number;
};

export default function ProductCard({ product, lang, categories, index = 0 }: Props) {
  const cover = product.cover_url || product.photos[0] || "";
  const hover = product.photos[0] || product.photos[1] || cover;
  const category = categories.find((c) => c.slug === product.category_slug);
  const categoryLabel = category ? (lang === "fr" ? category.label_fr : category.label_en) : "";
  const fabric = (lang === "fr" ? product.fabric_fr : product.fabric_en) ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 8) * 0.04 }}
    >
      <Link href={`/${lang}/boutique/${product.slug}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-[var(--paper)]">
          {cover && (
            <div className="absolute inset-0">
              <SmartImage
                wrapperClassName="w-full h-full"
                src={cover}
                alt={product.name}
                fill
                sizes="(min-width: 1280px) 24vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover transition-opacity duration-700 group-hover:opacity-0"
              />
            </div>
          )}
          {hover && hover !== cover && (
            <div className="absolute inset-0">
              <SmartImage
                wrapperClassName="w-full h-full"
                src={hover}
                alt={product.name}
                fill
                sizes="(min-width: 1280px) 24vw, (min-width: 768px) 33vw, 50vw"
                className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />
            </div>
          )}
          {categoryLabel && (
            <div className="absolute top-3 left-3 font-mono text-[9px] tracking-widest text-white bg-black/40 backdrop-blur px-2 py-1 uppercase">
              {categoryLabel}
            </div>
          )}
          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/85 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition duration-500">
            <ArrowUpRight size={14} />
          </div>
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg leading-tight">
            {product.name}
            <span className="italic text-[var(--accent)]">.</span>
          </h3>
          <span className="font-mono text-[11px] tracking-wide text-[var(--muted)] shrink-0">
            {formatPrice(product.price_xof, lang)}
          </span>
        </div>
        {fabric && (
          <p className="mt-1 font-mono text-[10px] tracking-widest uppercase text-[var(--muted)]">
            {fabric}
          </p>
        )}
      </Link>
    </motion.div>
  );
}
