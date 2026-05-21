"use client";

import { useState, useTransition } from "react";
import { ArrowUp, ArrowDown, GripVertical, Eye, EyeOff, Check, Loader2 } from "lucide-react";
import { SECTION_META, type Section } from "@/lib/sections";
import { saveSections } from "./actions";

export default function SectionsForm({ initial }: { initial: Section[] }) {
  const [sections, setSections] = useState<Section[]>(initial);
  const [pending, start] = useTransition();
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= sections.length) return;
    const next = sections.slice();
    [next[i], next[j]] = [next[j], next[i]];
    setSections(next);
  };

  const toggle = (i: number) => {
    const next = sections.slice();
    next[i] = { ...next[i], enabled: !next[i].enabled };
    setSections(next);
  };

  const submit = () => {
    setError(null);
    start(async () => {
      const res = await saveSections(JSON.stringify(sections));
      if (res.ok) setSavedAt(Date.now());
      else setError(res.error ?? "Erreur");
    });
  };

  const dirty = JSON.stringify(sections) !== JSON.stringify(initial);

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed">
          Réorganisez avec les flèches. Cliquez l&apos;œil pour activer/désactiver.
        </p>
        <button
          type="button"
          onClick={submit}
          disabled={!dirty || pending}
          className="self-stretch sm:self-auto inline-flex items-center justify-center gap-2 rounded-full px-6 sm:px-7 py-3 font-bold text-[11px] uppercase tracking-[0.24em] sm:tracking-[0.28em] text-[var(--bg)] bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--accent)] hover:-translate-y-[1px] active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 whitespace-nowrap"
        >
          {pending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          {savedAt && !dirty && !pending ? <Check className="w-3.5 h-3.5" /> : null}
          {savedAt && !dirty && !pending ? "Enregistré" : "Enregistrer"}
        </button>
      </div>

      {error && (
        <div className="rounded-xl bg-[var(--color-rose)]/10 ring-1 ring-[var(--color-rose)]/30 text-[var(--color-rose)] text-sm px-4 py-3">
          {error}
        </div>
      )}

      <ul className="space-y-2">
        {sections.map((s, i) => {
          const meta = SECTION_META[s.key];
          return (
            <li
              key={s.key}
              className={`relative flex flex-col sm:flex-row sm:items-center gap-3 rounded-2xl ring-1 px-3 sm:px-4 py-3 transition-all ${
                s.enabled
                  ? "bg-gradient-to-r from-[var(--paper)] to-[var(--paper)] ring-[var(--line)] hover:ring-[var(--accent)]/30"
                  : "bg-[var(--paper)] ring-[var(--line-soft)] opacity-60"
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 sm:flex-1">
                <span className="hidden sm:grid place-items-center w-7 h-7 rounded-lg text-[var(--muted)]/70 shrink-0">
                  <GripVertical className="w-4 h-4" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--accent)] w-6 sm:w-7 tabular-nums shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className={`font-display font-light text-base sm:text-lg leading-tight truncate ${s.enabled ? "text-[var(--fg)]" : "text-[var(--muted)]/60"}`}>
                    {meta.label}
                  </p>
                  <p className="text-[11px] text-[var(--muted)] truncate mt-0.5">
                    #{meta.anchor}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  className="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[var(--paper)] ring-1 ring-[var(--line)] hover:ring-[var(--accent)]/40 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] text-[var(--muted)] transition-all disabled:opacity-30"
                  aria-label="Monter"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === sections.length - 1}
                  className="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[var(--paper)] ring-1 ring-[var(--line)] hover:ring-[var(--accent)]/40 hover:bg-[var(--accent)]/10 hover:text-[var(--accent)] text-[var(--muted)] transition-all disabled:opacity-30"
                  aria-label="Descendre"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className={`grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg ring-1 transition-all ${
                    s.enabled
                      ? "bg-[var(--accent)]/15 ring-[var(--accent)]/40 text-[var(--accent)] hover:bg-[var(--accent)]/25"
                      : "bg-[var(--paper)] ring-[var(--line)] text-[var(--muted)] hover:ring-[var(--color-rose)]/40 hover:text-[var(--color-rose)]"
                  }`}
                  aria-label={s.enabled ? "Désactiver" : "Activer"}
                >
                  {s.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
