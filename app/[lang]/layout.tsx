import type { Metadata } from "next";
import { Geist, Geist_Mono, Bodoni_Moda } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { getDictionary, hasLocale, locales } from "./dictionaries";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";
import SmoothScroll from "@/components/providers/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-bodoni",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://mariekoffi.vercel.app"
  ),
  title: {
    default: "Marie Koffi Confection — Maison de couture",
    template: "%s · Marie Koffi Confection",
  },
  description:
    "Maison de couture ivoirienne. Confection sur mesure et prêt-à-porter. Élégance africaine moderne, signée Marie Koffi.",
  openGraph: {
    title: "Marie Koffi Confection",
    description:
      "Maison de couture ivoirienne. Confection sur mesure & prêt-à-porter.",
    images: ["/marie.jpeg"],
  },
};

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${bodoni.variable} h-full antialiased`}
      style={{
        fontFamily: "var(--font-geist), system-ui, sans-serif",
      }}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">
        <ThemeProvider>
          <SmoothScroll />
          <ScrollProgress />
          <Navbar lang={lang} dict={dict} />
          <main className="flex-1">{children}</main>
          <Footer lang={lang} dict={dict} />
        </ThemeProvider>
      </body>
    </html>
  );
}
