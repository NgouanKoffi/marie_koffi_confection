"use client";

import { useRef, useState, useTransition } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadImageAction } from "../actions/upload";

export default function MultiImageUpload({
  name,
  initial = [],
  subfolder,
  label = "Photos",
}: {
  name: string;
  initial?: string[];
  subfolder: string;
  label?: string;
}) {
  const [urls, setUrls] = useState<string[]>(initial);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    setError(null);
    start(async () => {
      const next: string[] = [...urls];
      for (const f of files) {
        const fd = new FormData();
        fd.set("file", f);
        fd.set("subfolder", subfolder);
        const res = await uploadImageAction(fd);
        if (res.error) { setError(res.error); break; }
        if (res.url) next.push(res.url);
      }
      setUrls(next);
    });
    e.target.value = "";
  };

  const remove = (i: number) => setUrls(urls.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= urls.length) return;
    const next = [...urls];
    [next[i], next[j]] = [next[j], next[i]];
    setUrls(next);
  };

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] mb-2">{label}</p>
      <input type="hidden" name={name} value={JSON.stringify(urls)} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {urls.map((u, i) => (
          <div key={u + i} className="relative aspect-[3/4] overflow-hidden border border-[var(--line)] bg-[var(--paper)] group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => remove(i)}
              className="absolute top-1.5 right-1.5 p-1 rounded-full bg-[var(--fg)]/80 text-[var(--bg)] opacity-0 group-hover:opacity-100"
              aria-label="Retirer"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 opacity-0 group-hover:opacity-100">
              <button type="button" onClick={() => move(i, -1)} className="px-1.5 py-0.5 bg-[var(--fg)]/80 text-[var(--bg)] text-[10px]">←</button>
              <button type="button" onClick={() => move(i, 1)}  className="px-1.5 py-0.5 bg-[var(--fg)]/80 text-[var(--bg)] text-[10px]">→</button>
            </div>
            <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-[var(--fg)]/80 text-[var(--bg)] text-[10px] font-mono">#{i + 1}</span>
          </div>
        ))}
        {pending && (
          <div className="aspect-[3/4] grid place-items-center border border-[var(--line)] bg-[var(--paper)]">
            <Loader2 className="w-5 h-5 animate-spin text-[var(--accent)]" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={pending}
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--fg)] hover:text-[var(--accent)] transition-colors disabled:opacity-60"
        >
          <Upload className="w-3 h-3" />
          Téléverser
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={onPick}
          className="hidden"
        />
      </div>
      {error && <p className="mt-2 text-xs text-[var(--color-rose)]">{error}</p>}
    </div>
  );
}
