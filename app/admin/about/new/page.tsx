import { PageHeader } from "../../_components/ui";
import { ValueForm } from "../_Form";
import { createValue } from "../actions";

export const dynamic = "force-dynamic";

export default function NewValue() {
  return (
    <div className="space-y-6">
      <PageHeader title="Nouvelle valeur" back={{ href: "/admin/about", label: "Retour à À propos" }} />
      <ValueForm initial={{ numeral: "I", title_fr: "", title_en: "", text_fr: "", text_en: "" }} action={createValue} />
    </div>
  );
}
