"use client";

import { Mail, MapPin, ShieldCheck } from "lucide-react";
import { FormEvent } from "react";
import SquashBallCanvas from "./SquashBallCanvas";
import { CONTACT_INTERESTS } from "@/lib/content";
import { CONTACT_EMAIL } from "@/lib/constants";

const inputClass =
  "w-full rounded-md border border-border-strong bg-fg/[0.06] px-4 py-3 font-sans text-[14px] text-fg outline-none transition-colors duration-base placeholder:text-fg-faint focus:border-mint focus:bg-fg/[0.1]";

const labelClass =
  "mb-1.5 block font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-fg-faint";

function handleMailtoSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const firstName = String(data.get("firstName") ?? "").trim();
  const lastName = String(data.get("lastName") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const interest = String(data.get("interest") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();

  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const subject = interest
    ? `YSK inquiry — ${interest}`
    : "YSK Events inquiry";
  const body = [
    fullName && `Name: ${fullName}`,
    email && `Reply-to: ${email}`,
    interest && `Interested in: ${interest}`,
    "",
    message,
  ]
    .filter((line) => line !== undefined)
    .join("\n");

  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden px-6 py-24 md:px-12 lg:px-20 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              ellipse 60% 60% at 10% 20%,
              hsl(262 52% 32% / 0.4) 0%,
              transparent 65%
            ),
            radial-gradient(
              ellipse 60% 60% at 90% 80%,
              hsl(210 90% 40% / 0.25) 0%,
              transparent 65%
            )
          `,
        }}
      />
      <SquashBallCanvas
        balls={[
          { size: 180, position: "top-[-40px] left-[6%]",    animation: "animate-ball-1", speed: "pro", depth: "back" },
          { size: 120, position: "top-[30%] right-[8%]",     animation: "animate-ball-3", speed: "progress", depth: "mid", delay: "-3s" },
          { size: 90,  position: "bottom-[10%] left-[32%]",  animation: "animate-ball-4", speed: "junior", depth: "back", delay: "-5s" },
        ]}
      />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        <header className="mb-14">
          <div className="mb-4 flex items-center gap-3">
            <span className="h-px w-8 bg-mint/70" />
            <span className="eyebrow">Get involved</span>
          </div>
          <h2
            id="contact-heading"
            className="font-display uppercase text-fg"
            style={{
              fontSize: "var(--text-step-4)",
              fontWeight: 700,
              lineHeight: 0.9,
              letterSpacing: "-0.005em",
            }}
          >
            Ready to make{" "}
            <span className="font-editorial italic text-mint" style={{ fontWeight: 500 }}>
              an impact?
            </span>
          </h2>
        </header>

        <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-14">
          {/* LEFT: intro + contact points */}
          <div>
            <p className="max-w-[560px] text-fg/75 leading-relaxed">
              Whether you&rsquo;re a parent exploring programs, a corporation
              seeking meaningful sponsorship, a foundation ready to invest in
              youth, or a squash enthusiast who wants to give back — we want to
              hear from you.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-center gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md border border-border-strong bg-fg/[0.08] text-mint">
                  <Mail size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-mint">
                    Email
                  </div>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="font-sans text-[14px] text-fg/85 transition-colors hover:text-fg"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md border border-border-strong bg-fg/[0.08] text-gold">
                  <MapPin size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
                    Based in
                  </div>
                  <div className="font-sans text-[14px] text-fg/85">
                    Pacific Northwest, USA
                  </div>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md border border-border-strong bg-fg/[0.08] text-coral">
                  <ShieldCheck size={18} strokeWidth={1.75} />
                </div>
                <div>
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-coral">
                    Status
                  </div>
                  <div className="font-sans text-[14px] text-fg/85">
                    501(c)(3) tax-exempt nonprofit
                  </div>
                </div>
              </li>
            </ul>

            <blockquote
              className="mt-10 glass rounded-lg p-6 md:p-7"
              style={{ borderLeft: "2px solid hsl(var(--color-gold))" }}
            >
              <p
                className="font-editorial italic text-fg/80 leading-relaxed"
                style={{ fontSize: "var(--text-step-1)" }}
              >
                &ldquo;A world where every child has the opportunity to become a
                champion — on the court, in the classroom, and in life.&rdquo;
              </p>
              <footer className="eyebrow mt-3 !text-fg-faint">
                — YSK Events vision
              </footer>
            </blockquote>
          </div>

          {/* RIGHT: form */}
          <form
            className="glass rounded-lg p-7 md:p-8"
            style={{ borderTop: "2px solid hsl(var(--color-mint))" }}
            onSubmit={handleMailtoSubmit}
          >
            <p className="eyebrow mb-6 !text-mint">Send a message</p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className={labelClass} htmlFor="firstName">
                  First name
                </label>
                <input className={inputClass} id="firstName" name="firstName" type="text" placeholder="Jane" />
              </div>
              <div>
                <label className={labelClass} htmlFor="lastName">
                  Last name
                </label>
                <input className={inputClass} id="lastName" name="lastName" type="text" placeholder="Smith" />
              </div>
            </div>

            <div className="mt-4">
              <label className={labelClass} htmlFor="email">
                Email address
              </label>
              <input className={inputClass} id="email" name="email" type="email" placeholder="jane@example.com" />
            </div>

            <div className="mt-4">
              <label className={labelClass} htmlFor="interest">
                I&rsquo;m interested in…
              </label>
              <select className={inputClass} id="interest" name="interest" defaultValue="">
                <option value="" disabled>
                  Select an option
                </option>
                {CONTACT_INTERESTS.map((v) => (
                  <option key={v} value={v} style={{ background: "hsl(264 65% 12%)" }}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-4">
              <label className={labelClass} htmlFor="message">
                Message
              </label>
              <textarea
                className={`${inputClass} min-h-[120px] resize-y`}
                id="message"
                name="message"
                placeholder="Tell us how you'd like to get involved…"
              />
            </div>

            <button
              type="submit"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-mint py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-mint-ink transition-all duration-base ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-mint)]"
            >
              Send message
              <span
                aria-hidden="true"
                className="transition-transform duration-base ease-[var(--ease-spring)] group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
