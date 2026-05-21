import { Card, Field, TextArea, Select, SubmitButton } from "../_components/ui";
import ImageUpload from "../_components/ImageUpload";
import MultiImageUpload from "../_components/MultiImageUpload";
import type { ProductRow, ProductCategory } from "@/lib/data";

export type ProductInput = Pick<
  ProductRow,
  "name" | "slug" | "category_slug" | "price_xof" |
  "fabric_fr" | "fabric_en" | "description_fr" | "description_en" |
  "details_fr" | "details_en" | "cover_url" | "featured" | "photos"
>;

export function ProductForm({
  initial,
  categories,
  action,
}: {
  initial: ProductInput;
  categories: ProductCategory[];
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="space-y-6">
      <Card title="Pièce">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field name="name" label="Nom" defaultValue={initial.name ?? ""} required />
          <Field name="slug" label="Slug" defaultValue={initial.slug ?? ""} hint="Optionnel — auto depuis le nom" />
          <Select name="category_slug" label="Catégorie" defaultValue={initial.category_slug ?? ""}>
            <option value="">— aucune —</option>
            {categories.map((c) => (
              <option key={c.id} value={c.slug}>{c.label_fr}</option>
            ))}
          </Select>
          <Field name="price_xof" label="Prix (FCFA)" type="number" min={0} step={1000} defaultValue={initial.price_xof ?? 0} />
          <Field name="fabric_fr" label="Tissu · FR" defaultValue={initial.fabric_fr ?? ""} />
          <Field name="fabric_en" label="Fabric · EN" defaultValue={initial.fabric_en ?? ""} />
          <TextArea name="description_fr" label="Description · FR" defaultValue={initial.description_fr ?? ""} />
          <TextArea name="description_en" label="Description · EN" defaultValue={initial.description_en ?? ""} />
          <TextArea name="details_fr" label="Détails · FR (1 par ligne)" defaultValue={(initial.details_fr ?? []).join("\n")} hint="Ex: Confection sur mesure" />
          <TextArea name="details_en" label="Details · EN (one per line)" defaultValue={(initial.details_en ?? []).join("\n")} />
        </div>

        <label className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--fg)] cursor-pointer">
          <input type="checkbox" name="featured" defaultChecked={initial.featured} className="w-4 h-4 accent-[var(--accent)]" />
          Mise en avant (Pièces phares sur l&apos;accueil)
        </label>
      </Card>

      <Card title="Photo de couverture">
        <ImageUpload name="cover_url" subfolder="products" label="Couverture" initial={initial.cover_url ?? ""} aspect="aspect-[3/4]" width="w-44" />
      </Card>

      <Card title="Galerie photos">
        <MultiImageUpload name="photos" subfolder="products" label="Photos additionnelles" initial={initial.photos ?? []} />
      </Card>

      <div className="flex justify-end">
        <SubmitButton>Enregistrer</SubmitButton>
      </div>
    </form>
  );
}
