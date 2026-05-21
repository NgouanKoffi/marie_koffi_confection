import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "./dictionaries";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Editorial from "@/components/Editorial";
import LookbookStrip from "@/components/LookbookStrip";
import AboutTeaser from "@/components/AboutTeaser";
import Team from "@/components/Team";
import { getSiteSettings, getMarquee, getTeam, getProducts, getCategories, getEditorial, type SectionKey } from "@/lib/data";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const [settings, marqueeDb, team, products, categories, editorial] = await Promise.all([
    getSiteSettings(),
    getMarquee(),
    getTeam(),
    getProducts(),
    getCategories(),
    getEditorial(),
  ]);
  const featured = products.filter((p) => p.featured);

  const fallbackMarquee =
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

  const marqueeItems = marqueeDb.length
    ? marqueeDb.map((m) => (lang === "fr" ? m.label_fr : m.label_en) || m.label_fr)
    : fallbackMarquee;

  const renderers: Partial<Record<SectionKey, React.ReactNode>> = {
    marquee:      <Marquee items={marqueeItems} />,
    team:         team.length > 0 ? <Team lang={lang} members={team} /> : null,
    editorial:    editorial.length > 0 ? <Editorial lang={lang} dict={dict} looks={editorial} /> : null,
    lookbook:     featured.length > 0 ? <LookbookStrip lang={lang} dict={dict} products={featured} categories={categories} /> : null,
    about_teaser: <AboutTeaser lang={lang} dict={dict} />,
  };

  return (
    <>
      <Hero lang={lang} dict={dict} />
      {settings.sections
        .filter((s) => s.enabled)
        .map((s) => {
          const node = renderers[s.key];
          if (!node) return null;
          return <div key={s.key}>{node}</div>;
        })}
    </>
  );
}
