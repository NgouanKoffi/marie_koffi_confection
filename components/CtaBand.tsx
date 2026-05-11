import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Locale, Dictionary } from "@/app/[lang]/dictionaries";

export default function CtaBand({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
        <header
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12 pb-4 border-b"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-widest text-muted">
              CHAPITRE / 04
            </span>
            <span className="h-px w-10 bg-fg" />
            <span className="eyebrow">{dict.home.cta_eyebrow}</span>
          </div>
          <h2 className="font-display font-light text-[2rem] md:text-[3.5rem] leading-[0.95] tracking-tight">
            {dict.home.cta_title.split(" ").map((w, i, arr) =>
              i === arr.length - 1 ? (
                <span key={i} className="italic text-accent">
                  {w}
                </span>
              ) : (
                <span key={i}>{w} </span>
              )
            )}
          </h2>
        </header>

        <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start">
          <p className="md:col-span-6 text-base leading-relaxed text-[var(--fg)]/85 max-w-xl">
            {dict.home.cta_lead}
          </p>

          <div className="md:col-span-6 md:flex md:justify-end flex flex-col md:flex-row gap-4 md:items-center">
            <Link
              href={`/${lang}/contact`}
              className="group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-[11px] uppercase tracking-[0.22em] font-semibold transition"
              style={{ background: "var(--fg)", color: "var(--bg)" }}
            >
              {dict.home.cta_button}
              <span
                className="w-9 h-9 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform duration-500"
                style={{ background: "var(--bg)", color: "var(--fg)" }}
              >
                <ArrowUpRight size={14} />
              </span>
            </Link>
            <a
              href="https://wa.me/2250757595849"
              target="_blank"
              rel="noreferrer"
              className="ink-link text-[11px] uppercase tracking-[0.2em] font-medium"
            >
              WhatsApp 07 57 59 58 49
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
