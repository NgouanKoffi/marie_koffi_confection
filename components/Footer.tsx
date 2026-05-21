import { Mail, MessageCircle, MapPin, ArrowUpRight } from "lucide-react";
import type { Locale, Dictionary } from "@/app/[lang]/dictionaries";
import type { ContactData, SocialsData, BrandData } from "@/lib/data";

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

function whatsappHref(num?: string) {
  if (!num) return "https://wa.me/2250757595849";
  return `https://wa.me/${num.replace(/\D/g, "")}`;
}

function igHref(handle?: string) {
  if (!handle) return "https://instagram.com/mariekoffi";
  if (handle.startsWith("http")) return handle;
  return `https://instagram.com/${handle.replace(/^@/, "")}`;
}

export default function Footer({
  lang,
  dict,
  contact,
  socials,
  brand,
}: {
  lang: Locale;
  dict: Dictionary;
  contact?: ContactData;
  socials?: SocialsData;
  brand?: BrandData;
}) {
  const wa  = whatsappHref(contact?.whatsapp);
  const waLabel = contact?.whatsapp_label || "07 57 59 58 49";
  const email = contact?.email || "mkconfection@gmail.com";
  const address = (lang === "fr" ? contact?.address_fr : contact?.address_en) || "Abidjan, Côte d'Ivoire";
  const ig = igHref(socials?.instagram);
  const igLabel = socials?.instagram ? (socials.instagram.startsWith("@") ? socials.instagram : `@${socials.instagram.replace(/^.*\//, "").replace(/\/$/, "")}`) : "@mariekoffi";

  const brandName = brand?.name || "MARIE KOFFI CONFECTION";
  const brandTag  = (lang === "fr" ? brand?.tagline_fr : brand?.tagline_en) || (lang === "fr" ? "MAISON DE COUTURE" : "COUTURE HOUSE");

  return (
    <footer className="relative overflow-hidden grain" style={{ background: "var(--dark-bg)", color: "var(--dark-fg)" }}>
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10 pt-14 md:pt-20 pb-12">
        <div className="grid md:grid-cols-12 gap-6 items-center mb-10 md:mb-16 text-center md:text-left">
          <div className="md:col-span-8">
            <div className="font-mono text-[10px] tracking-widest text-[var(--dark-fg)]/50 mb-3">
              {brandName.toUpperCase()} — {brandTag.toUpperCase()}
            </div>
            <div className="font-display font-light text-[1.5rem] md:text-[2.25rem] leading-[1.1] tracking-tight">
              {lang === "fr"
                ? "Confectionnée à la main,"
                : "Made by hand,"}{" "}
              <span className="italic text-[var(--dark-accent)]">
                {lang === "fr" ? "portée avec fierté." : "worn with pride."}
              </span>
            </div>
          </div>
          <div className="md:col-span-4 md:text-right">
            <a
              href={wa}
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
              { icon: MessageCircle, label: "WhatsApp", value: waLabel, href: wa },
              { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
              { icon: MapPin, label: lang === "fr" ? "Atelier" : "Atelier", value: address },
              { icon: InstagramIcon, label: "Instagram", value: igLabel, href: ig },
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
          © {new Date().getFullYear()} {brandName.toUpperCase()} · {dict.footer.rights.toUpperCase()}
        </div>
      </div>
    </footer>
  );
}
