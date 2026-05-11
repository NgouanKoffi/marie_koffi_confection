import { notFound } from "next/navigation";
import { MapPin, Mail, MessageCircle } from "lucide-react";
import { getDictionary, hasLocale } from "../dictionaries";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.contact.title };
}

export default async function ContactPage({
  params,
}: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const items = [
    {
      n: "I",
      icon: MessageCircle,
      label: dict.contact.whatsapp_label,
      value: dict.contact.whatsapp_value,
      href: "https://wa.me/2250757595849",
      hint: lang === "fr" ? "Réponse rapide" : "Quick reply",
    },
    {
      n: "II",
      icon: Mail,
      label: dict.contact.email_label,
      value: dict.contact.email_value,
      href: "https://wa.me/2250757595849",
      hint: lang === "fr" ? "Devis & projets" : "Quotes & projects",
    },
    {
      n: "III",
      icon: MapPin,
      label: dict.contact.location_label,
      value: dict.contact.location_value,
      href: null,
      hint: lang === "fr" ? "Sur rendez-vous" : "By appointment",
    },
  ];

  return (
    <>
      <PageHeader
        category={dict.brand.tagline}
        title={dict.contact.title}
        lead={dict.contact.lead}
        watermark="✉"
      />

      <section className="mx-auto max-w-[1500px] px-6 sm:px-10 pb-20 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-5 flex flex-col gap-px bg-[var(--line)] self-start">
          {items.map((it) => {
            const inner = (
              <div className="bg-[var(--bg)] p-5 sm:p-7 flex items-start gap-4 sm:gap-6 group hover:bg-[var(--paper)] transition min-w-0">
                <div className="font-display italic text-4xl sm:text-5xl font-light text-[var(--accent)] leading-none w-9 sm:w-12 shrink-0">
                  {it.n}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 eyebrow text-[var(--muted)]">
                    <it.icon size={11} />
                    {it.label}
                  </div>
                  <div className="mt-3 font-display text-lg sm:text-2xl md:text-3xl font-light tracking-tight break-words">
                    {it.value}
                  </div>
                  <div className="mt-2 font-mono text-[10px] tracking-widest text-[var(--muted)]">
                    {it.hint}
                  </div>
                </div>
              </div>
            );
            return it.href ? (
              <a key={it.label} href={it.href} target="_blank" rel="noreferrer" className="block">
                {inner}
              </a>
            ) : (
              <div key={it.label}>{inner}</div>
            );
          })}
        </div>

        <div className="lg:col-span-7">
          <h2 className="font-display font-light text-[2rem] md:text-[3.2rem] leading-[1] tracking-tight mb-10">
            {dict.contact.form_intro}
            <span className="italic text-[var(--accent)]">.</span>
          </h2>

          <ContactForm lang={lang} dict={dict} />
        </div>
      </section>
    </>
  );
}
