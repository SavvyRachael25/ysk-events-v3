import Image from "next/image";
import Reveal from "./Reveal";
import { HISTORY, HISTORY_PROOF, TIMELINE } from "@/lib/content";

/**
 * "A history of making squash matter." — copy + proof points left,
 * athlete image right, then the event timeline strip below.
 */
export default function History() {
  return (
    <section id="history" className="paper-grain relative bg-paper py-24 md:py-36">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* LEFT: copy + proof */}
          <Reveal className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="section-no">03</span>
              <span aria-hidden="true" className="rule-gold h-px w-8" />
              <p className="eyebrow-quiet">{HISTORY.eyebrow}</p>
            </div>
            <h2 className="mt-5">
              <span
                className="block font-display text-ink"
                style={{ fontSize: "var(--text-step-3)" }}
              >
                {HISTORY.headline}
              </span>
              <span
                className="block font-display text-gold"
                style={{ fontSize: "var(--text-step-3)" }}
              >
                {HISTORY.headlineAccent}
              </span>
            </h2>
            <span aria-hidden="true" className="rule-gold mt-7 block w-14" />
            <p className="body-copy mt-7 max-w-[480px]">{HISTORY.body}</p>

            {/* Proof points */}
            <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-border pt-8">
              {HISTORY_PROOF.map((stat) => (
                <div key={stat.label}>
                  <dt
                    className="font-lockup text-gold"
                    style={{ fontSize: "var(--text-step-2)", lineHeight: 1 }}
                  >
                    {stat.value}
                  </dt>
                  <dd className="mt-2 font-sans text-xs leading-relaxed text-ink-faint">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* RIGHT: athlete */}
          <Reveal delay={160} as="figure" className="lg:col-span-7">
            <div className="img-frame relative aspect-[16/10] overflow-hidden rounded-lg shadow-[var(--shadow-lift)]">
              <Image
                src={HISTORY.image}
                alt={HISTORY.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* Timeline */}
        <Reveal className="mt-24">
          <div className="flex items-center gap-4">
            <span className="eyebrow">The road so far</span>
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
          </div>
          <ol className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {TIMELINE.map((item, i) => (
              <li key={item.year} className="relative">
                {/* Connector rule on desktop */}
                {i < TIMELINE.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[7px] hidden h-px w-full bg-border lg:block"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="relative z-10 block h-[15px] w-[15px] rounded-full border-2 border-gold bg-paper"
                />
                <p
                  className="mt-4 font-lockup text-gold"
                  style={{ fontSize: "1.35rem", lineHeight: 1 }}
                >
                  {item.year}
                </p>
                <h3 className="mt-2 font-sans text-[13px] font-bold uppercase tracking-[0.12em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 font-sans text-[13px] leading-relaxed text-ink-faint">
                  {item.desc}
                </p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
