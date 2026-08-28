"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAV_SECTIONS } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Inline wordmark — editorial serif, no external image dependency */
function Wordmark({ className }: { className?: string }) {
  return (
    <span
      className={cn("inline-flex flex-col items-start leading-none", className)}
      aria-label="YSK Events"
    >
      <span
        className="font-display text-ink"
        style={{ fontSize: "1.35rem", letterSpacing: "0.12em" }}
      >
        YSK
      </span>
      <span
        className="mt-[3px] text-[8px] font-semibold uppercase text-gold"
        style={{ letterSpacing: "0.42em", fontFamily: "var(--font-sans)" }}
      >
        Events
      </span>
    </span>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("event");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      let cur = "event";
      for (const s of NAV_SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && window.scrollY >= el.offsetTop - 140) cur = s.id;
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
        className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between px-6 transition-all duration-300 ease-[var(--ease-out-expo)] md:h-[76px] md:px-10"
        style={{
          background: scrolled ? "hsl(42 33% 95% / 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(16px) saturate(1.1)" : "none",
          borderBottom: scrolled
            ? "1px solid hsl(34 18% 82%)"
            : "1px solid transparent",
        }}
      >
        <a href="/#event" className="group flex items-center">
          <Wordmark />
        </a>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_SECTIONS.filter((s) => s.id !== "partner").map((s) => (
            <li key={s.id}>
              <a
                href={s.href}
                className={cn(
                  "group relative font-sans text-[10.5px] font-semibold uppercase tracking-[0.22em] transition-colors duration-300",
                  active === s.id
                    ? "text-gold"
                    : "text-ink-soft hover:text-ink",
                )}
              >
                {s.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-gold transition-transform duration-300 ease-[var(--ease-out-expo)]",
                    active === s.id
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </a>
            </li>
          ))}
          <li>
            <a href="/#partner" className="btn-gold !px-5 !py-2.5">
              Partner With Us
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="p-2 text-ink md:hidden"
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
            background: "hsl(42 33% 95% / 0.98)",
            backdropFilter: "blur(20px)",
          }}
        >
          <ul className="flex flex-col items-center gap-7 pt-14">
            {NAV_SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={s.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    "font-display text-2xl transition-colors duration-300",
                    active === s.id ? "text-gold" : "text-ink hover:text-gold",
                  )}
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
