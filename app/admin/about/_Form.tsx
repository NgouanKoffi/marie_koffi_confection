import { Card, Field, TextArea, SubmitButton } from "../_components/ui";

export type ValueInput = {
  numeral: string;
  title_fr: string;
  title_en: string;
  text_fr: string;
  text_en: string;
};

export function ValueForm({ initial, action }: { initial: ValueInput; action: (formData: FormData) => void }) {
  return (
    <form action={action} className="space-y-6">
      <Card title="Valeur">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Field name="numeral"  label="Numéro romain" defaultValue={initial.numeral} placeholder="I, II, III..." required />
          <div />
          <Field name="title_fr" label="Titre · FR" defaultValue={initial.title_fr} />
          <Field name="title_en" label="Title · EN" defaultValue={initial.title_en} />
          <TextArea name="text_fr" label="Texte · FR" defaultValue={initial.text_fr} />
          <TextArea name="text_en" label="Text · EN" defaultValue={initial.text_en} />
        </div>
      </Card>
      <div className="flex justify-end">
        <SubmitButton>Enregistrer</SubmitButton>
      </div>
    </form>
  );
}
