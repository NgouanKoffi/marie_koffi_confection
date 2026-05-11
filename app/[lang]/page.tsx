import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Editorial from "@/components/Editorial";
import LookbookStrip from "@/components/LookbookStrip";
import AboutTeaser from "@/components/AboutTeaser";
import CtaBand from "@/components/CtaBand";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const marqueeItems =
    lang === "fr"
      ? [
          "Maison de couture",
          "Confection sur mesure",
          "Prêt-à-porter",
          "Abidjan · Côte d'Ivoire",
          "Pièces uniques",
        ]
      : [
          "Couture House",
          "Made-to-measure",
          "Ready-to-wear",
          "Abidjan · Côte d'Ivoire",
          "One-of-a-kind",
        ];

  return (
    <>
      <Hero lang={lang} dict={dict} />
      <Marquee items={marqueeItems} />
      <Editorial lang={lang} dict={dict} />
      <LookbookStrip lang={lang} dict={dict} />
      <AboutTeaser lang={lang} dict={dict} />
      <CtaBand lang={lang} dict={dict} />
    </>
  );
}
