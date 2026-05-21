"use server";

import { redirect } from "next/navigation";
import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { deleteFromBunny, pathFromUrl } from "@/lib/bunny";

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseLines(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function productPayload(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  let slug = String(formData.get("slug") || "").trim();
  if (!slug) slug = slugify(name);
  return {
    name,
    slug,
    category_slug: String(formData.get("category_slug") || "").trim() || null,
    price_xof:     Number(formData.get("price_xof") || 0) | 0,
    fabric_fr:     String(formData.get("fabric_fr") || "").trim() || null,
    fabric_en:     String(formData.get("fabric_en") || "").trim() || null,
    description_fr: String(formData.get("description_fr") || "").trim() || null,
    description_en: String(formData.get("description_en") || "").trim() || null,
    details_fr:    parseLines(String(formData.get("details_fr") || "")),
    details_en:    parseLines(String(formData.get("details_en") || "")),
    cover_url:     String(formData.get("cover_url") || "").trim() || null,
    featured:      formData.get("featured") === "on",
  };
}

export async function createProduct(formData: FormData) {
  const data = productPayload(formData);
  if (!data.name) throw new Error("Nom requis");
  const sb = await createClient();
  const { data: max } = await sb.from("products").select("order_index").order("order_index", { ascending: false }).limit(1).maybeSingle();
  const next = (max?.order_index ?? -1) + 1;
  const { data: row, error } = await sb.from("products").insert({ ...data, order_index: next }).select("id").single();
  if (error) throw new Error(error.message);

  const photos = JSON.parse(String(formData.get("photos") || "[]")) as string[];
  if (row?.id && photos.length) {
    await sb.from("product_photos").insert(photos.map((url, i) => ({ product_id: row.id, url, order_index: i })));
  }

  updateTag("products");
  redirect("/admin/boutique");
}

export async function updateProduct(id: string, formData: FormData) {
  const data = productPayload(formData);
  const sb = await createClient();
  await sb.from("products").update(data).eq("id", id);

  const photos = JSON.parse(String(formData.get("photos") || "[]")) as string[];
  await sb.from("product_photos").delete().eq("product_id", id);
  if (photos.length) {
    await sb.from("product_photos").insert(photos.map((url, i) => ({ product_id: id, url, order_index: i })));
  }

  updateTag("products");
  redirect("/admin/boutique");
}

export async function deleteProduct(id: string) {
  const sb = await createClient();
  const { data: prod } = await sb.from("products").select("cover_url").eq("id", id).maybeSingle();
  const { data: photos } = await sb.from("product_photos").select("url").eq("product_id", id);
  const urls = [prod?.cover_url, ...((photos ?? []).map((p) => p.url))];
  for (const u of urls) {
    const p = pathFromUrl(u);
    if (p) await deleteFromBunny(p);
  }
  await sb.from("products").delete().eq("id", id);
  updateTag("products");
}

export async function toggleFeatured(id: string, featured: boolean) {
  const sb = await createClient();
  await sb.from("products").update({ featured }).eq("id", id);
  updateTag("products");
}

export async function reorderProduct(id: string, dir: -1 | 1) {
  const sb = await createClient();
  const { data: rows } = await sb.from("products").select("id, order_index").order("order_index");
  if (!rows) return;
  const i = rows.findIndex((r) => r.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= rows.length) return;
  await Promise.all([
    sb.from("products").update({ order_index: rows[j].order_index }).eq("id", rows[i].id),
    sb.from("products").update({ order_index: rows[i].order_index }).eq("id", rows[j].id),
  ]);
  updateTag("products");
}

// ----- categories -----

export async function createCategory(formData: FormData) {
  const label_fr = String(formData.get("label_fr") || "").trim();
  const label_en = String(formData.get("label_en") || "").trim();
  if (!label_fr) return;
  const slug = String(formData.get("slug") || "").trim() || slugify(label_fr);
  const sb = await createClient();
  const { data: max } = await sb.from("product_categories").select("order_index").order("order_index", { ascending: false }).limit(1).maybeSingle();
  const next = (max?.order_index ?? -1) + 1;
  await sb.from("product_categories").insert({ slug, label_fr, label_en, order_index: next });
  updateTag("product_categories");
}

export async function updateCategory(id: string, formData: FormData) {
  const sb = await createClient();
  await sb.from("product_categories").update({
    label_fr: String(formData.get("label_fr") || "").trim(),
    label_en: String(formData.get("label_en") || "").trim(),
  }).eq("id", id);
  updateTag("product_categories");
}

export async function deleteCategory(id: string) {
  const sb = await createClient();
  await sb.from("product_categories").delete().eq("id", id);
  updateTag("product_categories");
}
