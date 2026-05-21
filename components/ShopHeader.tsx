import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { formatPrice } from "@/lib/format";
import type { Locale, Dictionary } from "@/app/[lang]/dictionaries";

export default function ShopHeader({
  lang,
  dict,
  productsCount,
  categoriesCount,
  minPrice,
}: {
  lang: Locale;
  dict: Dictionary;
  productsCount: number;
  categoriesCount: number;
  minPrice: number | null;
}) {
  const pieceLabel =
    productsCount === 1 ? dict.shop.results_count_one : dict.shop.results_count_other;
  const categoryLabel = lang === "fr" ? "catégories" : "categories";
  const fromLabel = dict.shop.from;

  return (
    <header className="pt-24 md:pt-28 pb-8 md:pb-10">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
        <nav
          aria-label="breadcrumb"
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] mb-6"
        >
          <Link href={`/${lang}`} className="hover:text-[var(--fg)] transition">
            {dict.nav.home}
          </Link>
          <ChevronRight size={12} />
          <span style={{ color: "var(--fg)" }}>{dict.shop.title}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b" style={{ borderColor: "var(--line)" }}>
          <div>
            <h1 className="font-display font-light text-[2.75rem] sm:text-[3.5rem] md:text-[4.25rem] leading-[0.95] tracking-tight">
              {dict.shop.title}
              <span className="italic text-[var(--accent)]">.</span>
            </h1>
            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[var(--muted)]">
              {dict.shop.lead}
            </p>
          </div>

          {productsCount > 0 && (
            <dl className="grid grid-cols-3 gap-6 md:gap-10 md:text-right">
              <Stat k={pieceLabel}      v={String(productsCount).padStart(2, "0")} />
              <Stat k={categoryLabel}   v={String(categoriesCount).padStart(2, "0")} />
              <Stat k={fromLabel}       v={minPrice != null ? formatPrice(minPrice, lang) : "—"} />
            </dl>
          )}
        </div>
      </div>
    </header>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dd className="font-display text-xl md:text-2xl leading-none">{v}</dd>
      <dt className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.28em] text-[var(--muted)]">
        {k}
      </dt>
    </div>
  );
}
