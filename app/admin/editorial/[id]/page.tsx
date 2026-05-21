import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "../../_components/ui";
import { EditorialForm } from "../_Form";
import { updateLook } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditLook({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = await createClient();
  const { data } = await sb.from("editorial_looks").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Édition ${data.edition_label}`}
        subtitle="Modifier cette édition."
        back={{ href: "/admin/editorial", label: "Retour à la sélection" }}
      />
      <EditorialForm
        initial={{
          edition_label: data.edition_label,
          title_fr: data.title_fr ?? "",
          title_en: data.title_en ?? "",
          caption_fr: data.caption_fr ?? "",
          caption_en: data.caption_en ?? "",
          photo_main_url: data.photo_main_url ?? "",
          photo_thumb1_url: data.photo_thumb1_url ?? "",
          photo_thumb2_url: data.photo_thumb2_url ?? "",
          specs: Array.isArray(data.specs) ? data.specs : [],
        }}
        action={updateLook.bind(null, id)}
      />
    </div>
  );
}
