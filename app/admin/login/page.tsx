import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LoginForm from "./LoginForm";

export const metadata = { title: "Admin · Connexion" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();
  if (user) redirect("/admin");
  const { next, error } = await searchParams;
  return <LoginForm next={next ?? "/admin"} error={error} />;
}
