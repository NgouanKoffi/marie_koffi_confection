import { PageHeader } from "../../_components/ui";
import { TeamForm } from "../_Form";
import { createMember } from "../actions";

export const dynamic = "force-dynamic";

export default function NewMember() {
  return (
    <div className="space-y-6">
      <PageHeader title="Nouveau membre" subtitle="Ajoutez un membre à la section Notre équipe." back={{ href: "/admin/team", label: "Retour à l'équipe" }} />
      <TeamForm initial={{ name: "", role_fr: "", role_en: "", bio_fr: "", bio_en: "", photo_url: "", instagram: "" }} action={createMember} />
    </div>
  );
}
