"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Locale, Dictionary } from "@/app/[lang]/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

type Props = { lang: Locale; dict: Dictionary };

function isActive(pathname: string, href: string, lang: Locale) {
  const home = `/${lang}`;
  if (href === home) return pathname === home || pathname === `${home}/`;
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar({ lang, dict }: Props) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname() || "";

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: `/${lang}`, label: dict.nav.home },
    { href: `/${lang}/boutique`, label: dict.nav.shop },
    { href: `/${lang}/parcours`, label: dict.nav.journey },
    { href: `/${lang}/about`, label: dict.nav.about },
    { href: `/${lang}/contact`, label: dict.nav.contact },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl border-b" : ""
        }`}
        style={{
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--bg) 80%, transparent)"
            : "transparent",
          borderColor: scrolled ? "var(--line-soft)" : "transparent",
        }}
      >
        <div className="mx-auto max-w-[1500px] px-3 sm:px-6 lg:px-10 h-14 flex items-center justify-between gap-2 sm:gap-4">
          <Link
            href={`/${lang}`}
            className="flex items-center gap-3 group min-w-0"
          >
            <div
              className="w-9 h-9 shrink-0 rounded-full overflow-hidden ring-1 transition"
              style={{ borderColor: "var(--line)" }}
            >
              <Image
                src="/logo.jpeg"
                alt="MKC"
                width={72}
                height={72}
                className="object-cover"
              />
            </div>
            <div className="hidden xl:block leading-[1.05] whitespace-nowrap">
              <div className="font-display text-[1.05rem] font-semibold tracking-[0.28em] uppercase">
                Marie Koffi
              </div>
              <div className="font-mono text-[9px] tracking-[0.45em] uppercase text-[var(--muted)] mt-1.5">
                Confection
              </div>
            </div>
            <div className="xl:hidden font-display text-lg font-medium tracking-[0.18em] leading-none">
              MK<span className="italic text-[var(--accent)]">C</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            {links.map((l, i) => {
              const active = isActive(pathname, l.href, lang);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative flex items-center gap-2 text-[13px] font-medium transition ${
                    active ? "" : "hover:opacity-60"
                  }`}
                  style={active ? { color: "var(--accent)" } : undefined}
                >
                  <span
                    className="font-mono text-[10px]"
                    style={{
                      color: active ? "var(--accent)" : "var(--muted)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative">
                    {l.label}
                    {active && (
                      <span
                        className="absolute -bottom-1.5 left-0 right-0 h-px"
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                  </span>
                  {active && (
                    <span
                      className="w-1.5 h-1.5 rounded-full pulse-dot"
                      style={{ background: "var(--accent)" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden min-[230px]:flex items-center gap-2 sm:gap-4">
              <LanguageSwitcher current={lang} />
              <ThemeToggle />
            </div>
            <a
              href="https://wa.me/2250757595849"
              target="_blank"
              rel="noreferrer"
              className="hidden lg:inline-flex items-center px-4 py-2 text-[10px] uppercase tracking-[0.22em] font-semibold rounded-full transition"
              style={{
                backgroundColor: "var(--fg)",
                color: "var(--bg)",
              }}
            >
              {lang === "fr" ? "Rendez-vous" : "Booking"}
            </a>
            <button
              aria-label="menu"
              onClick={() => setOpen(true)}
              className="md:hidden p-1.5 -mr-1.5"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[85%] max-w-sm flex flex-col md:hidden"
              style={{
                background: "var(--bg)",
                borderLeft: "1px solid var(--line-soft)",
              }}
            >
              <div
                className="flex items-center justify-between px-6 h-14 border-b"
                style={{ borderColor: "var(--line-soft)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full overflow-hidden ring-1"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <Image
                      src="/logo.jpeg"
                      alt="MKC"
                      width={72}
                      height={72}
                      className="object-cover"
                    />
                  </div>
                  <div className="font-display text-lg font-medium tracking-[0.18em] leading-none">
                    MK<span className="italic text-[var(--accent)]">C</span>
                  </div>
                </div>
                <button
                  aria-label="close menu"
                  onClick={() => setOpen(false)}
                  className="p-2 -mr-2"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-5">
                {links.map((l, i) => {
                  const active = isActive(pathname, l.href, lang);
                  return (
                    <motion.div
                      key={l.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.06 }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center gap-3 py-1 text-2xl font-display ${
                          active ? "italic" : ""
                        }`}
                        style={active ? { color: "var(--accent)" } : undefined}
                      >
                        <span
                          className="font-mono text-[10px]"
                          style={{
                            color: active ? "var(--accent)" : "var(--muted)",
                          }}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {l.label}
                        {active && (
                          <span
                            className="w-1.5 h-1.5 rounded-full pulse-dot"
                            style={{ background: "var(--accent)" }}
                          />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div
                className="px-6 py-6 border-t flex flex-col gap-5"
                style={{ borderColor: "var(--line-soft)" }}
              >
                <div className="min-[230px]:hidden flex items-center justify-between">
                  <LanguageSwitcher current={lang} />
                  <ThemeToggle />
                </div>
                <a
                  href="https://wa.me/2250757595849"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold rounded-full transition"
                  style={{
                    backgroundColor: "var(--fg)",
                    color: "var(--bg)",
                  }}
                >
                  {lang === "fr" ? "Rendez-vous" : "Booking"}
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
