"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_SECTIONS } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Inline wordmark — no external image dependency, scales crisply */
function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex items-baseline gap-[6px]", className)}
      aria-label="YSK Events"
    >
      <span
        className="font-display uppercase leading-none text-fg"
        style={{
          fontWeight: 700,
          fontSize: "1.4rem",
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
    </span>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let cur = "home";
      for (const s of NAV_SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && window.scrollY >= el.offsetTop - 120) cur = s.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      <nav
        aria-label="Primary"
        className={cn(
          "fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-6 transition-all duration-base ease-[var(--ease-out-expo)] md:h-[72px] md:px-10",
        )}
        style={{
          background: scrolled
            ? "hsl(264 65% 7% / 0.78)"
            : "hsl(264 65% 7% / 0.25)",
          backdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "blur(6px)",
          borderBottom: scrolled
            ? "1px solid hsl(0 0% 100% / 0.08)"
            : "1px solid transparent",
        }}
      >
        <a href="/#home" className="group flex items-center">
          <Wordmark />
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_SECTIONS.filter((s) => s.id !== "donate").map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                className={cn(
                  "group relative font-sans text-[10.5px] font-semibold uppercase tracking-[0.22em] transition-colors duration-base",
                  active === s.id
                    ? "text-mint"
                    : "text-fg/70 hover:text-fg",
                )}
              >
                {s.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px origin-left bg-mint transition-transform duration-base ease-[var(--ease-out-expo)]",
                    active === s.id ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </a>
            </li>
          ))}
          <li>
            <a
              href="/#donate"
              className="group inline-flex items-center gap-1.5 rounded-md bg-mint px-5 py-2 font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-mint-ink transition-all duration-base ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-mint)]"
            >
              Donate
              <span
                aria-hidden="true"
                className="transition-transform duration-base ease-[var(--ease-spring)] group-hover:translate-x-0.5"
              >
                →
              </span>
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="p-2 text-fg md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 pt-16 md:hidden animate-fade-up"
          style={{
            background: "hsl(264 65% 5% / 0.97)",
            backdropFilter: "blur(20px)",
          }}
        >
          <ul className="flex flex-col items-center gap-6 pt-14">
            {NAV_SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "font-display text-3xl uppercase transition-colors duration-base",
                    active === s.id ? "text-mint" : "text-fg/80 hover:text-fg",
                  )}
                  style={{ fontWeight: 700, letterSpacing: "0.04em" }}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
