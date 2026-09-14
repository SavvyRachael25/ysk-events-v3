import Image from "next/image";
import { EVENT } from "@/lib/content";
import { EVENT_DEFINITION } from "@/lib/constants";

/**
 * Full-bleed hero in the la28.org pattern: photography edge to edge,
 * heavy white all-caps headline over a bottom scrim, solid black CTA.
 * Women and men side by side, both from the Bellevue World Tour Finals.
 * First impression in half a second: this is an Olympic qualifier.
 */
export default function Hero() {
  return (
    <section id="event" className="relative w-full overflow-hidden bg-black text-white lg:min-h-[88svh]">
      {/* LA28 emblem, the way la28.org places it: a white tab at the top-left of
          the hero, with the YSK Events emblem beside it as the presenter. The
          white field gives the LA28 mark its clear space; it is never set on
          the photo or resized out of proportion. A rule and the words
          "Presented by" keep the two marks read as host and presenter, not as
          one combined logo. On phones the tab becomes a full-width strip under
          the nav so it never covers a player. Requested by John, 2026-09-14. */}
      <div className="relative z-20 mt-16 flex w-full items-center justify-between gap-5 bg-white px-6 py-4 md:mt-[76px] lg:absolute lg:left-0 lg:top-[76px] lg:mt-0 lg:w-auto lg:justify-start lg:gap-8 lg:rounded-br-3xl lg:px-8 lg:py-6">
        <a
          href="https://la28.org"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Los Angeles 2028 Olympic Games"
          className="block shrink-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/event/la28-olympic-mark.png"
            alt="LA28 emblem with the Olympic rings"
            className="h-[72px] w-auto lg:h-[120px]"
            width={639}
            height={936}
          />
        </a>
        <span aria-hidden="true" className="hidden h-[72px] w-px shrink-0 bg-black/20 sm:block lg:h-[120px]" />
        <a href="/#history" className="flex shrink-0 items-center gap-3 lg:gap-4">
          <Image
            src="/ysk-logo.png"
            alt="YSK Events"
            width={1254}
            height={1254}
            priority
            sizes="96px"
            className="h-[60px] w-[60px] lg:h-[96px] lg:w-[96px]"
          />
          <span className="font-sans text-[10px] font-extrabold uppercase leading-tight tracking-[0.16em] text-black lg:text-[11px]">
            Presented<br />by<br />YSK Events
          </span>
        </a>
      </div>

      {/* Photography. Below lg the two players sit side by side in a fixed
          band at the top and the copy runs beneath on black, so both athletes
          are visible on a phone without the headline covering either of them.
          At lg and up the diptych goes full bleed behind the copy. */}
      <div className="relative grid h-[50svh] min-h-[340px] grid-cols-2 lg:absolute lg:inset-0 lg:h-auto lg:min-h-0">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 animate-ken-burns">
            <Image src={EVENT.image} alt={EVENT.imageAlt} fill priority sizes="50vw" className="object-cover object-[60%_center]" />
          </div>
        </div>
        <div className="relative overflow-hidden border-l-2 border-white/60">
          <div className="absolute inset-0 animate-ken-burns" style={{ animationDelay: "-9s" }}>
            <Image src={EVENT.imageSecondary} alt={EVENT.imageSecondaryAlt} fill priority sizes="50vw" className="object-cover object-[45%_center]" />
          </div>
        </div>

        {/* Scrim. On phones it only feathers the band into the black copy area
            below; on desktop it carries the type at the bottom of the frame. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{ background: "linear-gradient(180deg, rgb(0 0 0 / 0.35) 0%, rgb(0 0 0 / 0) 26%, rgb(0 0 0 / 0) 72%, rgb(0 0 0 / 0.9) 100%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ background: "linear-gradient(180deg, rgb(0 0 0 / 0.3) 0%, rgb(0 0 0 / 0.1) 30%, rgb(0 0 0 / 0.55) 55%, rgb(0 0 0 / 0.82) 78%, rgb(0 0 0 / 0.94) 100%)" }}
        />
      </div>

      {/* Copy */}
      <div className="relative z-10 flex flex-col px-6 pb-14 pt-10 md:px-12 md:pb-20 md:pt-12 lg:min-h-[88svh] lg:justify-end lg:px-20 lg:pt-[300px]">
        <p className="eyebrow !text-white animate-fade-up" style={{ animationDelay: "80ms" }}>
          {EVENT.kicker}
        </p>
        <h1 className="mt-5 max-w-[22ch]">
          <span className="block font-display animate-fade-up" style={{ fontSize: "clamp(2.6rem, 1.6rem + 4vw, 5rem)", animationDelay: "200ms" }}>
            {EVENT.headlineTop}
          </span>
          <span className="block font-display animate-fade-up" style={{ fontSize: "clamp(2.6rem, 1.6rem + 4vw, 5rem)", animationDelay: "320ms" }}>
            {EVENT.headlineAccent}
          </span>
        </h1>
        <p className="mt-6 font-sans text-base font-700 uppercase tracking-[0.1em] text-white/90 animate-fade-up" style={{ fontWeight: 700, animationDelay: "440ms" }}>
          <span className="block sm:inline">{EVENT.location}</span>
          <span aria-hidden="true" className="mx-3 hidden opacity-50 sm:inline">|</span>
          <span className="block sm:inline">{EVENT.date}</span>
          <span aria-hidden="true" className="mx-3 hidden opacity-50 sm:inline">|</span>
          <span className="block sm:inline">Presented by YSK Events</span>
        </p>
        <p className="mt-5 max-w-[62ch] font-sans text-[15px] leading-relaxed text-white/85 animate-fade-up md:text-base" style={{ animationDelay: "500ms" }}>
          {EVENT_DEFINITION}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "560ms" }}>
          <a href={EVENT.ctaPrimary.href} className="btn-gold !bg-white !text-black hover:!bg-la-blue hover:!text-white">
            {EVENT.ctaPrimary.label}
          </a>
          <a href={EVENT.ctaSecondary.href} className="btn-outline-light">
            {EVENT.ctaSecondary.label}
          </a>
        </div>
        <p className="mt-8 font-sans text-[11px] uppercase tracking-[0.12em] text-white/60 animate-fade-up" style={{ fontWeight: 700, animationDelay: "700ms" }}>
          Photos: PSA World Tour Finals, Bellevue, June 2024
        </p>
      </div>
    </section>
  );
}
