import Link from "next/link";
import { Plus, ArrowUp, ArrowDown, Pencil, Trash2, Star } from "lucide-react";
import { getProducts, getCategories } from "@/lib/data";
import { PageHeader, Card } from "../_components/ui";
import { deleteProduct, reorderProduct } from "./actions";

export const dynamic = "force-dynamic";

function fmtFcfa(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n) + " FCFA";
}

export default async function BoutiqueAdmin() {
  const [products, cats] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Boutique"
        subtitle="Pièces affichées dans la boutique et la section Pièces phares."
        right={
          <div className="flex gap-2">
            <Link href="/admin/boutique/categories" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] font-bold border border-[var(--line)] text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition">
              Catégories ({cats.length})
            </Link>
            <Link href="/admin/boutique/new" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] font-bold text-[var(--bg)] bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--accent)]">
              <Plus className="w-3.5 h-3.5" />
              Nouvelle pièce
            </Link>
          </div>
        }
      />

      <Card title={`${products.length} pièces`}>
        {products.length === 0 ? (
          <p className="text-[var(--muted)] text-sm">Aucune pièce. Créez-en une.</p>
        ) : (
          <ul className="space-y-3">
            {products.map((p, i) => (
              <li key={p.id} className="flex items-center gap-4 rounded-xl ring-1 ring-[var(--line)] bg-[var(--paper)] p-3">
                <div className="w-14 h-20 rounded-xl overflow-hidden bg-[var(--paper)] shrink-0">
                  {p.cover_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={p.cover_url} alt="" className="w-full h-full object-cover" />
                  ) : <div className="w-full h-full grid place-items-center text-[var(--muted)]/70 text-[9px]">—</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-base text-[var(--fg)] truncate flex items-center gap-2">
                    {p.name}
                    {p.featured && <Star className="w-3.5 h-3.5 text-[var(--accent)] fill-[var(--accent)]" />}
                  </p>
                  <p className="text-[11px] text-[var(--muted)] truncate">
                    {p.category_slug ?? "—"} · {fmtFcfa(p.price_xof)} · {p.photos.length} photo{p.photos.length > 1 ? "s" : ""}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <form action={reorderProduct.bind(null, p.id, -1)}>
                    <button disabled={i === 0} className="grid place-items-center w-8 h-8 rounded-lg bg-[var(--paper)] ring-1 ring-[var(--line)] text-[var(--muted)] disabled:opacity-30">
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  </form>
                  <form action={reorderProduct.bind(null, p.id, 1)}>
                    <button disabled={i === products.length - 1} className="grid place-items-center w-8 h-8 rounded-lg bg-[var(--paper)] ring-1 ring-[var(--line)] text-[var(--muted)] disabled:opacity-30">
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </form>
                  <Link href={`/admin/boutique/${p.id}`} className="grid place-items-center w-8 h-8 rounded-lg bg-[var(--paper)] ring-1 ring-[var(--line)] text-[var(--muted)] hover:text-[var(--accent)]">
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <form action={deleteProduct.bind(null, p.id)}>
                    <button className="grid place-items-center w-8 h-8 rounded-lg bg-[var(--paper)] ring-1 ring-[var(--line)] text-[var(--muted)] hover:text-[var(--color-rose)]">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
