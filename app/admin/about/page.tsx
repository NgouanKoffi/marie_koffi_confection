import Link from "next/link";
import { Plus, ArrowUp, ArrowDown, Pencil, Trash2 } from "lucide-react";
import { getAboutMeta, getAboutValues } from "@/lib/data";
import { PageHeader, Card, Field, TextArea, SubmitButton } from "../_components/ui";
import ImageUpload from "../_components/ImageUpload";
import { saveAboutPage, deleteValue, reorderValue } from "./actions";

export const dynamic = "force-dynamic";

export default async function AboutAdmin() {
  const [meta, values] = await Promise.all([getAboutMeta(), getAboutValues()]);

  return (
    <div className="space-y-8">
      <PageHeader number="CHAPITRE / 04" title="À propos" subtitle="Page À propos (publique : /fr/about et /en/about). Le bloc Atelier de l'accueil est dans /admin/atelier." />

      <form action={saveAboutPage} className="space-y-6">
        <Card title="En-tête" caption="HAUT DE PAGE">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field name="eyebrow_fr" label="Eyebrow · FR" defaultValue={meta.eyebrow_fr ?? ""} />
            <Field name="eyebrow_en" label="Eyebrow · EN" defaultValue={meta.eyebrow_en ?? ""} />
            <Field name="title_fr"   label="Titre · FR"  defaultValue={meta.title_fr ?? ""} />
            <Field name="title_en"   label="Title · EN"  defaultValue={meta.title_en ?? ""} />
            <TextArea name="lead_fr" label="Lead · FR" defaultValue={meta.lead_fr ?? ""} />
            <TextArea name="lead_en" label="Lead · EN" defaultValue={meta.lead_en ?? ""} />
            <TextArea name="p1_fr" label="Paragraphe 1 · FR" defaultValue={meta.p1_fr ?? ""} />
            <TextArea name="p1_en" label="Paragraph 1 · EN" defaultValue={meta.p1_en ?? ""} />
            <TextArea name="p2_fr" label="Paragraphe 2 · FR" defaultValue={meta.p2_fr ?? ""} />
            <TextArea name="p2_en" label="Paragraph 2 · EN" defaultValue={meta.p2_en ?? ""} />
          </div>
          <div className="mt-6">
            <ImageUpload name="founder_photo_url" subfolder="about" label="Photo fondatrice" initial={meta.founder_photo_url ?? ""} aspect="aspect-[3/4]" width="w-44" />
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field name="cta_fr" label="CTA bas de page · FR" defaultValue={meta.cta_fr ?? ""} />
            <Field name="cta_en" label="CTA bas de page · EN" defaultValue={meta.cta_en ?? ""} />
          </div>
        </Card>

        <div className="flex justify-end">
          <SubmitButton>Enregistrer</SubmitButton>
        </div>
      </form>

      <PageHeader
        number="CHAPITRE / 04.B"
        title="Valeurs"
        subtitle="Trois principes affichés en cartes sur la page À propos."
        right={
          <Link href="/admin/about/new" className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] uppercase tracking-[0.28em] font-bold bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--accent)] transition">
            <Plus className="w-3.5 h-3.5" />
            Nouvelle valeur
          </Link>
        }
      />

      <Card title={`${values.length} valeurs`} caption="LISTE">
        {values.length === 0 ? (
          <p className="text-[var(--muted)] text-sm">Aucune valeur.</p>
        ) : (
          <ul className="space-y-3">
            {values.map((v, i) => (
              <li key={v.id} className="flex items-center gap-4 ring-1 ring-[var(--line)] bg-[var(--paper)] p-3">
                <p className="font-display text-2xl text-[var(--accent)] w-12 shrink-0 text-center">{v.numeral}</p>
                <div className="flex-1 min-w-0">
                  <p className="font-display text-base text-[var(--fg)] truncate">{v.title_fr || "—"}</p>
                  <p className="text-[11px] text-[var(--muted)] truncate">{v.text_fr}</p>
                </div>
                <div className="flex items-center gap-1">
                  <form action={reorderValue.bind(null, v.id, -1)}>
                    <button disabled={i === 0} className="grid place-items-center w-8 h-8 ring-1 ring-[var(--line)] text-[var(--muted)] disabled:opacity-30">
                      <ArrowUp className="w-4 h-4" />
                    </button>
                  </form>
                  <form action={reorderValue.bind(null, v.id, 1)}>
                    <button disabled={i === values.length - 1} className="grid place-items-center w-8 h-8 ring-1 ring-[var(--line)] text-[var(--muted)] disabled:opacity-30">
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </form>
                  <Link href={`/admin/about/${v.id}`} className="grid place-items-center w-8 h-8 ring-1 ring-[var(--line)] text-[var(--muted)] hover:text-[var(--accent)]">
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <form action={deleteValue.bind(null, v.id)}>
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
