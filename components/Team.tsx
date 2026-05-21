"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/data";
import type { Locale } from "@/app/[lang]/dictionaries";
import { FadeUp, SplitText } from "./Reveal";

export default function Team({
  lang,
  members,
}: {
  lang: Locale;
  members: TeamMember[];
}) {
  if (!members.length) return null;

  return (
    <section id="equipe" className="relative py-16 md:py-24">
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
        <header
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14 pb-5 border-b"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] tracking-widest text-muted">
              {lang === "fr" ? "L'ÉQUIPE" : "THE TEAM"}
            </span>
            <span className="h-px w-10 bg-fg" />
          </div>
          <h2 className="font-display font-light text-[2rem] md:text-[3.5rem] leading-[0.95] tracking-tight">
            <SplitText text={lang === "fr" ? "Notre équipe" : "Our team"} />
            <span className="italic text-accent">.</span>
          </h2>
          <span />
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {members.map((m, i) => (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.07 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden hover-zoom bg-[var(--line-soft)]">
                {m.photo_url ? (
                  <Image
                    src={m.photo_url}
                    alt={m.name}
                    fill
                    sizes="(min-width: 1280px) 22vw, (min-width: 768px) 33vw, 100vw"
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 grid place-items-center text-muted text-xs">—</div>
                )}
              </div>
              <FadeUp>
                <div className="mt-4">
                  <p className="font-display text-xl font-light">{m.name}</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted mt-1">
                    {(lang === "fr" ? m.role_fr : m.role_en) ?? ""}
                  </p>
                  {(lang === "fr" ? m.bio_fr : m.bio_en) && (
                    <p className="mt-2 text-[13px] leading-relaxed text-muted">
                      {lang === "fr" ? m.bio_fr : m.bio_en}
                    </p>
                  )}
                </div>
              </FadeUp>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
