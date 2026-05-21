"use server";

import { createClient } from "@/lib/supabase/server";
import { uploadToBunny } from "@/lib/bunny";

export async function uploadImageAction(
  formData: FormData,
): Promise<{ url: string; path: string; error?: undefined } | { error: string; url?: undefined; path?: undefined }> {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return { error: "Non authentifié" };

  const { data: admin } = await sb.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!admin) return { error: "Non autorisé" };

  const file = formData.get("file");
  const subfolder = String(formData.get("subfolder") || "misc");
  if (!(file instanceof File) || file.size === 0) return { error: "Aucun fichier" };
  if (file.size > 15 * 1024 * 1024) return { error: "Fichier > 15 Mo" };
  if (!file.type.startsWith("image/")) return { error: "Image requise" };

  try {
    const { url, path } = await uploadToBunny({ file, subfolder, mime: file.type });
    return { url, path };
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Échec téléversement" };
  }
}
