export default function Marquee({ items }: { items: string[] }) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div
      className="marquee py-5 border-y"
      style={{ borderColor: "var(--line)" }}
    >
      <div className="marquee-track">
        {repeated.map((t, i) => (
          <span
            key={i}
            className="font-display text-[1.6rem] md:text-[2.4rem] leading-none italic font-light whitespace-nowrap"
          >
            {t}
            <span className="mx-6 text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
