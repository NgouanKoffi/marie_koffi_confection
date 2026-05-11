"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="w-14 h-7" aria-hidden="true" />;
  }

  const isDark = theme === "dark";

  return (
    <button
      aria-label="toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex items-center w-14 h-7 rounded-full border transition-colors duration-500"
      style={{
        borderColor: "var(--line)",
        backgroundColor: isDark ? "var(--paper)" : "var(--card)",
      }}
    >
      <span
        className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex items-center justify-center text-[10px]"
        style={{
          backgroundColor: "var(--fg)",
          color: "var(--bg)",
          transform: isDark ? "translateX(28px)" : "translateX(0)",
        }}
      >
        {isDark ? "☾" : "☀"}
      </span>
    </button>
  );
}
