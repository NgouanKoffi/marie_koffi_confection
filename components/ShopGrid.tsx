"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "./ProductCard";
import type { ProductRow, ProductCategory } from "@/lib/data";
import type { Locale, Dictionary } from "@/app/[lang]/dictionaries";

const SORTS = ["featured", "price-asc", "price-desc", "name"] as const;
type Sort = (typeof SORTS)[number];

const PRICE_BUCKETS: { id: string; min: number; max: number; label: { fr: string; en: string } }[] = [
  { id: "lt100",   min: 0,        max: 100_000,  label: { fr: "Moins de 100 000 FCFA", en: "Under 100,000 FCFA" } },
  { id: "100-200", min: 100_000,  max: 200_000,  label: { fr: "100 000 – 200 000 FCFA", en: "100,000 – 200,000 FCFA" } },
  { id: "200-400", min: 200_000,  max: 400_000,  label: { fr: "200 000 – 400 000 FCFA", en: "200,000 – 400,000 FCFA" } },
  { id: "gt400",   min: 400_000,  max: Infinity, label: { fr: "Plus de 400 000 FCFA",   en: "Over 400,000 FCFA" } },
];

const FABRICS: { id: string; fr: string; en: string; match: RegExp }[] = [
  { id: "wax",      fr: "Wax",              en: "Wax",                       match: /wax/i },
  { id: "soie",     fr: "Soie",             en: "Silk",                      match: /soie|silk/i },
  { id: "dentelle", fr: "Dentelle",         en: "Lace",                      match: /dentelle|lace/i },
  { id: "coton",    fr: "Coton & lin",      en: "Cotton & linen",            match: /coton|cotton|lin\b|linen|chambray|popeline|poplin|sergé|twill/i },
  { id: "satin",    fr: "Satin & taffetas", en: "Satin & taffeta",           match: /satin|taffetas|taffeta|duchesse|mikado/i },
  { id: "velours",  fr: "Velours & tulle",  en: "Velvet & tulle",            match: /velours|velvet|tulle|mousseline|chiffon|organza/i },
  { id: "perles",   fr: "Brodé & perles",   en: "Embroidered & beaded",      match: /perl|bead|brod|embroider|paillet|sequin/i },
];

function fabricGroupsOf(p: ProductRow): string[] {
  const f = `${p.fabric_fr ?? ""} ${p.fabric_en ?? ""}`;
  return FABRICS.filter((g) => g.match.test(f)).map((g) => g.id);
}

type FilterState = {
  categories: Set<string>;
  prices: Set<string>;
  fabrics: Set<string>;
  onlyFeatured: boolean;
};

function emptyFilters(): FilterState {
  return { categories: new Set(), prices: new Set(), fabrics: new Set(), onlyFeatured: false };
}

