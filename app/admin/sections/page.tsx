import { getSiteSettings } from "@/lib/data";
import { PageHeader, Card } from "../_components/ui";
import SectionsForm from "./SectionsForm";

export const dynamic = "force-dynamic";

export default async function SectionsAdmin() {
  const { sections } = await getSiteSettings();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sections du site"
        subtitle="Activez, désactivez et réorganisez les sections affichées sur la page d'accueil. Le header et le footer suivent cette configuration."
      />
      <Card title="Ordre & visibilité">
        <SectionsForm initial={sections} />
      </Card>
    </div>
  );
}
