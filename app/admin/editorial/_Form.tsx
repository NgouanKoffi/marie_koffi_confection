import { Card, Field, TextArea, SubmitButton } from "../_components/ui";
import ImageUpload from "../_components/ImageUpload";
import type { EditorialLook } from "@/lib/data";

export type LookInput = Pick<
  EditorialLook,
  "edition_label" | "title_fr" | "title_en" | "caption_fr" | "caption_en" |
  "photo_main_url" | "photo_thumb1_url" | "photo_thumb2_url" | "specs"
>;

export function EditorialForm({ initial, action }: { initial: LookInput; action: (formData: FormData) => void }) {
  const specs = (initial.specs ?? []).slice(0, 4);
  while (specs.length < 4) specs.push({ label_fr: "", label_en: "", value_fr: "", value_en: "" });

  return (
    <form action={action} className="space-y-6">
      <Card title="Édition">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field name="edition_label" label="Numéro" defaultValue={initial.edition_label} required placeholder="01" />
          <div />
          <Field name="title_fr" label="Titre · FR" defaultValue={initial.title_fr ?? ""} placeholder="Wax & Volants" />
          <Field name="title_en" label="Title · EN" defaultValue={initial.title_en ?? ""} />
          <TextArea name="caption_fr" label="Description · FR" defaultValue={initial.caption_fr ?? ""} />
          <TextArea name="caption_en" label="Description · EN" defaultValue={initial.caption_en ?? ""} />
        </div>
      </Card>

      <Card title="Photos">
        <div className="flex flex-wrap gap-6">
          <ImageUpload name="photo_main_url"   subfolder="editorial" label="Photo principale" initial={initial.photo_main_url ?? ""} />
          <ImageUpload name="photo_thumb1_url" subfolder="editorial" label="Vignette 1"       initial={initial.photo_thumb1_url ?? ""} />
          <ImageUpload name="photo_thumb2_url" subfolder="editorial" label="Vignette 2"       initial={initial.photo_thumb2_url ?? ""} />
        </div>
      </Card>

      <Card title="Spécifications">
        <p className="text-[11px] text-[var(--muted)] mb-4">Jusqu&apos;à 4 lignes (laissez vide pour ignorer).</p>
        <div className="space-y-5">
          {specs.map((s, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-4 ring-1 ring-[var(--line-soft)] bg-[var(--paper)]">
              <Field name={`spec_${i}_label_fr`} label="Label · FR" defaultValue={s.label_fr ?? ""} placeholder="Tissu" />
              <Field name={`spec_${i}_label_en`} label="Label · EN" defaultValue={s.label_en ?? ""} />
              <Field name={`spec_${i}_value_fr`} label="Valeur · FR" defaultValue={s.value_fr ?? ""} />
              <Field name={`spec_${i}_value_en`} label="Value · EN"  defaultValue={s.value_en ?? ""} />
            </div>
          ))}
        </div>
      </Card>

      <div className="flex justify-end">
        <SubmitButton>Enregistrer</SubmitButton>
      </div>
    </form>
  );
}
