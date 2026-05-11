import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { getDictionary, hasLocale } from "../dictionaries";
import PageHeader from "@/components/PageHeader";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return { title: dict.about.title };
}

export default async function AboutPage({
  params,
}: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  const values = [
    { n: "I", title: dict.about.value_1_title, text: dict.about.value_1_text },
    { n: "II", title: dict.about.value_2_title, text: dict.about.value_2_text },
    { n: "III", title: dict.about.value_3_title, text: dict.about.value_3_text },
  ];

  return (
    <>
      <PageHeader
        category={dict.brand.tagline}
        title={dict.about.title}
        watermark="01"
      />

      <section className="mx-auto max-w-[1500px] px-6 sm:px-10 pb-16 md:pb-24 grid md:grid-cols-12 gap-8 md:gap-12 items-center">
        <div className="md:col-span-4">
          <div className="relative aspect-[4/5] w-full max-w-[340px] mx-auto overflow-hidden hover-zoom">
            <Image
              src="/marie.jpeg"
              alt="Marie Koffi"
              fill
              sizes="(min-width: 768px) 28vw, 80vw"
              className="object-cover"
              priority
            />
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white">
              <span className="font-mono text-[9px] tracking-widest bg-black/30 px-2 py-1 rounded-sm backdrop-blur">
                FONDATRICE
              </span>
              <span className="vertical-label text-[9px]">MARIE KOFFI</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-8">
          <p className="text-xl md:text-2xl font-display font-light leading-[1.3] text-[var(--fg)]">
            <span className="font-display text-5xl float-left leading-none mr-3 mt-1 text-[var(--accent)] italic font-medium">
              {dict.about.lead.charAt(0)}
            </span>
            {dict.about.lead.slice(1)}
          </p>

          <div className="divider-line my-6" />

          <div className="space-y-4 text-[14px] leading-relaxed text-[var(--fg)]/85">
            <p>{dict.about.p1}</p>
            <p>{dict.about.p2}</p>
          </div>
        </div>
      </section>

      <section
        className="py-16 md:py-20 grain relative"
        style={{ background: "var(--dark-bg)", color: "var(--dark-fg)" }}
      >
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
          <div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 pb-4 border-b"
            style={{ borderColor: "color-mix(in srgb, var(--dark-fg) 20%, transparent)" }}
          >
            <div className="flex items-center gap-4">
              <span className="h-px w-10" style={{ background: "var(--dark-fg)" }} />
              <span className="eyebrow" style={{ color: "color-mix(in srgb, var(--dark-fg) 70%, transparent)" }}>Valeurs</span>
            </div>
            <h2 className="font-display font-light text-[2rem] md:text-[3.5rem] leading-[0.95] tracking-tight">
              {dict.about.values_title}
              <span className="italic" style={{ color: "var(--dark-accent)" }}>.</span>
            </h2>
          </div>

          <div
            className="grid md:grid-cols-3 gap-px"
            style={{ background: "color-mix(in srgb, var(--dark-fg) 15%, transparent)" }}
          >
            {values.map((v) => (
              <div
                key={v.title}
                className="p-6 md:p-8 flex flex-col gap-4"
                style={{ background: "var(--dark-bg)" }}
              >
                <div className="font-display text-4xl italic font-light" style={{ color: "var(--dark-accent)" }}>
                  {v.n}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-light leading-tight">
                  {v.title}
                </h3>
                <p className="text-[13px] leading-relaxed" style={{ color: "color-mix(in srgb, var(--dark-fg) 70%, transparent)" }}>
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="font-display font-light text-[1.8rem] md:text-[2.8rem] leading-[1] tracking-tight max-w-2xl">
            {lang === "fr"
              ? "Une pièce vous parle ?"
              : "A piece speaks to you?"}
            <span className="italic text-[var(--accent)]">
              {lang === "fr" ? " Discutons." : " Let's talk."}
            </span>
          </h2>
          <Link
            href={`/${lang}/contact`}
            className="group inline-flex items-center gap-3 bg-[var(--fg)] text-[var(--bg)] pl-6 pr-2 py-2 rounded-full text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[var(--accent)] transition self-start md:self-end shrink-0"
          >
            {dict.about.cta}
            <span className="w-9 h-9 rounded-full bg-[var(--bg)] text-[var(--fg)] flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
              <ArrowUpRight size={14} />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
