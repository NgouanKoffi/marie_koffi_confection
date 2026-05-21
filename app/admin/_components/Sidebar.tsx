"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, LogOut, Menu, X } from "lucide-react";
import { logout } from "../login/actions";

const ITEMS = [
  { href: "/admin",           label: "Tableau de bord",   number: "00" },
  { href: "/admin/team",      label: "Notre équipe",      number: "01" },
  { href: "/admin/editorial", label: "Sélection",         number: "02" },
  { href: "/admin/atelier",   label: "Atelier (accueil)", number: "03" },
  { href: "/admin/boutique",  label: "Boutique",          number: "04" },
  { href: "/admin/about",     label: "À propos",          number: "05" },
  { href: "/admin/contact",   label: "Contact & socials", number: "06" },
  { href: "/admin/sections",  label: "Sections du site",  number: "07" },
];

export default function Sidebar({ email }: { email: string }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const initial = email.charAt(0).toUpperCase() || "M";

  return (
    <>
      {/* MOBILE TOPBAR */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between px-5 py-3 bg-[var(--bg)] border-b border-[var(--line)]">
        <p className="font-display text-base tracking-[0.14em] font-light">
          MARIE <span className="italic text-[var(--accent)]">KOFFI</span>
        </p>
        <button
          onClick={() => setOpen(true)}
          className="grid place-items-center w-9 h-9 text-[var(--fg)]"
          aria-label="Menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {open && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-[var(--fg)]/40 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed lg:relative top-0 left-0 z-50 lg:z-10 w-[300px] lg:w-[280px] shrink-0 h-[100dvh] overflow-y-auto flex flex-col bg-[var(--bg-deep)] border-r border-[var(--line)] transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* BRAND */}
        <div className="relative px-8 pt-8 pb-7 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-mono text-[9px] tracking-[0.32em] text-[var(--muted)] mb-3">
              EST · 2024 · ABIDJAN
            </p>
            <p className="font-display text-2xl tracking-tight font-light leading-none">
              MARIE
            </p>
            <p className="font-display italic text-2xl tracking-tight font-light leading-none text-[var(--accent)] mt-1">
              Koffi
            </p>
            <p className="font-mono text-[9px] tracking-[0.32em] text-[var(--muted)] mt-3">
              ADMIN · PANEL
            </p>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden grid place-items-center w-8 h-8 text-[var(--muted)] hover:text-[var(--fg)]"
            aria-label="Fermer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <span className="mx-8 h-px bg-[var(--line)]" />

        {/* NAV */}
        <nav className="py-7 px-3">
          {ITEMS.map(({ href, label, number }) => {
            const active = href === "/admin"
              ? path === "/admin"
              : path.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`group flex items-baseline gap-4 px-5 py-3 transition-colors ${
                  active ? "text-[var(--fg)]" : "text-[var(--muted)] hover:text-[var(--fg)]"
                }`}
              >
                <span className={`font-mono text-[9px] tracking-[0.3em] tabular-nums ${active ? "text-[var(--accent)]" : ""}`}>
                  {number}
                </span>
                <span className="flex-1 font-display text-[15px] leading-tight">
                  {label}
                  {active && <span className="italic text-[var(--accent)]">.</span>}
                </span>
                {active && (
                  <span className="font-display italic text-[var(--accent)] text-sm">●</span>
                )}
              </Link>
            );
          })}
        </nav>

        <span className="mx-8 h-px bg-[var(--line)]" />

        {/* VOIR LE SITE */}
        <div className="px-8 py-6">
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--fg)] hover:text-[var(--accent)] transition-colors"
          >
            Voir le site
            <ArrowUpRight className="w-3 h-3 group-hover:rotate-45 transition-transform duration-500" />
          </Link>
        </div>

        <span className="mx-8 h-px bg-[var(--line)]" />

        {/* USER */}
        <form action={logout} className="mt-auto px-8 py-7 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 ring-1 ring-[var(--accent)]/30 grid place-items-center text-[var(--accent)] font-display italic text-base">
              {initial}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[9px] tracking-[0.3em] text-[var(--muted)] leading-none">CONNECTÉE</p>
              <p className="text-[12px] text-[var(--fg)] truncate mt-1.5 font-display">{email}</p>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--muted)] hover:text-[var(--color-rose)] transition-colors"
          >
            <LogOut className="w-3 h-3" />
            Déconnexion
          </button>
        </form>
      </aside>
    </>
  );
}
