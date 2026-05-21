import type { Locale } from "@/app/[lang]/dictionaries";

const WHATSAPP_NUMBER = "2250757595849";

export function formatPrice(value: number, lang: Locale): string {
  const formatted = new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-US", {
    maximumFractionDigits: 0,
  }).format(value);
  return `${formatted} FCFA`;
}

export function buildWhatsAppLink(opts: {
  product?: { name: string; price: number; slug: string };
  lang: Locale;
  origin?: string;
}): string {
  const { product, lang, origin } = opts;
  let message: string;
  if (product) {
    const price = formatPrice(product.price, lang);
    const link = origin ? `${origin}/${lang}/boutique/${product.slug}` : "";
    message =
      lang === "fr"
        ? `Bonjour Marie Koffi Confection,\n\nJe suis intéressée par la pièce « ${product.name} » (${price}).\nPourriez-vous m'indiquer les prochaines étapes pour la commander ?\n${link ? "\n" + link : ""}`
        : `Hello Marie Koffi Confection,\n\nI'm interested in the « ${product.name} » piece (${price}).\nCould you walk me through the next steps to order it?\n${link ? "\n" + link : ""}`;
  } else {
    message =
      lang === "fr"
        ? "Bonjour Marie Koffi Confection, j'aimerais discuter d'une création sur mesure."
        : "Hello Marie Koffi Confection, I would like to discuss a made-to-measure piece.";
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export { WHATSAPP_NUMBER };
