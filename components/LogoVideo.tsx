"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The LA28 mark. Plays the supplied clip, but:
 * - renders the still instead when the visitor prefers reduced motion (WCAG 2.3.3)
 * - pauses when the site-wide "Pause motion" control is on (WCAG 2.2.2)
 * The mark itself is never cropped, recoloured, or overlaid.
 */
export default function LogoVideo({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setStill(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const sync = () => {
      if (document.documentElement.classList.contains("motion-paused")) v.pause();
      else v.play().catch(() => {});
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [still]);

  if (still) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/event/la28-logo-poster.png" alt="Los Angeles 2028 Olympic and Paralympic Games" className={className} />;
  }
  return (
    <video
      ref={ref}
      className={className}
      src="/event/la28-logo.mp4"
      poster="/event/la28-logo-poster.png"
      autoPlay
      muted
      loop
      playsInline
      aria-label="Los Angeles 2028 Olympic and Paralympic Games"
    >
      Los Angeles 2028 Olympic and Paralympic Games
    </video>
  );
}
