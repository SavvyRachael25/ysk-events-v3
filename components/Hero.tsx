import Image from "next/image";
import { EVENT } from "@/lib/content";
import { EVENT_DEFINITION } from "@/lib/constants";

/**
 * Full-bleed hero in the la28.org pattern: photography edge to edge,
 * heavy white all-caps headline over a bottom scrim, solid black CTA.
 * Women and men side by side, both from the Bellevue World Tour Finals.
 * First impression in half a second: this is an Olympic qualifier.
 */
export default function Hero({ mode = "scene", flush = false }: { mode?: "scene" | "diptych"; flush?: boolean } = {}) {
  const kickerParts = EVENT.kicker.split(" · ");
  // Scene mode: a wide Pacific Northwest photo behind the copy, with the
  // athletes as named cards. Diptych mode is the two-athlete layout.
  const single = mode === "scene" ? EVENT.scene : null;
  const athletes = EVENT.athletes;
  return (
    <section id="event" className="relative w-full overflow-hidden bg-ink text-white lg:min-h-[88svh]">
      {/* LA28 emblem, the way la28.org places it: a white tab at the top-left of
          the hero. The white field gives the mark its clear space; it is never
          set directly on the photo, never resized out of proportion, and never
          combined with another logo in the same tab. On phones the tab becomes
          a full-width white strip under the nav so it never covers a player.
          Requested by John, 2026-09-14. */}
      <a
        href="https://la28.org"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Los Angeles 2028 Olympic Games"
        className={`relative z-20 block w-full bg-white px-6 py-4 lg:absolute lg:left-0 lg:mt-0 lg:w-auto lg:rounded-br-3xl lg:px-8 lg:py-6 ${flush ? "mt-0 lg:top-0" : "mt-16 md:mt-[76px] lg:top-[76px]"}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/event/la28-olympic-mark.svg"
          alt="LA28 emblem with the Olympic rings"
          className="h-[72px] w-auto lg:h-[120px]"
          width={682}
          height={1000}
        />
      </a>

      {/* Photography. Below lg the two players sit side by side in a fixed
          band at the top and the copy runs beneath on black, so both athletes
          are visible on a phone without the headline covering either of them.
          At lg and up the diptych goes full bleed behind the copy. */}
      <div className={`relative grid h-[50svh] min-h-[340px] lg:absolute lg:inset-0 lg:h-auto lg:min-h-0 ${single ? "grid-cols-1" : "grid-cols-2"}`}>
        {single ? (
          <div className="relative overflow-hidden">
            <Image src={single.src} alt={single.alt} fill priority sizes="100vw" className="object-cover object-[50%_40%]" />
          </div>
        ) : (<>
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 origin-[18%_60%] scale-[1.12] lg:scale-[1.5]">
            <div className="absolute inset-0 animate-ken-burns">
              <Image src={EVENT.image} alt={EVENT.imageAlt} fill priority sizes="50vw" className="object-cover object-[50%_55%]" />
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden border-l-2 border-white/60">
          <div className="absolute inset-0 origin-[75%_45%] scale-[1.12] lg:scale-[1.3]">
            <div className="absolute inset-0 animate-ken-burns" style={{ animationDelay: "-9s" }}>
              <Image src={EVENT.imageSecondary} alt={EVENT.imageSecondaryAlt} fill priority sizes="50vw" className="object-cover object-[50%_45%]" />
            </div>
          </div>
        </div>
        </>)}

        {/* Scrim. On phones it only feathers the band into the black copy area
            below; on desktop it carries the type at the bottom of the frame. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 lg:hidden"
          style={{ background: "linear-gradient(180deg, rgb(var(--scrim-rgb) / 0.35) 0%, rgb(var(--scrim-rgb) / 0) 26%, rgb(var(--scrim-rgb) / 0) 72%, rgb(var(--scrim-rgb) / 0.9) 100%)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden lg:block"
          style={{ background: "linear-gradient(180deg, rgb(var(--scrim-rgb) / 0.3) 0%, rgb(var(--scrim-rgb) / 0.1) 30%, rgb(var(--scrim-rgb) / 0.55) 55%, rgb(var(--scrim-rgb) / 0.82) 78%, rgb(var(--scrim-rgb) / 0.94) 100%)" }}
        />
      </div>

      {/* Copy */}
      <div className={`relative z-10 flex flex-col px-6 pb-10 pt-8 md:px-12 md:pb-16 md:pt-12 lg:min-h-[88svh] lg:max-w-[64%] lg:justify-end lg:px-20 lg:pb-20 ${flush ? "lg:pt-[200px]" : "lg:pt-[270px]"}`}>
        <p className="eyebrow !text-white animate-fade-up flex items-start gap-3" style={{ animationDelay: "80ms" }}>
          <span aria-hidden="true" className="mt-[6px] block h-[3px] w-6 shrink-0" style={{ background: "var(--color-cta)" }} />
          <span>{kickerParts.map((part, i) => (
            <span key={part}>
              {i > 0 && <span aria-hidden="true" className="hidden sm:inline"> · </span>}
              {i > 0 && <br className="sm:hidden" />}
              {part}
            </span>
          ))}</span>
        </p>
        <h1 className="mt-5 max-w-[18ch] font-display" style={{ fontSize: "clamp(2.6rem, 1.3rem + 3.9vw, 4.9rem)", lineHeight: 1.0 }}>
          <span className="block animate-fade-up" style={{ animationDelay: "200ms" }}>
            {EVENT.headlineTop}
          </span>
          <span className="block animate-fade-up" style={{ animationDelay: "320ms", color: "var(--color-headline-accent)" }}>
            {EVENT.headlineAccent}
          </span>
        </h1>
        <p className="mt-6 font-sans text-base font-700 uppercase tracking-[0.1em] text-white/90 animate-fade-up" style={{ fontWeight: 700, animationDelay: "440ms" }}>
          <span className="block whitespace-nowrap sm:inline">{EVENT.location}</span>
          <span aria-hidden="true" className="mx-3 hidden opacity-50 sm:inline">|</span>
          <span className="block whitespace-nowrap sm:inline">{EVENT.date}</span>
          <span aria-hidden="true" className="mx-3 hidden opacity-50 sm:inline">|</span>
          <span className="block whitespace-nowrap sm:inline">Presented by YSK Events</span>
        </p>
        <p className={`mt-5 max-w-[62ch] font-sans text-[15px] leading-relaxed text-white/85 animate-fade-up md:text-base ${single ? "hidden" : "hidden md:block"}`} style={{ animationDelay: "500ms" }}>
          {EVENT_DEFINITION}
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4 animate-fade-up" style={{ animationDelay: "560ms" }}>
          <a href={EVENT.ctaPrimary.href} className="btn-gold !bg-cta !text-white hover:!bg-white hover:!text-black">
            {EVENT.ctaPrimary.label}
          </a>
          <a href={EVENT.ctaSecondary.href} className="btn-outline-light">
            {EVENT.ctaSecondary.label}
          </a>
        </div>
        <p className="mt-8 max-w-[62ch] font-sans text-[11px] uppercase tracking-[0.12em] text-white/60 animate-fade-up" style={{ fontWeight: 700, animationDelay: "700ms" }}>
          {single?.credit || "Photos: PSA World Tour Finals, Bellevue, June 2024"}
        </p>
      </div>

      {/* Athlete cards. On desktop they sit on the court floor at the right of
          the scene; on phones they run as a strip between the photo band and
          the copy. Name and ranking are optional: leave them blank in the
          content file and the card runs as a photo with no caption. */}
      {single && athletes.length > 0 && (
        <div className="relative z-10 px-6 pb-2 md:px-12 lg:absolute lg:bottom-16 lg:right-16 lg:z-20 lg:w-auto lg:px-0 lg:pb-0">
          <p className="eyebrow !text-white/80 mb-4 lg:text-right">{EVENT.athletesEyebrow}</p>
          <ul className="flex gap-4 lg:gap-5">
            {athletes.map((a, i) => (
              <li key={a.image || i} className="group w-1/2 max-w-[220px] lg:w-[168px]">
                <div className="relative aspect-[3/4] overflow-hidden border-2 border-white/90 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5" style={{ boxShadow: "0 24px 48px -20px rgb(16 40 34 / 0.6)" }}>
                  {a.image ? (
                    <Image src={a.image} alt={a.alt} fill sizes="(max-width: 1024px) 45vw, 168px" className={`object-cover ${i === 0 ? "object-[62%_30%]" : "object-[50%_20%]"}`} />
                  ) : (
                    /* No photo yet: an honest placeholder rather than a stand-in. */
                    <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center" style={{ background: "rgb(16 40 34 / 0.85)" }}>
                      <span aria-hidden="true" className="h-[3px] w-6" style={{ background: "var(--color-headline-accent)" }} />
                      <span className="font-sans text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/85">Awaiting photo</span>
                    </div>
                  )}
                </div>
                {a.name && <p className="mt-3 font-sans text-[13px] font-extrabold uppercase tracking-[0.08em] text-white">{a.name}</p>}
                {a.title && <p className="font-sans text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--color-headline-accent)" }}>{a.title}</p>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
