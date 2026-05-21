import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getDictionary, hasLocale } from "../../dictionaries";
import ProductGallery from "@/components/ProductGallery";
import OrderCta from "@/components/OrderCta";
import ProductCard from "@/components/ProductCard";
import { formatPrice } from "@/lib/format";
import { getProducts, getProductBySlug, getCategories } from "@/lib/data";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/boutique/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const product = await getProductBySlug(slug);
  if (!product) return {};
  const dict = await getDictionary(lang);
  const description = (lang === "fr" ? product.description_fr : product.description_en) ?? "";
  const cover = product.cover_url || product.photos[0];
  return {
    title: `${product.name} — ${dict.shop.title}`,
    description,
    openGraph: {
      title: product.name,
      description,
      images: cover ? [cover] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: PageProps<"/[lang]/boutique/[slug]">) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const [product, allProducts, categories] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
    getCategories(),
  ]);
  if (!product) notFound();

  const dict = await getDictionary(lang);
  const category = categories.find((c) => c.slug === product.category_slug);
  const categoryLabel = category ? (lang === "fr" ? category.label_fr : category.label_en) : "";

  const imageUrls = [product.cover_url, ...product.photos].filter(Boolean) as string[];
  const images = imageUrls.map((src) => ({ src, alt: product.name }));

  const related = allProducts
    .filter((p) => p.slug !== product.slug && p.category_slug === product.category_slug)
    .slice(0, 4);

  const description = (lang === "fr" ? product.description_fr : product.description_en) ?? "";
  const fabric     = (lang === "fr" ? product.fabric_fr     : product.fabric_en)     ?? "";
  const details    = (lang === "fr" ? product.details_fr    : product.details_en)    ?? [];

  return (
    <>
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 pt-24 md:pt-32 pb-6">
        <Link href={`/${lang}/boutique`}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)] hover:text-[var(--fg)] transition">
          <ArrowLeft size={14} />
          {dict.shop.back}
        </Link>
      </div>

      <section className="mx-auto max-w-[1400px] px-6 sm:px-10 pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] gap-10 lg:gap-16 items-start">
        <div className="w-full">
          {images.length > 0 ? (
            <ProductGallery images={images} />
          ) : (
            <div className="aspect-[3/4] w-full bg-[var(--paper)] grid place-items-center text-[var(--muted)] text-sm">
              {lang === "fr" ? "Aucune photo" : "No photos"}
            </div>
          )}
        </div>

        <div className="flex flex-col lg:sticky lg:top-24 lg:self-start">
          {categoryLabel && (
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[var(--muted)]">
                {categoryLabel}
              </span>
              <span className="h-px flex-1 bg-[var(--line)]" />
            </div>
          )}

          <h1 className="font-display font-light text-[2.75rem] md:text-[3.75rem] leading-[0.95] tracking-tight">
            {product.name}
            <span className="italic text-[var(--accent)]">.</span>
          </h1>

          <div className="mt-6 flex items-baseline gap-4">
            <span className="font-display text-2xl md:text-3xl">{formatPrice(product.price_xof, lang)}</span>
            <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--muted)]">
              {dict.shop.price_note}
            </span>
          </div>

          {description && (
            <p className="mt-6 text-[15px] leading-relaxed text-pretty">{description}</p>
          )}

          {(fabric || details.length > 0) && (
            <dl className="mt-8 grid grid-cols-1 gap-3 border-t pt-6 text-sm" style={{ borderColor: "var(--line-soft)" }}>
              {fabric && (
                <div className="flex justify-between gap-6">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">{dict.shop.fabric_label}</dt>
                  <dd className="text-right">{fabric}</dd>
                </div>
              )}
              {details.map((d) => (
                <div key={d} className="flex justify-between gap-6">
                  <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">{dict.shop.detail_label}</dt>
                  <dd className="text-right">{d}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="mt-10">
            <OrderCta product={{ name: product.name, price: product.price_xof, slug: product.slug }} lang={lang} dict={dict} />
            <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
              {dict.shop.order_note}
            </p>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1500px] px-6 sm:px-10 pb-20">
          <header className="flex items-end justify-between gap-4 mb-8 pb-4 border-b" style={{ borderColor: "var(--line-soft)" }}>
            <h2 className="font-display text-2xl md:text-3xl">
              {dict.shop.related_title}
              <span className="italic text-[var(--accent)]">.</span>
            </h2>
            <Link href={`/${lang}/boutique`} className="ink-link text-[11px] uppercase tracking-[0.2em]">
              {dict.shop.see_all}
            </Link>
          </header>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-10">
            {related.map((p, idx) => (
              <ProductCard key={p.slug} product={p} lang={lang} categories={categories} index={idx} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
