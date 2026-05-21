import { getAboutMeta } from "@/lib/data";
import { PageHeader, Card, Field, TextArea, SubmitButton } from "../_components/ui";
import ImageUpload from "../_components/ImageUpload";
import { saveAtelier } from "../about/actions";

export const dynamic = "force-dynamic";

export default async function AtelierAdmin() {
  const meta = await getAboutMeta();

  return (
    <div className="space-y-8">
      <PageHeader
        number="CHAPITRE / 03"
        title="Atelier · Abidjan"
        subtitle="Sous-bloc « Atelier · Abidjan » de la page d'accueil : texte + 2 photos côte à côte. (Les autres sous-blocs du bloc Atelier restent en dur dans le code.)"
      />

      <form action={saveAtelier} className="space-y-8">
        <Card title="Atelier · Abidjan" caption="TEXTE + 2 PHOTOS">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field name="atelier_eyebrow_fr" label="Eyebrow · FR" defaultValue={meta.atelier_eyebrow_fr ?? ""} placeholder="Atelier · Abidjan" />
            <Field name="atelier_eyebrow_en" label="Eyebrow · EN" defaultValue={meta.atelier_eyebrow_en ?? ""} />
            <Field name="atelier_title_fr"   label="Titre · FR"  defaultValue={meta.atelier_title_fr ?? ""} placeholder="L'atelier, la main, la pièce." />
            <Field name="atelier_title_en"   label="Title · EN"  defaultValue={meta.atelier_title_en ?? ""} />
            <TextArea name="atelier_text_fr" label="Texte · FR" defaultValue={meta.atelier_text_fr ?? ""} />
            <TextArea name="atelier_text_en" label="Text · EN"  defaultValue={meta.atelier_text_en ?? ""} />
            <Field name="atelier_cta_fr" label="CTA · FR" defaultValue={meta.atelier_cta_fr ?? ""} placeholder="En savoir plus" />
            <Field name="atelier_cta_en" label="CTA · EN" defaultValue={meta.atelier_cta_en ?? ""} placeholder="Learn more" />
          </div>
          <div className="mt-7 flex flex-wrap gap-6">
            <ImageUpload name="atelier_photo_left_url"  subfolder="atelier" label="Photo gauche" initial={meta.atelier_photo_left_url ?? ""} aspect="aspect-[3/4]" />
            <ImageUpload name="atelier_photo_right_url" subfolder="atelier" label="Photo droite" initial={meta.atelier_photo_right_url ?? ""} aspect="aspect-[3/4]" />
          </div>
        </Card>

        <div className="flex justify-end">
          <SubmitButton>Enregistrer</SubmitButton>
        </div>
      </form>
    </div>
  );
}
