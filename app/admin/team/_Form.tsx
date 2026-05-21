import { Card, Field, TextArea, SubmitButton } from "../_components/ui";
import ImageUpload from "../_components/ImageUpload";

export type MemberInput = {
  name: string;
  role_fr: string;
  role_en: string;
  bio_fr: string;
  bio_en: string;
  photo_url: string;
  instagram: string;
};

export function TeamForm({ initial, action }: { initial: MemberInput; action: (formData: FormData) => void }) {
  return (
    <form action={action} className="space-y-6">
      <Card title="Identité">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field name="name"      label="Nom" defaultValue={initial.name} required />
          <Field name="instagram" label="Instagram" defaultValue={initial.instagram} placeholder="@handle ou URL" />
          <Field name="role_fr"   label="Rôle · FR" defaultValue={initial.role_fr} />
          <Field name="role_en"   label="Role · EN" defaultValue={initial.role_en} />
          <TextArea name="bio_fr" label="Bio · FR" defaultValue={initial.bio_fr} />
          <TextArea name="bio_en" label="Bio · EN" defaultValue={initial.bio_en} />
        </div>
        <div className="mt-6">
          <ImageUpload name="photo_url" subfolder="team" label="Photo" initial={initial.photo_url} aspect="aspect-[3/4]" width="w-40" />
        </div>
      </Card>

      <div className="flex justify-end">
        <SubmitButton>Enregistrer</SubmitButton>
      </div>
    </form>
  );
}
