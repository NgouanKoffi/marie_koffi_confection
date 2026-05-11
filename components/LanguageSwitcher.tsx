"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/app/[lang]/dictionaries";

const LOCALES: Locale[] = ["fr", "en"];

export default function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(loc: Locale) {
    if (loc === current) return;
    const segments = pathname.split("/");
    segments[1] = loc;
    router.push(segments.join("/") || `/${loc}`);
  }

  return (
    <div className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest">
      {LOCALES.map((loc, i) => (
        <span key={loc} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-[var(--muted)]">/</span>}
          <button
            onClick={() => switchTo(loc)}
            className={`uppercase transition ${
              current === loc
                ? "text-[var(--fg)] font-semibold"
                : "text-[var(--muted)] hover:text-[var(--fg)]"
            }`}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
