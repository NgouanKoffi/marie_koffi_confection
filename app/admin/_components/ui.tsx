"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

// ---------------------------------------------------------------
// INPUT — couture sketch feel: thin underline, uppercase eyebrow
// ---------------------------------------------------------------
export function Field({
  label,
  hint,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; hint?: string }) {
  return (
    <label className="block group">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors">
        {label}
      </span>
      <input
        {...props}
        className={`mt-2 w-full bg-transparent border-0 border-b border-[var(--line)] py-2.5 text-[15px] font-display font-light text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)] placeholder:text-[var(--muted)]/40 ${props.className ?? ""}`}
      />
      {hint && <span className="mt-1.5 block text-[11px] text-[var(--muted)] italic">{hint}</span>}
    </label>
  );
}

export function TextArea({
  label,
  hint,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; hint?: string }) {
  return (
    <label className="block group">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors">
        {label}
      </span>
      <textarea
        {...props}
        className={`mt-2 w-full bg-transparent border-0 border-b border-[var(--line)] py-2.5 text-[14px] leading-relaxed text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)] placeholder:text-[var(--muted)]/40 min-h-[100px] resize-y ${props.className ?? ""}`}
      />
      {hint && <span className="mt-1.5 block text-[11px] text-[var(--muted)] italic">{hint}</span>}
    </label>
  );
}

export function Select({
  label,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string }) {
  return (
    <label className="block group">
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] group-focus-within:text-[var(--accent)] transition-colors">
        {label}
      </span>
      <select
        {...props}
        className={`mt-2 w-full bg-transparent border-0 border-b border-[var(--line)] py-2.5 text-[15px] font-display font-light text-[var(--fg)] outline-none transition-colors focus:border-[var(--accent)] appearance-none cursor-pointer ${props.className ?? ""}`}
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%234c1d95' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 4px center",
          paddingRight: "28px",
        }}
      >
        {children}
      </select>
    </label>
  );
}

// ---------------------------------------------------------------
// BUTTONS — black pill, hover plum (matches public site CTA)
// ---------------------------------------------------------------
export function SubmitButton({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full text-[11px] uppercase tracking-[0.22em] font-medium bg-[var(--fg)] text-[var(--bg)] hover:bg-[var(--accent)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {pending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
      <span>{children}</span>
      <span className="w-7 h-7 rounded-full bg-[var(--bg)] text-[var(--fg)] flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 font-mono text-xs">
        ↗
      </span>
    </button>
  );
}

export function DeleteButton({
  children = "Supprimer",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] font-mono text-[var(--muted)] hover:text-[var(--color-rose)] transition-colors disabled:opacity-60 ${className}`}
    >
      {pending && <Loader2 className="w-3 h-3 animate-spin" />}
      {children}
    </button>
  );
}

// ---------------------------------------------------------------
// PAGE HEADER — editorial: numbered eyebrow + italic Bodoni title
// ---------------------------------------------------------------
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function PageHeader({
  title,
  subtitle,
  right,
  number,
  back,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  number?: string;
  back?: { href: string; label?: string };
}) {
  return (
    <header className="relative mb-12 pb-6 border-b border-[var(--line)]">
      {back && (
        <Link
          href={back.href}
          className="group inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--muted)] hover:text-[var(--accent)] transition-colors mb-5"
        >
          <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
          {back.label ?? "Retour"}
        </Link>
      )}
      <div className="flex items-center gap-4 mb-5">
        {number && (
          <span className="font-mono text-[10px] tracking-[0.28em] text-[var(--muted)]">
            {number}
          </span>
        )}
        <span className="h-px w-10 bg-[var(--fg)]" />
        <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-[var(--muted)]">
          Admin · MKC
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div className="min-w-0 flex-1">
          <h1 className="font-display font-light text-4xl sm:text-5xl lg:text-6xl text-[var(--fg)] leading-[0.95] tracking-tight">
            {title}
            <span className="italic text-[var(--accent)]">.</span>
          </h1>
          {subtitle && (
            <p className="mt-4 text-[14px] leading-relaxed text-[var(--muted)] max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
    </header>
  );
}

// ---------------------------------------------------------------
// CARD — white paper, hairline top-left, generous padding
// ---------------------------------------------------------------
export function Card({
  children,
  className = "",
  title,
  caption,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  caption?: string;
}) {
  return (
    <section className={`relative bg-[var(--card)] border border-[var(--line)] p-8 sm:p-10 ${className}`}>
      <span className="pointer-events-none absolute top-0 left-0 w-10 h-px bg-[var(--accent)]" />
      <span className="pointer-events-none absolute top-0 left-0 w-px h-10 bg-[var(--accent)]" />
      {title && (
        <header className="mb-7 pb-5 border-b border-[var(--line-soft)]">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-[9px] tracking-[0.3em] text-[var(--muted)]">
              {caption ?? "SECTION"}
            </span>
          </div>
          <h2 className="font-display font-light text-2xl tracking-tight text-[var(--fg)]">
            {title}
            <span className="italic text-[var(--accent)]">.</span>
          </h2>
        </header>
      )}
      {children}
    </section>
  );
}

// ---------------------------------------------------------------
// SUPPORTING — vertical label / divider
// ---------------------------------------------------------------
export function VerticalLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-mono text-[9px] tracking-[0.32em] uppercase text-[var(--muted)]"
      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
    >
      {children}
    </div>
  );
}

export function Hairline({ className = "" }: { className?: string }) {
  return <span className={`block h-px bg-[var(--line)] ${className}`} />;
}
