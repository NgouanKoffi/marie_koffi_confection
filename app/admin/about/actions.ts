"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const ABOUT_PAGE_KEYS = [
  "eyebrow_fr","eyebrow_en","title_fr","title_en","lead_fr","lead_en",
  "p1_fr","p1_en","p2_fr","p2_en","founder_photo_url","cta_fr","cta_en",
];

const ATELIER_KEYS = [
  "atelier_eyebrow_fr","atelier_eyebrow_en","atelier_title_fr","atelier_title_en",
  "atelier_text_fr","atelier_text_en",
  "atelier_photo_left_url","atelier_photo_right_url",
  "atelier_cta_fr","atelier_cta_en",
];

async function mergeAboutData(updates: Record<string, string | undefined>) {
  const sb = await createClient();
  const { data: row } = await sb.from("about_meta").select("data").eq("id", 1).maybeSingle();
  const next = { ...(row?.data ?? {}), ...updates };
  const { error } = await sb.from("about_meta").update({ data: next }).eq("id", 1);
  if (error) throw new Error(error.message);
}

export async function saveAboutPage(formData: FormData) {
  const updates: Record<string, string | undefined> = {};
  for (const k of ABOUT_PAGE_KEYS) {
    const v = String(formData.get(k) || "").trim();
    updates[k] = v || undefined;
  }
  await mergeAboutData(updates);
  updateTag("about_meta");
}

export async function saveAtelier(formData: FormData) {
  const updates: Record<string, string | undefined> = {};
  for (const k of ATELIER_KEYS) {
    const v = String(formData.get(k) || "").trim();
    updates[k] = v || undefined;
  }
  await mergeAboutData(updates);
  updateTag("about_meta");
}

function valuePayload(formData: FormData) {
  return {
    numeral:  String(formData.get("numeral") || "").trim() || "I",
    title_fr: String(formData.get("title_fr") || "").trim() || null,
    title_en: String(formData.get("title_en") || "").trim() || null,
    text_fr:  String(formData.get("text_fr") || "").trim() || null,
    text_en:  String(formData.get("text_en") || "").trim() || null,
  };
}

export async function createValue(formData: FormData) {
  const data = valuePayload(formData);
  const sb = await createClient();
  const { data: max } = await sb.from("about_values").select("order_index").order("order_index", { ascending: false }).limit(1).maybeSingle();
  const next = (max?.order_index ?? -1) + 1;
  await sb.from("about_values").insert({ ...data, order_index: next });
  updateTag("about_values");
  redirect("/admin/about");
}

export async function updateValue(id: string, formData: FormData) {
  const data = valuePayload(formData);
  const sb = await createClient();
  await sb.from("about_values").update(data).eq("id", id);
  updateTag("about_values");
  redirect("/admin/about");
}

export async function deleteValue(id: string) {
  const sb = await createClient();
  await sb.from("about_values").delete().eq("id", id);
  updateTag("about_values");
}

export async function reorderValue(id: string, dir: -1 | 1) {
  const sb = await createClient();
  const { data: rows } = await sb.from("about_values").select("id, order_index").order("order_index");
  if (!rows) return;
  const i = rows.findIndex((r) => r.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= rows.length) return;
  await Promise.all([
    sb.from("about_values").update({ order_index: rows[j].order_index }).eq("id", rows[i].id),
    sb.from("about_values").update({ order_index: rows[i].order_index }).eq("id", rows[j].id),
  ]);
  updateTag("about_values");
}
