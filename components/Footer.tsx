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

        <div>
          <div className="eyebrow text-[var(--dark-fg)]/50 mb-8 text-center">
            Contact
          </div>
          <ul
            className="grid grid-cols-2 md:grid-cols-4 gap-px"
            style={{
              background:
                "color-mix(in srgb, var(--dark-fg) 12%, transparent)",
            }}
          >
            {[
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: "07 57 59 58 49",
                href: "https://wa.me/2250757595849",
              },
              {
                icon: Mail,
                label: "Email",
                value: "mkconfection@gmail.com",
                href: "mailto:mkconfection@gmail.com",
              },
              {
                icon: MapPin,
                label: "Atelier",
                value: "Abidjan, Côte d'Ivoire",
              },
              {
                icon: InstagramIcon,
                label: "Instagram",
                value: "@mariekoffi",
                href: "https://instagram.com/mariekoffi",
              },
            ].map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <>
                  <Icon size={18} className="text-[var(--dark-accent)]" />
                  <div className="font-mono text-[10px] tracking-widest text-[var(--dark-fg)]/50 mt-4 mb-2">
                    {label}
                  </div>
                  <div className="text-[12px] sm:text-sm break-all leading-snug w-full">
                    {value}
                  </div>
                </>
              );
              const cls =
                "flex flex-col items-center text-center px-3 sm:px-4 py-6 transition w-full min-w-0 overflow-hidden";
              return (
                <li
                  key={label}
                  className="min-w-0 overflow-hidden"
                  style={{ background: "var(--dark-bg)" }}
                >
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel={href.startsWith("http") ? "noreferrer" : undefined}
                      className={`${cls} hover:text-[var(--dark-accent)]`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </li>
              );
            })}
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
