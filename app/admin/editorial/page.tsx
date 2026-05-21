import Link from "next/link";
import { Plus, ArrowUp, ArrowDown, Pencil, Trash2 } from "lucide-react";
import { getEditorial } from "@/lib/data";
import { PageHeader, Card } from "../_components/ui";
import { deleteLook, reorderLook } from "./actions";

export const dynamic = "force-dynamic";

export default async function EditorialAdmin() {
  const looks = await getEditorial();

  return (
    <div className="space-y-6">
      <PageHeader
        number="CHAPITRE / 02"
        title="Sélection"
        subtitle="Éditions affichées dans la section Sélection sur la page d'accueil."
        right={
          <Link href="/admin/editorial/new" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] font-bold bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--accent)] transition">
            <Plus className="w-3.5 h-3.5" />
            Nouvelle édition
          </Link>
        }
      />

      <Card title={`${looks.length} éditions`}>
        {looks.length === 0 ? (
          <p className="text-[var(--muted)] text-sm">Aucune édition.</p>
        ) : (
          <ul className="space-y-3">
            {looks.map((l, i) => (
              <li key={l.id} className="flex items-center gap-4 ring-1 ring-[var(--line)] bg-[var(--paper)] p-3">
                <div className="w-14 h-20 overflow-hidden bg-[var(--paper)] shrink-0">
                  {l.photo_main_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={l.photo_main_url} alt="" className="w-full h-full object-cover" />
                  ) : <div className="w-full h-full grid place-items-center text-[var(--muted)]/70 text-[9px]">—</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">Édition {l.edition_label}</p>
                  <p className="font-display text-base text-[var(--fg)] truncate mt-0.5">{l.title_fr || l.title_en || "—"}</p>
                </div>
                <div className="flex items-center gap-1">
                  <form action={reorderLook.bind(null, l.id, -1)}>
                    <button disabled={i === 0} className="grid place-items-center w-8 h-8 ring-1 ring-[var(--line)] text-[var(--muted)] disabled:opacity-30">
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  </form>
                  <form action={reorderLook.bind(null, l.id, 1)}>
                    <button disabled={i === looks.length - 1} className="grid place-items-center w-8 h-8 ring-1 ring-[var(--line)] text-[var(--muted)] disabled:opacity-30">
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </form>
                  <Link href={`/admin/editorial/${l.id}`} className="grid place-items-center w-8 h-8 ring-1 ring-[var(--line)] text-[var(--muted)] hover:text-[var(--accent)]">
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <form action={deleteLook.bind(null, l.id)}>
                    <button className="grid place-items-center w-8 h-8 ring-1 ring-[var(--line)] text-[var(--muted)] hover:text-[var(--color-rose)]">
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
