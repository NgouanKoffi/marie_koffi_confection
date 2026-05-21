import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "../../_components/ui";
import { TeamForm } from "../_Form";
import { updateMember } from "../actions";

export const dynamic = "force-dynamic";

export default async function EditMember({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sb = await createClient();
  const { data } = await sb.from("team_members").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();

  return (
    <div className="space-y-6">
      <PageHeader title={data.name} subtitle="Modifier ce membre." back={{ href: "/admin/team", label: "Retour à l'équipe" }} />
      <TeamForm
        initial={{
          name: data.name ?? "",
          role_fr: data.role_fr ?? "",
          role_en: data.role_en ?? "",
          bio_fr: data.bio_fr ?? "",
          bio_en: data.bio_en ?? "",
          photo_url: data.photo_url ?? "",
          instagram: data.instagram ?? "",
        }}
        action={updateMember.bind(null, id)}
      />
    </div>
  );
}
