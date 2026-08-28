import Image from "next/image";
import Countdown from "./Countdown";
import { EVENT } from "@/lib/content";
import heroImage from "@/public/event/hero-glass-court.jpg";

/**
 * Split hero, per Shabana's mockup: editorial copy block on ivory (left),
 * glass court over the skyline (right), thin gold rules for structure.
 */
export default function Hero() {
  return (
    <section
      id="event"
      className="paper-grain relative overflow-hidden bg-paper"
    >
      <div className="mx-auto grid min-h-[100svh] max-w-[1440px] grid-cols-1 items-stretch lg:grid-cols-12">
        {/* LEFT: copy */}
        <div className="relative z-10 flex flex-col justify-center px-6 pt-28 pb-12 md:px-12 lg:col-span-5 lg:py-24 lg:pr-10 lg:pl-16">
          {/* Kicker */}
          <p
            className="eyebrow-quiet animate-fade-up"
            style={{ animationDelay: "80ms" }}
          >
            {EVENT.kicker}
          </p>

          {/* Headline */}
          <h1 className="mt-6">
            <span
              className="block font-display text-ink animate-fade-up lg:whitespace-nowrap"
              style={{
                fontSize: "var(--text-step-4)",
                animationDelay: "200ms",
              }}
            >
              {EVENT.headlineTop}
            </span>
            <span
              className="block font-display text-gold animate-fade-up"
              style={{
                fontSize: "var(--text-step-4)",
                textWrap: "balance",
                animationDelay: "340ms",
              }}
            >
              {EVENT.headlineAccent}
            </span>
          </h1>

          {/* Location · date rule */}
          <div
            className="mt-8 flex items-center gap-4 animate-fade-up"
            style={{ animationDelay: "480ms" }}
          >
            <span
              className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink"
            >
              {EVENT.location}
            </span>
            <span aria-hidden="true" className="h-4 w-px bg-border-strong" />
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              {EVENT.date}
            </span>
          </div>

          <span
            aria-hidden="true"
            className="rule-gold mt-8 w-14 animate-draw-line"
            style={{ animationDelay: "560ms" }}
          />

          {/* Three lines */}
          <div
            className="mt-8 space-y-1 animate-fade-up"
            style={{ animationDelay: "640ms" }}
          >
            {EVENT.lines.map((line) => (
              <p
                key={line}
                className="font-lockup text-ink-soft"
                style={{ fontSize: "var(--text-step-1)", lineHeight: 1.5 }}
              >
                {line}
              </p>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="mt-10 flex flex-wrap items-center gap-4 animate-fade-up"
            style={{ animationDelay: "780ms" }}
          >
            <a href={EVENT.ctaPrimary.href} className="btn-gold">
              {EVENT.ctaPrimary.label}
            </a>
            <a href={EVENT.ctaSecondary.href} className="btn-outline">
              {EVENT.ctaSecondary.label}
            </a>
          </div>

          {/* Countdown */}
          <div
            className="mt-10 animate-fade-up"
            style={{ animationDelay: "920ms" }}
          >
            <Countdown />
          </div>
        </div>

        {/* RIGHT: glass court image */}
        <div className="relative min-h-[46vh] overflow-hidden lg:col-span-7 lg:min-h-0">
          <div className="img-frame absolute inset-0 z-10" aria-hidden="true" />
          <div className="absolute inset-0 animate-ken-burns">
            <Image
              src={heroImage}
              alt="All-glass squash show court against the Bellevue skyline"
              fill
              priority
              placeholder="blur"
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
          </div>
          {/* Ivory feather into the copy column */}
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, hsl(42 33% 95%) 0%, hsl(42 33% 95% / 0) 18%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-24 lg:hidden"
            style={{
              background:
                "linear-gradient(180deg, hsl(42 33% 95%) 0%, hsl(42 33% 95% / 0) 100%)",
            }}
          />
        </div>
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="eyebrow-quiet !tracking-[0.32em]">Scroll</span>
        <span className="animate-bounce-down text-gold">↓</span>
      </div>
    </section>
  );
}
