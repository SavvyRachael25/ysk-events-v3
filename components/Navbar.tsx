"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { NAV_SECTIONS } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Official YSK Events emblem. Dark circle needs no extra treatment on ivory. */
function Wordmark({ className }: { className?: string }) {
  return (
    <Image
      src="/ysk-logo.png"
      alt="YSK Events"
      width={1254}
      height={1254}
      priority
      className={cn("h-11 w-11 md:h-12 md:w-12", className)}
    />
  );
}

export default function Navbar() {
  const [active, setActive] = useState("event");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      if (window.location.pathname !== "/") { setActive(""); return; }
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
          background: scrolled
            ? "rgb(0 0 0 / 0.96)"
            : "linear-gradient(180deg, rgb(0 0 0 / 0.6) 0%, rgb(0 0 0 / 0) 100%)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgb(255 255 255 / 0.12)"
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
                  "group relative font-sans text-[13px] font-extrabold uppercase tracking-[0.06em] transition-colors duration-300",
                  active === s.id
                    ? "text-la-cyan"
                    : "text-white/80 hover:text-white",
                )}
              >
                {s.label}
                <span
                  className={cn(
                    "absolute -bottom-1.5 left-0 h-px w-full origin-left bg-la-cyan transition-transform duration-300 ease-[var(--ease-out-expo)]",
                    active === s.id
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </a>
            </li>
          ))}
          <li>
            <a href="/sponsors" className="btn-gold !bg-white !px-5 !py-2.5 !text-black hover:!bg-la-blue hover:!text-white">
              Partner With Us
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          className="p-2 text-white md:hidden"
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
            background: "rgb(0 0 0 / 0.98)",
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
                    active === s.id ? "text-la-cyan" : "text-white hover:text-la-cyan",
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
