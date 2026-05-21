"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { deleteFromBunny, pathFromUrl } from "@/lib/bunny";

function payload(formData: FormData) {
  return {
    name:      String(formData.get("name") || "").trim(),
    role_fr:   String(formData.get("role_fr") || "").trim() || null,
    role_en:   String(formData.get("role_en") || "").trim() || null,
    bio_fr:    String(formData.get("bio_fr") || "").trim() || null,
    bio_en:    String(formData.get("bio_en") || "").trim() || null,
    photo_url: String(formData.get("photo_url") || "").trim() || null,
    instagram: String(formData.get("instagram") || "").trim() || null,
  };
}

export async function createMember(formData: FormData) {
  const data = payload(formData);
  if (!data.name) throw new Error("Nom requis");
  const sb = await createClient();
  const { data: max } = await sb.from("team_members").select("order_index").order("order_index", { ascending: false }).limit(1).maybeSingle();
  const next = (max?.order_index ?? -1) + 1;
  await sb.from("team_members").insert({ ...data, order_index: next });
  updateTag("team_members");
  redirect("/admin/team");
}

export async function updateMember(id: string, formData: FormData) {
  const data = payload(formData);
  if (!data.name) throw new Error("Nom requis");
  const sb = await createClient();
  await sb.from("team_members").update(data).eq("id", id);
  updateTag("team_members");
  redirect("/admin/team");
}

export async function deleteMember(id: string) {
  const sb = await createClient();
  const { data: row } = await sb.from("team_members").select("photo_url").eq("id", id).maybeSingle();
  if (row?.photo_url) {
    const p = pathFromUrl(row.photo_url);
    if (p) await deleteFromBunny(p);
  }
  await sb.from("team_members").delete().eq("id", id);
  updateTag("team_members");
}

export async function reorderMember(id: string, dir: -1 | 1) {
  const sb = await createClient();
  const { data: rows } = await sb.from("team_members").select("id, order_index").order("order_index");
  if (!rows) return;
  const i = rows.findIndex((r) => r.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= rows.length) return;
  await Promise.all([
    sb.from("team_members").update({ order_index: rows[j].order_index }).eq("id", rows[i].id),
    sb.from("team_members").update({ order_index: rows[i].order_index }).eq("id", rows[j].id),
  ]);
  updateTag("team_members");
}
