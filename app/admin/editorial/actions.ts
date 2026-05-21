"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { deleteFromBunny, pathFromUrl } from "@/lib/bunny";

function payload(formData: FormData) {
  const specs: Array<{ label_fr: string; label_en: string; value_fr: string; value_en: string }> = [];
  for (let i = 0; i < 4; i++) {
    const lf = String(formData.get(`spec_${i}_label_fr`) || "").trim();
    const le = String(formData.get(`spec_${i}_label_en`) || "").trim();
    const vf = String(formData.get(`spec_${i}_value_fr`) || "").trim();
    const ve = String(formData.get(`spec_${i}_value_en`) || "").trim();
    if (!lf && !le && !vf && !ve) continue;
    specs.push({ label_fr: lf, label_en: le, value_fr: vf, value_en: ve });
  }
  return {
    edition_label:    String(formData.get("edition_label") || "").trim(),
    title_fr:         String(formData.get("title_fr") || "").trim() || null,
    title_en:         String(formData.get("title_en") || "").trim() || null,
    caption_fr:       String(formData.get("caption_fr") || "").trim() || null,
    caption_en:       String(formData.get("caption_en") || "").trim() || null,
    photo_main_url:   String(formData.get("photo_main_url") || "").trim() || null,
    photo_thumb1_url: String(formData.get("photo_thumb1_url") || "").trim() || null,
    photo_thumb2_url: String(formData.get("photo_thumb2_url") || "").trim() || null,
    specs,
  };
}

export async function createLook(formData: FormData) {
  const data = payload(formData);
  if (!data.edition_label) throw new Error("Numéro d'édition requis");
  const sb = await createClient();
  const { data: max } = await sb.from("editorial_looks").select("order_index").order("order_index", { ascending: false }).limit(1).maybeSingle();
  const next = (max?.order_index ?? -1) + 1;
  await sb.from("editorial_looks").insert({ ...data, order_index: next });
  updateTag("editorial_looks");
  redirect("/admin/editorial");
}

export async function updateLook(id: string, formData: FormData) {
  const data = payload(formData);
  const sb = await createClient();
  await sb.from("editorial_looks").update(data).eq("id", id);
  updateTag("editorial_looks");
  redirect("/admin/editorial");
}

export async function deleteLook(id: string) {
  const sb = await createClient();
  const { data: row } = await sb.from("editorial_looks").select("photo_main_url, photo_thumb1_url, photo_thumb2_url").eq("id", id).maybeSingle();
  if (row) {
    for (const url of [row.photo_main_url, row.photo_thumb1_url, row.photo_thumb2_url]) {
      const p = pathFromUrl(url);
      if (p) await deleteFromBunny(p);
    }
  }
  await sb.from("editorial_looks").delete().eq("id", id);
  updateTag("editorial_looks");
}

export async function reorderLook(id: string, dir: -1 | 1) {
  const sb = await createClient();
  const { data: rows } = await sb.from("editorial_looks").select("id, order_index").order("order_index");
  if (!rows) return;
  const i = rows.findIndex((r) => r.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= rows.length) return;
  await Promise.all([
    sb.from("editorial_looks").update({ order_index: rows[j].order_index }).eq("id", rows[i].id),
    sb.from("editorial_looks").update({ order_index: rows[i].order_index }).eq("id", rows[j].id),
  ]);
  updateTag("editorial_looks");
}
