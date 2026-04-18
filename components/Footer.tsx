"use client";

import { ArrowUp } from "lucide-react";
import { CONTACT_EMAIL, ORG_FOUNDED, SOCIAL } from "@/lib/constants";
import { NAV_SECTIONS } from "@/lib/content";

function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8.25h2.75l.41-3.19H13.5V7.52c0-.92.26-1.55 1.58-1.55h1.69V3.13c-.29-.04-1.29-.13-2.45-.13-2.43 0-4.09 1.48-4.09 4.2v2.36H7.48v3.19h2.75V21h3.27Z" />
    </svg>
  );
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.35V9h3.4v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const PROGRAM_LINKS = [
  "Squash Forward",
  "Community Clinics",
  "Squash + Academics",
  "Competitive Training",
  "Squash Art",
  "LA28 Pathway",
];

const INVOLVED = [
  { label: "Make a donation", href: "/#donate" },
  { label: "Corporate sponsorship", href: "/#contact" },
  { label: "Olympic naming rights", href: "/#contact" },
  { label: "Volunteer", href: "/#contact" },
  { label: "Email us", href: `mailto:${CONTACT_EMAIL}` },
];

const SOCIAL_LINKS = [
  { icon: FacebookIcon, href: SOCIAL.facebook, label: "Facebook" },
  { icon: InstagramIcon, href: SOCIAL.instagram, label: "Instagram" },
  { icon: LinkedinIcon, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="relative border-t border-border bg-ink-2 px-6 pb-10 pt-16 md:px-12 lg:px-20"
    >
      {/* Newsletter — centered top strip */}
      <div className="mx-auto mb-14 max-w-[560px] border-b border-border pb-12 text-center">
        <p
          className="mb-2 font-display uppercase text-fg"
          style={{
            fontSize: "var(--text-step-2)",
            fontWeight: 700,
            letterSpacing: "0.02em",
            lineHeight: 1,
          }}
        >
          Stay in the game
        </p>
        <p className="mb-6 text-[14px] text-fg/65">
          Updates on programs, tournaments, and the road to LA28.
        </p>
        <form
          className="mx-auto flex max-w-[420px] gap-2"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="your@email.com"
            aria-label="Email address"
            className="flex-1 rounded-md border border-border-strong bg-fg/[0.06] px-4 py-3 font-sans text-sm text-fg outline-none transition-colors placeholder:text-fg-faint focus:border-mint"
          />
          <button
            type="submit"
            className="rounded-md bg-mint px-5 py-3 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-mint-ink transition-all duration-base hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-mint)]"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Columns */}
      <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-10 border-b border-border pb-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand block */}
        <div>
          <div className="mb-4 inline-flex items-baseline gap-[6px]">
            <span
              className="font-display uppercase leading-none text-fg"
              style={{
                fontWeight: 700,
                fontSize: "1.5rem",
                letterSpacing: "0.04em",
              }}
            >
              YSK
            </span>
            <span
              className="text-[9px] font-semibold uppercase text-mint"
              style={{ letterSpacing: "0.28em", fontFamily: "var(--font-sans)" }}
            >
              Events
            </span>
          </div>
          <p className="mb-4 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-mint">
            Raising champions. On &amp; off the court.
          </p>
          <p
            className="mb-5 font-editorial italic text-fg/60 leading-relaxed"
            style={{ fontSize: "0.95rem" }}
          >
            A 501(c)(3) nonprofit harnessing the power of squash to build
            champions — in sport, in school, and in life.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="block font-display text-fg transition-colors hover:text-mint"
            style={{
              fontSize: "0.95rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {CONTACT_EMAIL}
          </a>
          <ul className="mt-5 flex gap-2.5">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-border-strong bg-fg/[0.06] text-fg/70 transition-all duration-base hover:border-mint hover:bg-mint hover:text-mint-ink"
                >
                  <s.icon size={15} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Nav column */}
        <div>
          <p className="eyebrow mb-4 !text-fg-faint">Navigate</p>
          <ul className="space-y-2.5">
            {NAV_SECTIONS.filter((s) => s.id !== "donate").map((l) => (
              <li key={l.id}>
                <a
                  href={l.href}
                  className="font-sans text-[14px] text-fg/65 transition-colors hover:text-mint"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Programs column */}
        <div>
          <p className="eyebrow mb-4 !text-fg-faint">Programs</p>
          <ul className="space-y-2.5">
            {PROGRAM_LINKS.map((p) => (
              <li key={p}>
                <a
                  href="/#programs"
                  className="font-sans text-[14px] text-fg/65 transition-colors hover:text-mint"
                >
                  {p}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Get Involved column */}
        <div>
          <p className="eyebrow mb-4 !text-fg-faint">Get involved</p>
          <ul className="space-y-2.5">
            {INVOLVED.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="font-sans text-[14px] text-fg/65 transition-colors hover:text-mint"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="mx-auto mt-7 flex max-w-[1180px] flex-col items-center justify-between gap-4 sm:flex-row">
        <p className="font-sans text-[12px] text-fg-faint">
          &copy; {year} YSK Events · 501(c)(3) Nonprofit · Pacific Northwest ·
          Est. {ORG_FOUNDED}
        </p>
        <div className="flex items-center gap-5">
          <a
            href="/privacy"
            className="font-sans text-[12px] text-fg-faint transition-colors hover:text-mint"
          >
            Privacy
          </a>
          <a
            href="/terms"
            className="font-sans text-[12px] text-fg-faint transition-colors hover:text-mint"
          >
            Terms
          </a>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border-strong bg-fg/[0.06] text-fg/60 transition-all duration-base hover:border-mint hover:bg-mint hover:text-mint-ink"
          >
            <ArrowUp size={14} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </footer>
  );
}
