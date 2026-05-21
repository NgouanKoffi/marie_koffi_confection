"use client";

import { useEffect, useState } from "react";
import { MessageCircle, Mail } from "lucide-react";
import { buildWhatsAppLink } from "@/lib/format";
import type { Locale, Dictionary } from "@/app/[lang]/dictionaries";

type ProductLite = { name: string; price: number; slug: string };

export default function OrderCta({
  product,
  lang,
  dict,
}: {
  product: ProductLite;
  lang: Locale;
  dict: Dictionary;
}) {
  const [origin, setOrigin] = useState<string | undefined>();

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const wa = buildWhatsAppLink({ product, lang, origin });
  const mailSubject = encodeURIComponent(
    lang === "fr" ? `Demande — ${product.name}` : `Inquiry — ${product.name}`
  );
  const mailBody = encodeURIComponent(
    lang === "fr"
      ? `Bonjour,\n\nJe souhaite commander la pièce « ${product.name} ».\nPouvez-vous m'envoyer les prochaines étapes ?`
      : `Hello,\n\nI would like to order the « ${product.name} » piece.\nCould you share the next steps?`
  );
  const mail = `mailto:${dict.contact.email_value}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href={wa}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[12px] uppercase tracking-[0.22em] font-semibold transition flex-1"
        style={{ background: "var(--fg)", color: "var(--bg)" }}
      >
        <MessageCircle size={14} />
        {dict.shop.cta_whatsapp}
      </a>
      <a
        href={mail}
        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-[12px] uppercase tracking-[0.22em] font-semibold border transition flex-1"
        style={{ borderColor: "var(--fg)", color: "var(--fg)" }}
      >
        <Mail size={14} />
        {dict.shop.cta_email}
      </a>
    </div>
  );
}
