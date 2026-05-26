"use client";

import { useRef, useState, useTransition } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { uploadImageAction } from "../actions/upload";
import { compressImage, MAX_UPLOAD_BYTES, tooHeavyMessage } from "./compressImage";

export default function ImageUpload({
  name,
  initial = "",
  subfolder,
  label = "Image",
  aspect = "aspect-[3/4]",
  width = "w-40",
}: {
  name: string;
  initial?: string;
  subfolder: string;
  label?: string;
  aspect?: string;
  width?: string;
}) {
  const [url, setUrl] = useState(initial);
  const [error, setError] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    start(async () => {
      try {
        const compressed = await compressImage(file);
        if (compressed.size > MAX_UPLOAD_BYTES) {
          setError(tooHeavyMessage(compressed.size));
          return;
        }
        const fd = new FormData();
        fd.set("file", compressed);
        fd.set("subfolder", subfolder);
        const res = await uploadImageAction(fd);
        if (res.error) setError(res.error);
        else if (res.url) setUrl(res.url);
      } catch {
        setError("Échec de l'envoi — l'image est probablement trop lourde. Réduisez son poids sur bulkresize.com, puis réessayez.");
      }
    });
    e.target.value = "";
  };

  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted)] mb-2">{label}</p>
      <input type="hidden" name={name} value={url} />
      <div className={`relative ${aspect} ${width} overflow-hidden border border-[var(--line)] bg-[var(--paper)] group`}>
        {url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={url} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-[var(--muted)] text-[10px] font-mono uppercase tracking-[0.28em]">
            Aucune
          </div>
        )}

        {pending && (
          <div className="absolute inset-0 grid place-items-center bg-[var(--bg)]/80 backdrop-blur-sm">
            <Loader2 className="w-5 h-5 animate-spin text-[var(--accent)]" />
          </div>
        )}

        {url && !pending && (
          <button
            type="button"
            onClick={() => setUrl("")}
            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-[var(--fg)]/80 text-[var(--bg)] opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Retirer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={pending}
          className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--fg)] hover:text-[var(--accent)] transition-colors disabled:opacity-60"
        >
          <Upload className="w-3 h-3" />
          {url ? "Remplacer" : "Téléverser"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={onPick}
          className="hidden"
        />
      </div>
      {error && <p className="mt-2 text-xs text-[var(--color-rose)]">{error}</p>}
    </div>
  );
}
