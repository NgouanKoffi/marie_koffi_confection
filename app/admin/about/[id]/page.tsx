import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "../../_components/ui";
import { ValueForm } from "../_Form";
import { updateValue } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditValue({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = await createClient();
  const { data } = await sb.from("about_values").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div className="space-y-6">
      <PageHeader title={`Valeur ${data.numeral}`} back={{ href: "/admin/about", label: "Retour à À propos" }} />
      <ValueForm
        initial={{
          numeral: data.numeral ?? "",
          title_fr: data.title_fr ?? "",
          title_en: data.title_en ?? "",
          text_fr: data.text_fr ?? "",
          text_en: data.text_en ?? "",
        }}
        action={updateValue.bind(null, id)}
      />
    </div>
  );
}
