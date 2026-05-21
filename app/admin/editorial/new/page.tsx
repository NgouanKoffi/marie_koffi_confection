import { PageHeader } from "../../_components/ui";
import { EditorialForm } from "../_Form";
import { createLook } from "../actions";

export const dynamic = "force-dynamic";

export default function NewLook() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Nouvelle édition"
        subtitle="Ajoutez une édition à la sélection éditoriale."
        back={{ href: "/admin/editorial", label: "Retour à la sélection" }}
      />
      <EditorialForm
        initial={{
          edition_label: "",
          title_fr: "", title_en: "",
          caption_fr: "", caption_en: "",
          photo_main_url: "", photo_thumb1_url: "", photo_thumb2_url: "",
          specs: [],
        }}
        action={createLook}
      />
    </div>
  );
}
