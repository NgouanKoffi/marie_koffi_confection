"use server";

import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { DEFAULT_SECTIONS, SECTION_META, type Section, type SectionKey } from "@/lib/sections";

export async function saveSections(payload: string) {
  const validKeys = Object.keys(SECTION_META) as SectionKey[];
  let parsed: Section[];
  try {
    const arr = JSON.parse(payload) as unknown;
    if (!Array.isArray(arr)) throw new Error("not array");
    parsed = [];
    const seen = new Set<string>();
    for (const it of arr) {
      const key = (it as { key?: string }).key;
      const enabled = (it as { enabled?: boolean }).enabled !== false;
      if (!key || !validKeys.includes(key as SectionKey) || seen.has(key)) continue;
      seen.add(key);
      parsed.push({ key: key as SectionKey, enabled });
    }
    for (const s of DEFAULT_SECTIONS) {
      if (!seen.has(s.key)) parsed.push(s);
    }
  } catch {
    return { ok: false, error: "Format invalide" };
  }

  const sb = await createClient();
  const { error } = await sb
    .from("site_settings")
    .update({ sections: parsed })
    .eq("id", 1);
  if (error) return { ok: false, error: error.message };

  updateTag("site_settings");
  return { ok: true };
}
