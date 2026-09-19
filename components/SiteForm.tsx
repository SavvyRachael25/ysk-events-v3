"use client";

import { useState, type FormEvent, type ReactNode } from "react";

/**
 * Native site form that posts JSON to one of our /api routes, which forwards
 * to GHL. Handles the four states a person can see: idle, sending, done, error.
 */
export default function SiteForm({ action, submitLabel, done, children, className = "" }: { action: string; submitLabel: string; done: { title: string; body: string }; children: ReactNode; className?: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch(action, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const j = await res.json().catch(() => ({}));
      setState(res.ok && j.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className={`border-2 border-black bg-white p-8 ${className}`} role="status">
        <p className="font-display text-ink" style={{ fontSize: "var(--text-step-2)" }}>{done.title}</p>
        <p className="body-copy mt-3">{done.body}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`grid grid-cols-1 gap-5 ${className}`} noValidate>
      {/* Honeypot: people never see it, bots fill it. */}
      <div className="hidden" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      {children}
      {state === "error" && (
        <p className="font-sans text-[14px] font-bold text-la-pink" role="alert">
          That did not go through. Try again, or email hello@yskevents.com.
        </p>
      )}
      <button type="submit" disabled={state === "sending"} className="btn-gold w-fit disabled:opacity-60">
        {state === "sending" ? "Sending" : submitLabel}
      </button>
    </form>
  );
}

const field = "block w-full border-2 border-[#123d32] bg-white px-4 py-3.5 font-sans text-[15px] text-ink placeholder:text-[#7a8c86] focus:outline-none focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-la-pink";
const label = "mb-2 block font-sans text-[11px] font-extrabold uppercase tracking-[0.12em] text-ink";

export function Field({ name, labelText, type = "text", required = false, placeholder = "", autoComplete }: { name: string; labelText: string; type?: string; required?: boolean; placeholder?: string; autoComplete?: string }) {
  return (
    <div>
      <label htmlFor={name} className={label}>{labelText}{required && <span aria-hidden="true"> *</span>}</label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} className={field} />
    </div>
  );
}

export function TextArea({ name, labelText, placeholder = "", rows = 4 }: { name: string; labelText: string; placeholder?: string; rows?: number }) {
  return (
    <div>
      <label htmlFor={name} className={label}>{labelText}</label>
      <textarea id={name} name={name} rows={rows} placeholder={placeholder} className={field} />
    </div>
  );
}

export function Select({ name, labelText, options }: { name: string; labelText: string; options: string[] }) {
  return (
    <div>
      <label htmlFor={name} className={label}>{labelText}</label>
      <select id={name} name={name} defaultValue="" className={`${field} appearance-none`}>
        <option value="" disabled>Choose one</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
