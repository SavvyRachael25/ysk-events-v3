import Image from "next/image";
import { EVENT } from "@/lib/content";

/**
 * Full-bleed hero in the la28.org pattern: photography edge to edge,
 * heavy white all-caps headline over a bottom scrim, solid black CTA.
 * Women and men side by side, both from the Bellevue World Tour Finals.
 * First impression in half a second: this is an Olympic qualifier.
 */
export default function Hero() {
  return (
    <section id="event" className="relative min-h-[100svh] w-full overflow-hidden bg-black text-white">
      {/* Photography */}
      <div className="absolute inset-0 grid grid-cols-2">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 animate-ken-burns">
            <Image src={EVENT.image} alt={EVENT.imageAlt} fill priority sizes="50vw" className="object-cover" />
          </div>
        </div>
        <div className="relative overflow-hidden border-l-2 border-white/60">
          <div className="absolute inset-0 animate-ken-burns" style={{ animationDelay: "-9s" }}>
            <Image src={EVENT.imageSecondary} alt={EVENT.imageSecondaryAlt} fill priority sizes="50vw" className="object-cover" />
          </div>
        </div>
      </div>

      {/* Scrim: photo stays vivid up top, type stays legible at the bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgb(0 0 0 / 0.25) 0%, rgb(0 0 0 / 0) 35%, rgb(0 0 0 / 0.72) 78%, rgb(0 0 0 / 0.9) 100%)" }}
      />

      {/* Copy */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-14 pt-32 md:px-12 md:pb-20 lg:px-20">
        <p className="eyebrow !text-white animate-fade-up" style={{ animationDelay: "80ms" }}>
          {EVENT.kicker}
        </p>
        <h1 className="mt-5 max-w-[14ch]">
          <span className="block font-display animate-fade-up" style={{ fontSize: "var(--text-step-5)", animationDelay: "200ms" }}>
            {EVENT.headlineTop}
          </span>
          <span className="block font-display animate-fade-up" style={{ fontSize: "var(--text-step-5)", animationDelay: "320ms" }}>
            {EVENT.headlineAccent}
          </span>
        </h1>
        <p className="mt-6 font-sans text-base font-700 uppercase tracking-[0.1em] text-white/90 animate-fade-up" style={{ fontWeight: 700, animationDelay: "440ms" }}>
          {EVENT.location} <span aria-hidden="true" className="mx-3 opacity-50">|</span> {EVENT.date}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "560ms" }}>
          <a href={EVENT.ctaPrimary.href} className="btn-gold !bg-white !text-black hover:!bg-la-blue hover:!text-white">
            {EVENT.ctaPrimary.label}
          </a>
          <a href={EVENT.ctaSecondary.href} className="btn-outline-light">
            {EVENT.ctaSecondary.label}
          </a>
        </div>
        <p className="mt-10 font-sans text-[11px] font-700 uppercase tracking-[0.16em] text-white/60 animate-fade-up" style={{ fontWeight: 700, animationDelay: "700ms" }}>
          Presented by YSK Events, a 501(c)(3) nonprofit
        </p>
      </div>
    </section>
  );
}
