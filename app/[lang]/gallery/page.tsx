import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import GalleryMasonry from "@/components/GalleryMasonry";
import PageHeader from "@/components/PageHeader";
import { GALLERY_COUNT } from "@/lib/images";

export async function generateMetadata({ params }: PageProps<"/[lang]/gallery">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.gallery.title };
}

export default async function GalleryPage({
  params,
}: PageProps<"/[lang]/gallery">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        category={`${lang === "fr" ? "Archive complète" : "Full archive"} · ${GALLERY_COUNT} ${lang === "fr" ? "pièces" : "pieces"}`}
        title={dict.gallery.title}
        lead={dict.gallery.lead}
        watermark="✦"
      />

      <section className="mx-auto max-w-[1500px] px-6 sm:px-10 pb-20">
        <GalleryMasonry />
      </section>
    </>
  );
}
