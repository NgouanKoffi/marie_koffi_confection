export type SectionKey =
  | "marquee"
  | "team"
  | "editorial"
  | "lookbook"
  | "about_teaser";

export type Section = { key: SectionKey; enabled: boolean };

export const SECTION_META: Record<
  SectionKey,
  { label: string; anchor: string }
> = {
  marquee:      { label: "Marquee",        anchor: "marquee" },
  team:         { label: "Notre équipe",   anchor: "equipe" },
  editorial:    { label: "Éditorial",      anchor: "editorial" },
  lookbook:     { label: "Pièces phares",  anchor: "lookbook" },
  about_teaser: { label: "Atelier",        anchor: "atelier" },
};

export const DEFAULT_SECTIONS: Section[] = [
  { key: "marquee",      enabled: true },
  { key: "team",         enabled: true },
  { key: "editorial",    enabled: true },
  { key: "lookbook",     enabled: true },
  { key: "about_teaser", enabled: true },
];

export function normalizeSections(raw: unknown): Section[] {
  const valid = new Set<SectionKey>(Object.keys(SECTION_META) as SectionKey[]);
  const out: Section[] = [];
  const seen = new Set<string>();
  if (Array.isArray(raw)) {
    for (const it of raw) {
      const key = (it as { key?: string })?.key;
      const enabled = (it as { enabled?: boolean })?.enabled !== false;
      if (!key || !valid.has(key as SectionKey) || seen.has(key)) continue;
      seen.add(key);
      out.push({ key: key as SectionKey, enabled });
    }
  }
  for (const d of DEFAULT_SECTIONS) {
    if (!seen.has(d.key)) out.push(d);
  }
  return out;
}
