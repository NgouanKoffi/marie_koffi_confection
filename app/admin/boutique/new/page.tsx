import { getCategories } from "@/lib/data";
import { PageHeader } from "../../_components/ui";
import { ProductForm } from "../_Form";
import { createProduct } from "../actions";

export const dynamic = "force-dynamic";

export default async function NewProduct() {
  const cats = await getCategories();
  return (
    <div className="space-y-6">
      <PageHeader title="Nouvelle pièce" subtitle="Ajoutez une pièce à la boutique." back={{ href: "/admin/boutique", label: "Retour à la boutique" }} />
      <ProductForm
        categories={cats}
        action={createProduct}
        initial={{
          name: "", slug: "", category_slug: null, price_xof: 0,
          fabric_fr: "", fabric_en: "",
          description_fr: "", description_en: "",
          details_fr: [], details_en: [],
          cover_url: "", featured: false, photos: [],
        }}
      />
    </div>
  );
}
