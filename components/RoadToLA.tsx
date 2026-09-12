import Image from "next/image";
import Reveal from "./Reveal";
import { QUALIFY } from "@/lib/content";

/**
 * "Where the world comes to qualify for the Olympics." —
 * copy left, ROAD TO LA lockup + ball splash right, per the mockup.
 */
export default function RoadToLA() {
  return (
    <section id="road" className="paper-grain relative bg-paper py-16 md:py-24">
      {/* Ghost numeral */}
      <span
        aria-hidden="true"
        className="ghost-type right-[-2%] top-10 hidden lg:block"
        style={{ fontSize: "clamp(10rem, 22vw, 20rem)" }}
      >
        2028
      </span>

      <div className="relative z-10 mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-14 px-6 md:px-12 lg:grid-cols-12 lg:gap-8">
        {/* LEFT: copy */}
        <Reveal className="lg:col-span-6">
          <div className="flex items-center gap-4">
            <span className="section-no">01</span>
            <span aria-hidden="true" className="rule-gold h-px w-8" />
            <p className="eyebrow">{QUALIFY.eyebrow}</p>
          </div>
          <h2 className="mt-5">
            <span
              className="block font-display text-ink"
              style={{ fontSize: "var(--text-step-3)" }}
            >
              {QUALIFY.headline}
            </span>
            <span
              className="block font-display text-gold"
              style={{ fontSize: "var(--text-step-3)" }}
            >
              {QUALIFY.headlineAccent}
            </span>
          </h2>
          <span aria-hidden="true" className="rule-gold mt-7 block w-14" />
          <p className="body-copy mt-7 max-w-[520px]">{QUALIFY.body}</p>
        </Reveal>

        {/* RIGHT: lockup + splash */}
        <div className="lg:col-span-6">
          <div className="grid grid-cols-5 items-center gap-6">
            {/* ROAD TO LA lockup */}
            <Reveal delay={120} className="col-span-2">
              <div className="flex flex-col items-center text-center">
                <span
                  className="font-lockup uppercase text-ink"
                  style={{ fontSize: "var(--text-step-2)", letterSpacing: "0.22em" }}
                >
                  Road
                </span>
                <span className="my-2 flex w-full items-center justify-center gap-3">
                  <span aria-hidden="true" className="rule-gold h-px w-8" />
                  <span
                    className="font-lockup uppercase text-ink"
                    style={{ fontSize: "var(--text-step-0)", letterSpacing: "0.3em" }}
                  >
                    to
                  </span>
                  <span aria-hidden="true" className="rule-gold h-px w-8" />
                </span>
                <span
                  className="font-display text-ink"
                  style={{ fontSize: "var(--text-step-5)", lineHeight: 0.95 }}
                >
                  LA
                </span>
              </div>
            </Reveal>

            {/* Ball splash */}
            <Reveal delay={240} as="figure" className="col-span-3">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={QUALIFY.image}
                  alt={QUALIFY.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 60vw, 32vw"
                  className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] hover:scale-[1.04]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
