"use server";

import { updateTag } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function saveContact(formData: FormData) {
  const contact = {
    whatsapp: String(formData.get("whatsapp") || "").trim(),
    whatsapp_label: String(formData.get("whatsapp_label") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    address_fr: String(formData.get("address_fr") || "").trim(),
    address_en: String(formData.get("address_en") || "").trim(),
  };

  const socials = {
    instagram: String(formData.get("instagram") || "").trim(),
    facebook:  String(formData.get("facebook") || "").trim(),
    tiktok:    String(formData.get("tiktok") || "").trim(),
    linkedin:  String(formData.get("linkedin") || "").trim(),
  };

  const sb = await createClient();
  const { error } = await sb
    .from("site_settings")
    .update({ contact, socials })
    .eq("id", 1);
  if (error) throw new Error(error.message);
  updateTag("site_settings");
}
