import Image from "next/image";
import Reveal from "./Reveal";
import { CITIES } from "@/lib/content";

/**
 * "From Bellevue to Seattle to LA" — three city cards joined by
 * gold chevrons, per the mockup.
 */
export default function Cities() {
  return (
    <section id="cities" className="bg-paper-2 py-24 md:py-36">
      <div className="mx-auto max-w-[1280px] px-6 md:px-12">
        {/* Section header */}
        <Reveal className="text-center">
          <div className="mb-5 flex items-center justify-center gap-4">
            <span className="section-no">02</span>
            <span aria-hidden="true" className="rule-gold h-px w-8" />
            <span className="eyebrow-quiet">The Journey</span>
          </div>
          <h2
            className="font-display text-ink"
            style={{ fontSize: "var(--text-step-2)" }}
          >
            From <span className="text-gold">Bellevue</span> to Seattle to{" "}
            <span className="text-gold">LA</span>
          </h2>
          <span
            aria-hidden="true"
            className="rule-tricolor mx-auto mt-6 block w-20"
          />
        </Reveal>

        {/* Cards — joined by the journey line */}
        <div className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0">
          {/* Connecting line behind the cards */}
          <span
            aria-hidden="true"
            className="rule-tricolor absolute left-[8%] right-[8%] top-[104px] hidden md:block"
          />
          {CITIES.map((city, i) => (
            <Reveal
              key={city.name}
              delay={i * 140}
              className="relative md:px-4"
            >
              {/* Chevron connector (between cards, desktop only) */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  className="absolute -left-2.5 top-[92px] z-10 hidden font-lockup text-2xl text-gold md:block"
                >
                  ›
                </span>
              )}

              <figure className="group">
                <div className="img-frame relative aspect-[4/3] overflow-hidden rounded-lg shadow-[var(--shadow-paper)] transition-shadow duration-500 ease-[var(--ease-out-expo)] group-hover:shadow-[var(--shadow-lift)]">
                  <Image
                    src={city.image}
                    alt={city.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                  {/* Bottom scrim */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/2"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 0%, hsl(24 12% 10% / 0.55) 100%)",
                    }}
                  />
                </div>

                <figcaption className="mt-6">
                  <div className="flex items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 font-lockup text-sm text-gold"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="font-display text-ink"
                      style={{ fontSize: "1.05rem", letterSpacing: "0.14em" }}
                    >
                      {city.name}
                    </h3>
                  </div>
                  <p className="mt-3 font-lockup italic text-gold" style={{ fontSize: "1.05rem" }}>
                    {city.tagline}
                  </p>
                  <p className="body-copy mt-2 text-sm">{city.desc}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
