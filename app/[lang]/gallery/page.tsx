import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import GalleryMasonry from "@/components/GalleryMasonry";
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
      <section className="relative pt-28 md:pt-32 pb-8 md:pb-12">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-5 border-b" style={{ borderColor: "var(--line)" }}>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[10px] tracking-widest text-[var(--muted)]">
                LOOKBOOK · {GALLERY_COUNT} {lang === "fr" ? "PIÈCES" : "PIECES"}
              </span>
              <span className="h-px w-10 bg-fg" />
              <span className="eyebrow">
                {lang === "fr" ? "Archive complète" : "Full archive"}
              </span>
            </div>
            <h1 className="font-display font-light text-[2.6rem] md:text-[4.5rem] leading-[0.95] tracking-tight">
              {dict.gallery.title}
              <span className="italic text-[var(--accent)]">.</span>
            </h1>
          </div>
          <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-[var(--muted)]">
            {dict.gallery.lead}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1500px] px-6 sm:px-10 pb-20">
        <GalleryMasonry />
      </section>
    </>
  );
}