export default function ShopGrid({
  lang,
  dict,
  initialCategory,
  products,
  categories,
}: {
  lang: Locale;
  dict: Dictionary;
  initialCategory?: string;
  products: ProductRow[];
  categories: ProductCategory[];
}) {
  const [filters, setFilters] = useState<FilterState>(() => {
    const base = emptyFilters();
    if (initialCategory && categories.some((c) => c.slug === initialCategory)) {
      base.categories.add(initialCategory);
    }
    return base;
  });
  const [sort, setSort] = useState<Sort>("featured");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (filters.categories.size > 0 && (!p.category_slug || !filters.categories.has(p.category_slug))) return false;
      if (filters.onlyFeatured && !p.featured) return false;
      if (filters.prices.size > 0) {
        const inAny = PRICE_BUCKETS.some(
          (b) => filters.prices.has(b.id) && p.price_xof >= b.min && p.price_xof < b.max
        );
        if (!inAny) return false;
      }
      if (filters.fabrics.size > 0) {
        const fg = fabricGroupsOf(p);
        if (!fg.some((g) => filters.fabrics.has(g))) return false;
      }
      return true;
    });
    list = [...list];
    if (sort === "price-asc")       list.sort((a, b) => a.price_xof - b.price_xof);
    else if (sort === "price-desc") list.sort((a, b) => b.price_xof - a.price_xof);
    else if (sort === "name")       list.sort((a, b) => a.name.localeCompare(b.name, lang));
    else                            list.sort((a, b) => Number(b.featured) - Number(a.featured));
    return list;
  }, [filters, sort, lang, products]);

  const activeCount =
    filters.categories.size +
    filters.prices.size +
    filters.fabrics.size +
    (filters.onlyFeatured ? 1 : 0);

  function toggleCategory(slug: string) {
    setFilters((f) => {
      const next = new Set(f.categories);
      next.has(slug) ? next.delete(slug) : next.add(slug);
      return { ...f, categories: next };
    });
  }
  function togglePrice(id: string) {
    setFilters((f) => {
      const next = new Set(f.prices);
      next.has(id) ? next.delete(id) : next.add(id);
      return { ...f, prices: next };
    });
  }
  function toggleFabric(id: string) {
    setFilters((f) => {
      const next = new Set(f.fabrics);
      next.has(id) ? next.delete(id) : next.add(id);
      return { ...f, fabrics: next };
    });
  }
  function clearAll() { setFilters(emptyFilters()); }

  const sidebar = (
    <FilterPanel
      filters={filters}
      lang={lang}
      dict={dict}
      products={products}
      categories={categories}
      onToggleCategory={toggleCategory}
      onTogglePrice={togglePrice}
      onToggleFabric={toggleFabric}
      onToggleFeatured={() =>
        setFilters((f) => ({ ...f, onlyFeatured: !f.onlyFeatured }))
      }
      onClear={clearAll}
      activeCount={activeCount}
    />
  );

  const countLabel = filtered.length === 1 ? dict.shop.results_count_one : dict.shop.results_count_other;

  return (
    <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-8 lg:gap-12">
        <aside className="hidden lg:block">
          <div className="lg:sticky lg:top-24">{sidebar}</div>
        </aside>

        <div>
          <div className="flex items-center justify-between gap-3 pb-4 mb-8 border-b" style={{ borderColor: "var(--line-soft)" }}>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden inline-flex items-center gap-2 px-3 py-2 rounded-full border text-[11px] uppercase tracking-[0.18em] font-medium"
                style={{ borderColor: "var(--line)" }}
              >
                <SlidersHorizontal size={14} />
                {dict.shop.filter_open}
                {activeCount > 0 && (
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-mono"
                    style={{ background: "var(--accent)", color: "var(--bg)" }}>
                    {activeCount}
                  </span>
                )}
              </button>
              <span className="font-mono text-[11px] tracking-widest text-[var(--muted)]">
                {filtered.length} {countLabel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
                {dict.shop.sort_label}
              </span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as Sort)}
                className="bg-transparent border rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.18em] font-medium focus:outline-none cursor-pointer"
                style={{ borderColor: "var(--line)" }}
              >
                <option value="featured">{dict.shop.sort_featured}</option>
                <option value="price-asc">{dict.shop.sort_price_asc}</option>
                <option value="price-desc">{dict.shop.sort_price_desc}</option>
                <option value="name">A → Z</option>
              </select>
            </div>
          </div>

          {filtered.length > 0 ? (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
              {filtered.map((p, idx) => (
                <ProductCard key={p.slug} product={p} lang={lang} categories={categories} index={idx} />
              ))}
            </motion.div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-[var(--muted)] mb-4">{dict.shop.empty}</p>
              <button onClick={clearAll} className="ink-link text-[11px] uppercase tracking-[0.22em] font-medium">
                {dict.shop.filter_clear}
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden" />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 left-0 bottom-0 z-[70] w-[85%] max-w-sm flex flex-col lg:hidden"
              style={{ background: "var(--bg)", borderRight: "1px solid var(--line-soft)" }}
            >
              <div className="flex items-center justify-between px-6 h-14 border-b shrink-0" style={{ borderColor: "var(--line-soft)" }}>
                <span className="font-display text-lg">{dict.shop.filters_title}</span>
                <button onClick={() => setMobileOpen(false)} aria-label="close filters" className="p-2 -mr-2">
                  <X size={22} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-6 py-6">{sidebar}</div>
              <div className="px-6 py-4 border-t shrink-0" style={{ borderColor: "var(--line-soft)" }}>
                <button onClick={() => setMobileOpen(false)}
                  className="w-full px-5 py-3 rounded-full text-[11px] uppercase tracking-[0.22em] font-semibold"
                  style={{ background: "var(--fg)", color: "var(--bg)" }}>
                  {dict.shop.filter_apply} · {filtered.length} {countLabel}
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterPanel({
  filters, lang, dict, products, categories,
  onToggleCategory, onTogglePrice, onToggleFabric, onToggleFeatured,
  onClear, activeCount,
}: {
  filters: FilterState;
  lang: Locale;
  dict: Dictionary;
  products: ProductRow[];
  categories: ProductCategory[];
  onToggleCategory: (slug: string) => void;
  onTogglePrice: (id: string) => void;
  onToggleFabric: (id: string) => void;
  onToggleFeatured: () => void;
  onClear: () => void;
  activeCount: number;
}) {
  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-between">
        <span className="font-display text-xl">
          {dict.shop.filters_title}
          {activeCount > 0 && (
            <span className="ml-2 font-mono text-[11px] text-[var(--accent)]">· {activeCount}</span>
          )}
        </span>
        {activeCount > 0 && (
          <button onClick={onClear}
            className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] hover:text-[var(--fg)] transition">
            {dict.shop.filter_clear}
          </button>
        )}
      </div>

      <FilterSection title={dict.shop.filter_category}>
        {categories.map((c) => (
          <CheckRow key={c.slug}
            label={lang === "fr" ? c.label_fr : c.label_en}
            checked={filters.categories.has(c.slug)}
            onChange={() => onToggleCategory(c.slug)}
            count={products.filter((p) => p.category_slug === c.slug).length} />
        ))}
      </FilterSection>

      <FilterSection title={dict.shop.filter_price}>
        {PRICE_BUCKETS.map((b) => {
          const count = products.filter((p) => p.price_xof >= b.min && p.price_xof < b.max).length;
          if (count === 0) return null;
          return (
            <CheckRow key={b.id}
              label={b.label[lang]}
              checked={filters.prices.has(b.id)}
              onChange={() => onTogglePrice(b.id)}
              count={count} />
          );
        })}
      </FilterSection>

      <FilterSection title={dict.shop.filter_fabric}>
        {FABRICS.map((f) => {
          const count = products.filter((p) => fabricGroupsOf(p).includes(f.id)).length;
          if (count === 0) return null;
          return (
            <CheckRow key={f.id}
              label={f[lang]}
              checked={filters.fabrics.has(f.id)}
              onChange={() => onToggleFabric(f.id)}
              count={count} />
          );
        })}
      </FilterSection>

      <div className="pt-4 border-t" style={{ borderColor: "var(--line-soft)" }}>
        <label className="flex items-center gap-3 cursor-pointer group">
          <span className="relative w-9 h-5 rounded-full transition shrink-0"
            style={{ background: filters.onlyFeatured ? "var(--accent)" : "var(--line)" }}>
            <span className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform"
              style={{ background: "var(--bg)", transform: filters.onlyFeatured ? "translateX(16px)" : "translateX(0)" }} />
          </span>
          <span className="text-[13px]">{dict.shop.filter_only_featured}</span>
          <input type="checkbox" checked={filters.onlyFeatured} onChange={onToggleFeatured} className="sr-only" />
        </label>
      </div>
    </div>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] mb-3">{title}</div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function CheckRow({ label, checked, onChange, count }: { label: string; checked: boolean; onChange: () => void; count?: number }) {
  return (
    <label className="flex items-center justify-between gap-3 cursor-pointer group py-1">
      <span className="flex items-center gap-3 min-w-0">
        <span className="relative w-4 h-4 rounded-sm border shrink-0 flex items-center justify-center transition"
          style={{ borderColor: checked ? "var(--accent)" : "var(--line)", background: checked ? "var(--accent)" : "transparent" }}>
          {checked && (
            <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="var(--bg)" strokeWidth="2">
              <path d="M2.5 6.5L5 9L9.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </span>
        <span className="text-[13px] truncate group-hover:text-[var(--accent)] transition">{label}</span>
      </span>
      {typeof count === "number" && (
        <span className="font-mono text-[10px] text-[var(--muted)] shrink-0">{String(count).padStart(2, "0")}</span>
      )}
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    </label>
  );
}
