"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(formData: FormData) {
  const email    = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next     = String(formData.get("next") || "/admin");

  const sb = await createClient();
  const { error } = await sb.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/admin/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`);
  }

  const { data: { user } } = await sb.auth.getUser();
  if (user) {
    const { data: row } = await sb.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
    if (!row) {
      await sb.auth.signOut();
      redirect(`/admin/login?error=${encodeURIComponent("Compte non autorisé")}`);
    }
  }

  redirect(next);
}

export async function logout() {
  const sb = await createClient();
  await sb.auth.signOut();
  redirect("/admin/login");
}
