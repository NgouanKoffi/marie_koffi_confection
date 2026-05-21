import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import ShopHeader from "@/components/ShopHeader";
import ShopGrid from "@/components/ShopGrid";
import { getProducts, getCategories } from "@/lib/data";

export async function generateMetadata({ params }: PageProps<"/[lang]/boutique">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.shop.title };
}

export default async function BoutiquePage({
  params,
  searchParams,
}: PageProps<"/[lang]/boutique">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const sp = await searchParams;

  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const catSlug = typeof sp.cat === "string" ? sp.cat : undefined;
  const initialCategory = catSlug && categories.some((c) => c.slug === catSlug) ? catSlug : undefined;

  const minPrice = products.length > 0 ? Math.min(...products.map((p) => p.price_xof)) : null;

  return (
    <>
      <ShopHeader
        lang={lang}
        dict={dict}
        productsCount={products.length}
        categoriesCount={categories.length}
        minPrice={minPrice}
      />
      <section className="pb-20">
        {products.length === 0 ? (
          <div className="mx-auto max-w-[800px] px-6 sm:px-10 py-20 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="font-mono text-[10px] tracking-[0.28em] text-[var(--muted)]">BOUTIQUE</span>
              <span className="h-px w-10 bg-[var(--fg)]" />
            </div>
            <h2 className="font-display font-light text-3xl md:text-5xl tracking-tight leading-tight">
              {lang === "fr" ? "Aucune pièce pour l'instant" : "No pieces yet"}
              <span className="italic text-[var(--accent)]">.</span>
            </h2>
            <p className="mt-5 text-[14px] text-[var(--muted)] leading-relaxed">
              {lang === "fr"
                ? "La boutique sera bientôt disponible. De nouvelles pièces sont en cours de préparation à l'atelier."
                : "The shop will be available soon. New pieces are being prepared at the atelier."}
            </p>
          </div>
        ) : (
          <ShopGrid lang={lang} dict={dict} initialCategory={initialCategory} products={products} categories={categories} />
        )}
      </section>
    </>
  );
}
