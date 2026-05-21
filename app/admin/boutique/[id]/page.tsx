import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCategories } from "@/lib/data";
import { PageHeader } from "../../_components/ui";
import { ProductForm } from "../_Form";
import { updateProduct } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = await createClient();
  const [{ data }, cats] = await Promise.all([
    sb.from("products").select(`
      id, name, slug, category_slug, price_xof,
      fabric_fr, fabric_en, description_fr, description_en,
      details_fr, details_en, cover_url, featured,
      photos:product_photos(url, order_index)
    `).eq("id", id).maybeSingle(),
    getCategories(),
  ]);
  if (!data) notFound();

  const photos = (data.photos ?? [])
    .slice()
    .sort((a: any, b: any) => a.order_index - b.order_index)
    .map((p: any) => p.url);

  return (
    <div className="space-y-6">
      <PageHeader title={data.name} subtitle="Modifier cette pièce." back={{ href: "/admin/boutique", label: "Retour à la boutique" }} />
      <ProductForm
        categories={cats}
        action={updateProduct.bind(null, id)}
        initial={{
          name: data.name ?? "",
          slug: data.slug ?? "",
          category_slug: data.category_slug ?? null,
          price_xof: data.price_xof ?? 0,
          fabric_fr: data.fabric_fr ?? "",
          fabric_en: data.fabric_en ?? "",
          description_fr: data.description_fr ?? "",
          description_en: data.description_en ?? "",
          details_fr: Array.isArray(data.details_fr) ? data.details_fr : [],
          details_en: Array.isArray(data.details_en) ? data.details_en : [],
          cover_url: data.cover_url ?? "",
          featured: !!data.featured,
          photos,
        }}
      />
    </div>
  );
}
