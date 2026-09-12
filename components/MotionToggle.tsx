"use client";

import { useEffect, useState } from "react";

/**
 * Site-wide pause for auto-playing motion: ribbon drift, ticker, Ken Burns,
 * and the mark video. WCAG 2.2.2 asks for this on anything that moves longer
 * than five seconds beside other content. Remembered per browser.
 */
export default function MotionToggle() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let saved = false;
    try { saved = localStorage.getItem("ysk-motion") === "paused"; } catch {}
    setPaused(saved);
    document.documentElement.classList.toggle("motion-paused", saved);
  }, []);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    document.documentElement.classList.toggle("motion-paused", next);
    try { localStorage.setItem("ysk-motion", next ? "paused" : "playing"); } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      className="inline-flex cursor-pointer items-center gap-2 border border-paper/30 px-3 py-1.5 font-sans text-[11px] font-bold uppercase tracking-[0.08em] text-paper/70 transition-colors duration-200 hover:border-white hover:text-white"
    >
      <span aria-hidden="true" className="inline-block h-2 w-2 bg-la-green" style={{ opacity: paused ? 0.35 : 1 }} />
      {paused ? "Resume motion" : "Pause motion"}
    </button>
  );
}
