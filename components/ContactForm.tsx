"use client";

import { useState } from "react";
import type { Locale, Dictionary } from "@/app/[lang]/dictionaries";

const WHATSAPP_NUMBER = "2250757595849";

export default function ContactForm({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const greet = lang === "fr" ? "Bonjour Marie" : "Hello Marie";
    const intro =
      lang === "fr"
        ? `Je suis ${name.trim()} (${email.trim()}).`
        : `My name is ${name.trim()} (${email.trim()}).`;
    const body = [greet + ",", "", intro, "", message.trim()]
      .filter(Boolean)
      .join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form className="space-y-8" onSubmit={onSubmit}>
      <Field
        label={dict.contact.form_name}
        name="name"
        value={name}
        onChange={setName}
      />
      <Field
        label={dict.contact.form_email}
        name="email"
        type="email"
        value={email}
        onChange={setEmail}
      />
      <div>
        <label className="eyebrow text-[var(--muted)]">
          {dict.contact.form_message}
        </label>
        <textarea
          required
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full bg-transparent border-b border-[var(--line)] focus:border-[var(--fg)] outline-none transition py-3 text-base resize-none"
        />
      </div>
      <button
        type="submit"
        className="group inline-flex items-center gap-3 bg-[var(--fg)] text-[var(--bg)] pl-7 pr-2 py-2.5 rounded-full text-[12px] uppercase tracking-[0.2em] font-medium hover:bg-[var(--accent)] transition"
      >
        {dict.contact.form_submit}
        <span className="w-9 h-9 rounded-full bg-[var(--bg)] text-[var(--fg)] flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
          →
        </span>
      </button>
      <p className="text-[11px] font-mono tracking-widest text-[var(--muted)]">
        {lang === "fr"
          ? "→ OUVERTURE WHATSAPP AVEC VOTRE MESSAGE PRÉ-REMPLI"
          : "→ OPENS WHATSAPP WITH YOUR MESSAGE PRE-FILLED"}
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="eyebrow text-[var(--muted)]">{label}</label>
      <input
        required
        type={type}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full bg-transparent border-b border-[var(--line)] focus:border-[var(--fg)] outline-none transition py-3 text-base"
      />
    </div>
  );
}
