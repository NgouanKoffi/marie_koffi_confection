import { Trash2 } from "lucide-react";
import { getCategories } from "@/lib/data";
import { PageHeader, Card, SubmitButton } from "../../_components/ui";
import { createCategory, updateCategory, deleteCategory } from "../actions";

export const dynamic = "force-dynamic";

export default async function CategoriesAdmin() {
  const cats = await getCategories();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Catégories"
        subtitle="Catégories utilisées pour filtrer la boutique."
        back={{ href: "/admin/boutique", label: "Retour à la boutique" }}
      />

      <Card title="Nouvelle catégorie">
        <form action={createCategory} className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Slug</span>
            <input name="slug" placeholder="auto" className="mt-2 w-full rounded-xl bg-[var(--paper)] border border-[var(--line)] text-[var(--fg)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Label · FR</span>
            <input required name="label_fr" className="mt-2 w-full rounded-xl bg-[var(--paper)] border border-[var(--line)] text-[var(--fg)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--muted)]">Label · EN</span>
            <input name="label_en" className="mt-2 w-full rounded-xl bg-[var(--paper)] border border-[var(--line)] text-[var(--fg)] px-4 py-3 text-sm outline-none focus:border-[var(--accent)]" />
          </label>
          <SubmitButton>Ajouter</SubmitButton>
        </form>
      </Card>

      <Card title={`${cats.length} catégories`}>
        {cats.length === 0 ? (
          <p className="text-[var(--muted)] text-sm">Aucune catégorie.</p>
        ) : (
          <ul className="space-y-3">
            {cats.map((c) => (
              <li key={c.id} className="flex flex-col md:flex-row md:items-center gap-3 rounded-xl ring-1 ring-[var(--line)] bg-[var(--paper)] p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)] w-32 shrink-0">{c.slug}</p>
                <form action={updateCategory.bind(null, c.id)} className="flex-1 flex flex-col md:flex-row gap-2">
                  <input name="label_fr" defaultValue={c.label_fr} className="flex-1 rounded-lg bg-[var(--paper)] border border-[var(--line)] text-[var(--fg)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" />
                  <input name="label_en" defaultValue={c.label_en} className="flex-1 rounded-lg bg-[var(--paper)] border border-[var(--line)] text-[var(--fg)] px-3 py-2 text-sm outline-none focus:border-[var(--accent)]" />
                  <button type="submit" className="text-[10px] uppercase tracking-[0.28em] font-bold text-[var(--bg)] bg-[var(--accent)] hover:opacity-90 rounded-full px-4 py-2 hover:bg-[var(--accent)]/30 transition">Sauver</button>
                </form>
                <form action={deleteCategory.bind(null, c.id)}>
                  <button className="grid place-items-center w-9 h-9 rounded-lg bg-[var(--paper)] ring-1 ring-[var(--line)] text-[var(--muted)] hover:text-[var(--color-rose)] hover:ring-[var(--color-rose)]/40">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
}
