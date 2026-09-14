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
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setStill(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // The clip is 1.9 MB. Do not fetch it until the band is about to scroll into view.
  useEffect(() => {
    const v = ref.current;
    if (!v || inView) return;
    if (!("IntersectionObserver" in window)) { setInView(true); return; }
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { setInView(true); io.disconnect(); }
    }, { rootMargin: "400px 0px" });
    io.observe(v);
    return () => io.disconnect();
  }, [inView, still]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !inView) return;
    const sync = () => {
      if (document.documentElement.classList.contains("motion-paused")) v.pause();
      else v.play().catch(() => {});
    };
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, [still, inView]);

  if (still) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src="/event/la28-logo-poster.webp" width={1258} height={940} alt="Los Angeles 2028 Olympic and Paralympic Games" className={className} />;
  }
  return (
    <video
      ref={ref}
      className={className}
      src={inView ? "/event/la28-logo.mp4" : undefined}
      poster="/event/la28-logo-poster.webp"
      preload="none"
      width={1258}
      height={940}
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
