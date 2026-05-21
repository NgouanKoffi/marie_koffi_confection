import { getSiteSettings } from "@/lib/data";
import { PageHeader, Card, Field, SubmitButton } from "../_components/ui";
import { saveContact } from "./actions";

export const dynamic = "force-dynamic";

export default async function ContactAdmin() {
  const { contact, socials } = await getSiteSettings();

  return (
    <div className="space-y-6">
      <PageHeader title="Contact & socials" subtitle="Coordonnées affichées sur le site, les CTAs WhatsApp et le pied de page." />
      <form action={saveContact} className="space-y-6">
        <Card title="Coordonnées">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field name="whatsapp" label="WhatsApp (sans +)" defaultValue={contact.whatsapp ?? ""} placeholder="2250757595849" />
            <Field name="whatsapp_label" label="WhatsApp affiché" defaultValue={contact.whatsapp_label ?? ""} placeholder="+225 07 57 59 58 49" />
            <Field name="phone" label="Téléphone" defaultValue={contact.phone ?? ""} />
            <Field name="email" label="Email" type="email" defaultValue={contact.email ?? ""} />
            <Field name="address_fr" label="Adresse · FR" defaultValue={contact.address_fr ?? ""} />
            <Field name="address_en" label="Address · EN" defaultValue={contact.address_en ?? ""} />
          </div>
        </Card>

        <Card title="Réseaux sociaux">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Field name="instagram" label="Instagram (handle ou URL)" defaultValue={socials.instagram ?? ""} placeholder="@mariekoffi" />
            <Field name="facebook"  label="Facebook (URL)"  defaultValue={socials.facebook ?? ""} />
            <Field name="tiktok"    label="TikTok (handle ou URL)" defaultValue={socials.tiktok ?? ""} />
            <Field name="linkedin"  label="LinkedIn (URL)"  defaultValue={socials.linkedin ?? ""} />
          </div>
        </Card>

        <div className="flex justify-end">
          <SubmitButton>Enregistrer</SubmitButton>
        </div>
      </form>
    </div>
  );
}
