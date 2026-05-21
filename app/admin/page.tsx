import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { createPublicClient } from "@/lib/supabase/public";
import { PageHeader } from "./_components/ui";

export const dynamic = "force-dynamic";

async function counts() {
  const sb = createPublicClient();
  const [team, editorial, products] = await Promise.all([
    sb.from("team_members").select("id", { count: "exact", head: true }),
    sb.from("editorial_looks").select("id", { count: "exact", head: true }),
    sb.from("products").select("id", { count: "exact", head: true }),
  ]);
  return {
    team: team.count ?? 0,
    editorial: editorial.count ?? 0,
    products: products.count ?? 0,
  };
}

const SECTIONS = [
  { href: "/admin/team",      label: "Notre équipe",      n: "01", lead: "Membres présentés sur la page d'accueil.",                countKey: "team" as const },
  { href: "/admin/editorial", label: "Sélection",         n: "02", lead: "Éditions éditoriales 01/02/03 sur l'accueil.",            countKey: "editorial" as const },
  { href: "/admin/atelier",   label: "Atelier (accueil)", n: "03", lead: "Bloc Atelier de la page d'accueil (photos + texte).",    countKey: null },
  { href: "/admin/boutique",  label: "Boutique",          n: "04", lead: "Pièces, catégories, prix FCFA, galeries photos.",        countKey: "products" as const },
  { href: "/admin/about",     label: "À propos",          n: "05", lead: "Page À propos publique (en-tête, paragraphes, valeurs).", countKey: null },
  { href: "/admin/contact",   label: "Contact & socials", n: "06", lead: "WhatsApp, email, adresse, réseaux.",                      countKey: null },
  { href: "/admin/sections",  label: "Sections du site",  n: "07", lead: "Ordre & visibilité des sections de l'accueil.",           countKey: null },
];

export default async function AdminDashboard() {
  const c = await counts();

  return (
    <div className="space-y-16">
      <PageHeader
        number="CHAPITRE / 00"
        title="Tableau de bord"
        subtitle="Pilotez le contenu du site Marie Koffi Confection. Chaque section ci-dessous reflète une partie du site public."
      />

      <section className="grid grid-cols-3 border-y border-[var(--line)] divide-x divide-[var(--line)]">
        {[
          { n: "01", label: "Équipe",          value: c.team },
          { n: "02", label: "Sélection",       value: c.editorial },
          { n: "03", label: "Pièces boutique", value: c.products },
        ].map((s) => (
          <div key={s.n} className="p-6 md:p-8">
            <div className="font-mono text-[10px] tracking-[0.28em] text-[var(--muted)] mb-3">{s.n}</div>
            <div className="font-display text-3xl md:text-4xl font-light tracking-tight">{s.value}</div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.22em] text-[var(--muted)]">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="space-y-px bg-[var(--line)]">
        {SECTIONS.map((s) => {
          const count = s.countKey ? c[s.countKey] : null;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-8 px-6 md:px-10 py-7 bg-[var(--bg)] hover:bg-[var(--paper)] transition-colors"
            >
              <span className="font-mono text-[10px] tracking-[0.3em] tabular-nums text-[var(--accent)] shrink-0">
                {s.n}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-2xl md:text-3xl font-light tracking-tight">
                  {s.label}<span className="italic text-[var(--accent)]">.</span>
                </h3>
                <p className="mt-1 text-[13px] text-[var(--muted)] leading-relaxed">{s.lead}</p>
              </div>
              {count !== null && (
                <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--muted)] shrink-0">
                  {count} {count > 1 ? "éléments" : "élément"}
                </span>
              )}
              <ArrowUpRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--accent)] group-hover:rotate-12 transition-all shrink-0" />
            </Link>
          );
        })}
      </section>
    </div>
  );
}
