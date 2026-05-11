import { Mail, MessageCircle, MapPin, ArrowUpRight } from "lucide-react";
import type { Locale, Dictionary } from "@/app/[lang]/dictionaries";

function InstagramIcon({ size = 14, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  return (
    <footer className="relative overflow-hidden grain" style={{ background: "var(--dark-bg)", color: "var(--dark-fg)" }}>
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 pt-20 md:pt-32 pb-12">
        <div className="grid md:grid-cols-12 gap-8 items-end mb-12 md:mb-24 text-center md:text-left">
          <div className="md:col-span-8">
            <div className="font-mono text-[10px] tracking-widest text-[var(--dark-fg)]/50 mb-6">
              MARIE KOFFI CONFECTION — MAISON DE COUTURE
            </div>
            <div className="font-display font-light text-[2.8rem] md:text-[5.5rem] leading-[0.95] tracking-tight">
              {lang === "fr"
                ? "Confectionnée à la main,"
                : "Made by hand,"}
              <br />
              <span className="italic text-[var(--dark-accent)]">
                {lang === "fr" ? "portée avec fierté." : "worn with pride."}
              </span>
            </div>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a
              href="https://wa.me/2250757595849"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 bg-[var(--dark-fg)] text-[var(--dark-bg)] pl-6 pr-2 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[var(--dark-accent)] transition"
            >
              {lang === "fr" ? "Prendre rendez-vous" : "Book a fitting"}
              <span className="w-9 h-9 rounded-full bg-[var(--dark-bg)] text-[var(--dark-fg)] flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
                <ArrowUpRight size={14} />
              </span>
            </a>
          </div>
        </div>

        <div className="divider-line opacity-30 mb-12" />

        <div className="text-center">
          <div className="eyebrow text-[var(--dark-fg)]/50 mb-6">Contact</div>
          <ul className="flex flex-col md:flex-row md:flex-wrap justify-center items-center gap-x-10 gap-y-5 text-sm">
            <li className="flex items-start gap-3">
              <MessageCircle size={14} className="mt-1 text-[var(--dark-accent)]" />
              <a
                href="https://wa.me/2250757595849"
                className="hover:text-[var(--dark-accent)] transition text-left"
              >
                <div className="font-mono text-[10px] tracking-widest text-[var(--dark-fg)]/50 mb-1">
                  WhatsApp
                </div>
                07 57 59 58 49
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail size={14} className="mt-1 text-[var(--dark-accent)]" />
              <a
                href="https://wa.me/2250757595849"
                className="hover:text-[var(--dark-accent)] transition text-left"
              >
                <div className="font-mono text-[10px] tracking-widest text-[var(--dark-fg)]/50 mb-1">
                  Email
                </div>
                mkconfection@gmail.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={14} className="mt-1 text-[var(--dark-accent)]" />
              <div className="text-left">
                <div className="font-mono text-[10px] tracking-widest text-[var(--dark-fg)]/50 mb-1">
                  Atelier
                </div>
                Abidjan, Côte d&apos;Ivoire
              </div>
            </li>
            <li className="flex items-start gap-3">
              <InstagramIcon size={14} className="mt-1 text-[var(--dark-accent)]" />
              <div className="text-left">
                <div className="font-mono text-[10px] tracking-widest text-[var(--dark-fg)]/50 mb-1">
                  Instagram
                </div>
                @mariekoffi
              </div>
            </li>
          </ul>
        </div>

        <div className="divider-line opacity-30 mt-10 md:mt-16 mb-6" />

        <div className="text-center text-[10px] font-mono tracking-widest text-[var(--dark-fg)]/40">
          © {new Date().getFullYear()} MARIE KOFFI CONFECTION · {dict.footer.rights.toUpperCase()}
        </div>
      </div>
    </footer>
  );
}
