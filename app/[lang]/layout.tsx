import { notFound } from "next/navigation";
import { getDictionary, hasLocale, locales } from "./dictionaries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/lib/data";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const settings = await getSiteSettings();

  return (
    <ThemeProvider>
      <SmoothScroll />
      <ScrollProgress />
      <Navbar lang={lang} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} dict={dict} contact={settings.contact} socials={settings.socials} brand={settings.brand} />
      <BackToTop />
    </ThemeProvider>
  );
}
