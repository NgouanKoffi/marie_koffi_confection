import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "./_components/Sidebar";

export const metadata = { title: "Admin · Marie Koffi Confection" };

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const sb = await createClient();
  const { data: { user } } = await sb.auth.getUser();

  if (!user) return <>{children}</>;

  const { data: adminRow } = await sb
    .from("admins")
    .select("user_id, email")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!adminRow) {
    await sb.auth.signOut();
    redirect("/admin/login?error=Compte%20non%20autoris%C3%A9");
  }

  return (
    <div className="relative h-[100dvh] bg-[var(--bg)] text-[var(--fg)] flex overflow-hidden">
      <Sidebar email={user.email ?? adminRow.email ?? ""} />
      <main className="relative flex-1 min-w-0 h-[100dvh] overflow-y-auto pt-14 lg:pt-0">
        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-10 sm:py-14 lg:py-20">
          {children}
        </div>
      </main>
    </div>
  );
}
