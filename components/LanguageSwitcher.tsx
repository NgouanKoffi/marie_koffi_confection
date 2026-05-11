"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import type { Locale } from "@/app/[lang]/dictionaries";

type Item = { code: Locale; label: string; Flag: () => React.ReactElement };

const FlagFR = () => (
  <svg viewBox="0 0 3 2" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <rect width="1" height="2" fill="#0055A4" />
    <rect x="1" width="1" height="2" fill="#fff" />
    <rect x="2" width="1" height="2" fill="#EF4135" />
  </svg>
);

const FlagEN = () => (
  <svg viewBox="0 0 60 30" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    <rect width="60" height="30" fill="#fff" />
    <g fill="#B22234">
      {Array.from({ length: 7 }).map((_, i) => (
        <rect key={i} y={i * 4.615} width="60" height="2.31" />
      ))}
    </g>
    <rect width="24" height="16.15" fill="#3C3B6E" />
  </svg>
);

const ITEMS: Item[] = [
  { code: "fr", label: "Français", Flag: FlagFR },
  { code: "en", label: "English", Flag: FlagEN },
];

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("mousedown", onClick);
      document.addEventListener("keydown", onKey);
      return () => {
        document.removeEventListener("mousedown", onClick);
        document.removeEventListener("keydown", onKey);
      };
    }
  }, [open]);

  function switchTo(loc: Locale) {
    setOpen(false);
    if (loc === current) return;
    const segments = pathname.split("/");
    segments[1] = loc;
    router.push(segments.join("/") || `/${loc}`);
  }

  const currentItem = ITEMS.find((i) => i.code === current) ?? ITEMS[0];

  return (
    <div className="relative" ref={ref}>
      <button
        aria-label="change language"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="w-7 h-7 rounded-full overflow-hidden ring-1 transition hover:opacity-80"
        style={{ borderColor: "var(--line)" }}
      >
        <currentItem.Flag />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 min-w-[160px] rounded-xl border shadow-xl overflow-hidden z-50"
          style={{
            background: "var(--bg)",
            borderColor: "var(--line)",
          }}
        >
          {ITEMS.map(({ code, label, Flag }) => {
            const active = code === current;
            return (
              <button
                key={code}
                role="option"
                aria-selected={active}
                onClick={() => switchTo(code)}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm transition hover:opacity-70"
                style={{
                  background: active
                    ? "color-mix(in srgb, var(--fg) 6%, transparent)"
                    : "transparent",
                }}
              >
                <span
                  className="w-5 h-5 rounded-full overflow-hidden ring-1 shrink-0"
                  style={{ borderColor: "var(--line)" }}
                >
                  <Flag />
                </span>
                <span
                  className={`flex-1 text-left ${active ? "font-semibold" : ""}`}
                >
                  {label}
                </span>
                {active && (
                  <Check size={14} style={{ color: "var(--accent)" }} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
