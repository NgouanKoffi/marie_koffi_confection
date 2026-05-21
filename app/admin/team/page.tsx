import Link from "next/link";
import { Plus, ArrowUp, ArrowDown, Pencil, Trash2 } from "lucide-react";
import { getTeam } from "@/lib/data";
import { PageHeader, Card } from "../_components/ui";
import { deleteMember, reorderMember } from "./actions";

export const dynamic = "force-dynamic";

export default async function TeamAdmin() {
  const members = await getTeam();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notre équipe"
        subtitle="Membres affichés dans la section Notre équipe sur la page d'accueil."
        right={
          <Link href="/admin/team/new" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] font-bold text-[var(--bg)] bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--accent)] hover:-translate-y-px transition">
            <Plus className="w-3.5 h-3.5" />
            Nouveau
          </Link>
        }
      />

      <Card title={`${members.length} membres`}>
        {members.length === 0 ? (
          <p className="text-[var(--muted)] text-sm">Aucun membre. Cliquez sur Nouveau.</p>
        ) : (
          <ul className="space-y-3">
            {members.map((m, i) => (
              <li key={m.id} className="flex items-center gap-4 rounded-xl ring-1 ring-[var(--line)] bg-[var(--paper)] p-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-[var(--paper)] shrink-0">
                  {m.photo_url ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={m.photo_url} alt="" className="w-full h-full object-cover" />
                  ) : <div className="w-full h-full grid place-items-center text-[var(--muted)]/70 text-[9px]">—</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-base text-[var(--fg)] truncate">{m.name}</p>
                  <p className="text-[11px] text-[var(--muted)] truncate">{m.role_fr || m.role_en}</p>
                </div>
                <div className="flex items-center gap-1">
                  <form action={reorderMember.bind(null, m.id, -1)}>
                    <button disabled={i === 0} className="grid place-items-center w-8 h-8 rounded-lg bg-[var(--paper)] ring-1 ring-[var(--line)] text-[var(--muted)] disabled:opacity-30">
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  </form>
                  <form action={reorderMember.bind(null, m.id, 1)}>
                    <button disabled={i === members.length - 1} className="grid place-items-center w-8 h-8 rounded-lg bg-[var(--paper)] ring-1 ring-[var(--line)] text-[var(--muted)] disabled:opacity-30">
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </form>
                  <Link href={`/admin/team/${m.id}`} className="grid place-items-center w-8 h-8 rounded-lg bg-[var(--paper)] ring-1 ring-[var(--line)] text-[var(--muted)] hover:text-[var(--accent)]">
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <form action={deleteMember.bind(null, m.id)}>
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
