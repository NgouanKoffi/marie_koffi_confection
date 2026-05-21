import type { Metadata } from "next";
import { Geist, Geist_Mono, Bodoni_Moda } from "next/font/google";
import "./globals.css";

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
    "Maison de couture ivoirienne. Confection sur mesure et prêt-à-porter.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${bodoni.variable} h-full antialiased`}
      style={{ fontFamily: "var(--font-geist), system-ui, sans-serif" }}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg">{children}</body>
    </html>
  );
}
