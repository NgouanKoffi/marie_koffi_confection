type Props = {
  eyebrow?: string;
  category?: string;
  title: string;
  lead?: string;
  watermark?: string;
};

export default function PageHeader({
  eyebrow,
  category,
  title,
  lead,
  watermark,
}: Props) {
  return (
    <section className="relative pt-28 md:pt-36 pb-12 md:pb-20 overflow-hidden">
      {watermark && (
        <div
          aria-hidden
          className="pointer-events-none select-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-display font-light leading-none tracking-tighter opacity-[0.04] hidden md:block md:text-[22rem] lg:text-[28rem]"
          style={{ color: "var(--fg)" }}
        >
          {watermark}
        </div>
      )}

      <div className="relative mx-auto max-w-[1500px] px-6 sm:px-10 flex flex-col items-center text-center">
        {eyebrow && (
          <div
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 mb-8"
            style={{ borderColor: "var(--line)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent)" }}
            />
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[var(--muted)]">
              {eyebrow}
            </span>
          </div>
        )}

        <h1 className="font-display font-light text-[3rem] sm:text-[4.5rem] md:text-[6rem] leading-[0.95] tracking-tight">
          {title}
          <span className="italic text-[var(--accent)]">.</span>
        </h1>

        {category && (
          <div className="mt-8 flex items-center gap-4">
            <span
              className="h-px w-10"
              style={{ background: "var(--line)" }}
            />
            <span className="eyebrow text-[var(--muted)]">{category}</span>
            <span
              className="h-px w-10"
              style={{ background: "var(--line)" }}
            />
          </div>
        )}

        {lead && (
          <p className="mt-6 max-w-2xl text-[15px] md:text-base leading-relaxed text-[var(--muted)]">
            {lead}
          </p>
        )}
      </div>
    </section>
  );
}
