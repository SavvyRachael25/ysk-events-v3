import Reveal from "./Reveal";

/**
 * The Olympic band. Sits directly under the hero so the front page reads
 * as the Games first and YSK second.
 *
 * The LA28 mark is used under clearance held by YSK Events. It is rendered
 * unaltered, on white, with generous clear space, and is never composited
 * with other logos or overlaid with text, which is what every official mark
 * licence requires. Do not crop, recolour, or animate this element further.
 */
export default function OlympicBand() {
  return (
    <section
      aria-labelledby="olympic-band-heading"
      className="border-b border-border bg-paper-2 py-16 md:py-20"
    >
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-6 md:px-12 lg:grid-cols-12 lg:gap-16">
        {/* The mark, unaltered, on its own white field */}
        <Reveal className="lg:col-span-5">
          <div className="mx-auto flex max-w-[420px] items-center justify-center rounded-lg bg-white p-8 shadow-[var(--shadow-paper)] md:p-10">
            <video
              className="h-auto w-full"
              src="/event/la28-logo.mp4"
              poster="/event/la28-logo-poster.png"
              autoPlay
              muted
              loop
              playsInline
              aria-label="Los Angeles 2028 Olympic and Paralympic Games"
            />
          </div>
        </Reveal>

        {/* The claim */}
        <Reveal delay={140} className="lg:col-span-7">
          <div className="flex items-center gap-4">
            <span className="section-no">The Games</span>
            <span aria-hidden="true" className="rule-tricolor h-[3px] w-12" />
          </div>
          <h2
            id="olympic-band-heading"
            className="mt-5 font-display text-ink"
            style={{ fontSize: "var(--text-step-3)" }}
          >
            Squash joins the Olympic programme{" "}
            <span className="text-gold">for the first time.</span>
          </h2>
          <p className="body-copy mt-6 max-w-[620px]">
            After more than a century of the modern Games, squash makes its
            Olympic debut at Los Angeles 2028. The sport will be played at the
            Comcast Squash Center at Universal Studios. Before any of it
            happens, the final qualification event comes to Washington.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#road" className="btn-gold">
              The Road to LA
            </a>
            <a href="#history" className="btn-outline">
              Why YSK Events
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
