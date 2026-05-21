"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Eye, EyeOff, ArrowUpRight } from "lucide-react";
import { login } from "./actions";

export default function LoginForm({ next, error }: { next: string; error?: string }) {
  return (
    <main className="min-h-[100dvh] grid place-items-center bg-[var(--bg)] text-[var(--fg)] px-6 py-12">
      <div className="relative w-full max-w-md">
        {/* corner accents */}
        <span className="pointer-events-none absolute -top-px -left-px w-12 h-px bg-[var(--accent)]" />
        <span className="pointer-events-none absolute -top-px -left-px w-px h-12 bg-[var(--accent)]" />
        <span className="pointer-events-none absolute -bottom-px -right-px w-12 h-px bg-[var(--accent)]" />
        <span className="pointer-events-none absolute -bottom-px -right-px w-px h-12 bg-[var(--accent)]" />

        <form action={login} className="bg-[var(--card)] border border-[var(--line)] px-9 py-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-[10px] tracking-[0.32em] text-[var(--muted)]">
              CHAPITRE / 00
            </span>
            <span className="h-px flex-1 bg-[var(--line)]" />
          </div>

          <p className="font-display text-3xl font-light leading-none">
            MARIE <span className="italic text-[var(--accent)]">Koffi</span>
          </p>
          <p className="font-mono text-[10px] tracking-[0.32em] text-[var(--muted)] mt-2">
            ADMIN · PANEL · CI
          </p>

          <div className="h-10" />

          <div className="space-y-7">
            <Field name="email" type="email" label="Email" autoComplete="email" required />
            <PasswordField name="password" label="Mot de passe" autoComplete="current-password" required />
          </div>

          <input type="hidden" name="next" value={next} />

          {error && (
            <p className="mt-6 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--color-rose)]">
              {error}
            </p>
          )}

          <Submit />

          <p className="mt-8 font-mono text-[9px] tracking-[0.32em] text-[var(--muted)] text-center">
            EST · 2024 · ABIDJAN
          </p>
        </form>
      </div>
    </main>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">{label}</span>
      <input
        {...rest}
        className="mt-2 w-full bg-transparent border-0 border-b border-[var(--line)] py-2.5 text-[15px] font-display font-light text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
      />
    </label>
  );
}

function PasswordField(props: Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & { label: string }) {
  const { label, ...rest } = props;
  const [show, setShow] = useState(false);
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">{label}</span>
      <div className="relative mt-2">
        <input
          {...rest}
          type={show ? "text" : "password"}
          className="w-full bg-transparent border-0 border-b border-[var(--line)] py-2.5 pr-10 text-[15px] font-display font-light text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)]"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Masquer" : "Afficher"}
          className="absolute right-0 bottom-2 text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </label>
  );
}

function Submit() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="group mt-10 w-full inline-flex items-center justify-between gap-3 pl-6 pr-2 py-3 rounded-full text-[11px] uppercase tracking-[0.22em] font-medium bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--accent)] transition-colors disabled:opacity-60"
    >
      <span>{pending ? "Connexion…" : "Se connecter"}</span>
      <span className="w-9 h-9 rounded-full bg-[var(--bg)] text-[var(--fg)] flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
        <ArrowUpRight className="w-4 h-4" />
      </span>
    </button>
  );
}
