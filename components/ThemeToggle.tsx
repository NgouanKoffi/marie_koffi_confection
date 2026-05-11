"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-8 h-8" aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      aria-label="toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-8 h-8 rounded-full border flex items-center justify-center transition hover:opacity-80"
      style={{
        borderColor: "var(--line)",
        background: "var(--paper)",
        color: "var(--fg)",
      }}
    >
      {isDark ? <Sun size={15} strokeWidth={1.7} /> : <Moon size={15} strokeWidth={1.7} />}
    </button>
  );
}
