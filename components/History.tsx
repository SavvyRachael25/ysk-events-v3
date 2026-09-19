import Image from "next/image";
import Reveal from "./Reveal";
import { HISTORY, HISTORY_PROOF, TIMELINE } from "@/lib/content";

/**
 * "A history of making squash matter." — copy + proof points left,
 * athlete image right, then the event timeline strip below.
 */
const ICON_FILE: Record<string, string> = { "2021 to 2023": "2021-2023" };

export default function History({ icons = true }: { icons?: boolean } = {}) {
  return (
    <section id="history" className="paper-grain relative py-16 md:py-24" style={{ background: "var(--color-surface-history)" }}>
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
                  <dd className="mt-2 font-sans text-[13px] leading-relaxed text-ink-faint">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* RIGHT: Yusuf Khan, front row at the 2015 Worlds */}
          <Reveal delay={160} as="figure" className="lg:col-span-7">
            <div className="relative mx-auto aspect-[4/5] max-w-[520px] overflow-hidden border-2 border-black lg:ml-auto lg:mr-0">
              <Image
                src={HISTORY.image}
                alt={HISTORY.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 520px"
                className="object-cover"
              />
            </div>
            <figcaption className="mx-auto mt-4 max-w-[520px] lg:ml-auto lg:mr-0">
              <p className="font-sans text-[13px] font-extrabold uppercase tracking-[0.12em] text-ink">Yusuf Khan</p>
              <p className="font-sans text-[13px] leading-relaxed text-ink-faint">Front row at the 2015 Men's World Championship in Bellevue, the event he brought to the Pacific Northwest.</p>
            </figcaption>
          </Reveal>
        </div>

        {/* Timeline */}
        <Reveal className="mt-24">
          <div className="flex items-center gap-4">
            <span className="eyebrow">The road so far</span>
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
          </div>
          <ol className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-5">
            {TIMELINE.map((item, i) => (
              <li key={item.year} className="relative">
                {/* Connector rule on desktop */}
                {i < TIMELINE.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-[1px] hidden h-[2px] w-full bg-black/15 lg:block"
                  />
                )}
                <span
                  aria-hidden="true"
                  className="relative z-10 block h-1 w-10 bg-black"
                />
                {icons && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/pacific/icons/${ICON_FILE[item.year] ?? item.year}.png`} alt="" width={512} height={512} className="mt-5 h-16 w-16" />
                )}
                <p
                  className="mt-4 font-lockup text-gold"
                  style={{ fontSize: "1.35rem", lineHeight: 1 }}
                >
                  {item.year}
                </p>
                <h3 className="mt-2 font-sans text-[13px] font-bold uppercase tracking-[0.12em] text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 font-sans text-[15px] leading-relaxed text-ink-faint">
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
