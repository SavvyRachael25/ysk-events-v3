import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ribbon from "@/components/Ribbon";
import Reveal from "@/components/Reveal";
import Countdown from "@/components/Countdown";
import KeepMePostedForm from "@/components/KeepMePostedForm";
import { HEADLINE_EVENT, ROAD, RECORD } from "@/lib/events";
import { SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Events",
  description: "YSK Events calendar: the Final Olympic Qualifier for Squash in June 2028, the events on the road there, and the record since 2014.",
  alternates: { canonical: "/events" },
  robots: { index: false, follow: false }, // mock: unlisted until dates are real
};

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Events", url: `${SITE_URL}/events` },
]);

const STATUS: Record<string, { label: string; cls: string }> = {
  announced: { label: "Announced", cls: "bg-[#d8ee63] text-[#102822]" },
  planned: { label: "Planned", cls: "bg-[#1b5b70] text-white" },
  past: { label: "Past", cls: "bg-[#ebdcc5] text-[#102822]" },
};

export default function EventsPage() {
  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />
      <Navbar />
      <main id="main" className="flex-1 pt-16 md:pt-[76px]">
        {/* Mock banner */}
        <div className="border-b-2 border-black bg-[#fde7f3] px-6 py-2 text-center font-sans text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#102822]">
          Mockup for review · dates marked placeholder are not real
        </div>

        {/* 1. The big one */}
        <section className="relative overflow-hidden bg-ink text-white">
          <div className="absolute inset-0">
            <Image src={HEADLINE_EVENT.image} alt="" fill priority sizes="100vw" className="object-cover object-[50%_40%]" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgb(18 61 50 / 0.92) 0%, rgb(18 61 50 / 0.7) 50%, rgb(18 61 50 / 0.3) 100%)" }} />
          </div>
          <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-6 py-20 md:px-12 md:py-28 lg:grid-cols-12 lg:px-20">
            <div className="lg:col-span-7">
              <p className="eyebrow !text-white">Events · the big one</p>
              <h1 className="mt-4 max-w-[16ch] font-display" style={{ fontSize: "var(--text-step-4)", lineHeight: 1 }}>
                {HEADLINE_EVENT.title.replace("The Final Olympic ", "The Final Olympic ")}
              </h1>
              <p className="mt-6 font-sans text-base font-bold uppercase tracking-[0.1em] text-white/90">{HEADLINE_EVENT.when} · {HEADLINE_EVENT.where}</p>
              <p className="mt-5 max-w-[56ch] font-sans text-[15px] leading-relaxed text-white/85 md:text-base">{HEADLINE_EVENT.blurb}</p>
              <div className="mt-8 [&_*]:!text-white"><Countdown /></div>
            </div>
            <div className="lg:col-span-5">
              <div className="border-2 border-white/80 bg-[#102822]/70 p-6 backdrop-blur-sm md:p-8">
                <p className="eyebrow !text-[#d8ee63]">Venue and tickets</p>
                <p className="mt-2 font-display text-white" style={{ fontSize: "var(--text-step-2)" }}>Hear it first.</p>
                <p className="mt-2 font-sans text-[14px] text-white/80">One email when there is news. Nothing else, never sold.</p>
                <div className="mt-5 [&_label]:!text-white [&_input]:border-white/80 [&_.btn-gold]:w-full">
                  <KeepMePostedForm />
                </div>
              </div>
            </div>
          </div>
        </section>

        <Ribbon />

        {/* 2. The road there */}
        <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20" style={{ background: "var(--color-paper)" }}>
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <p className="eyebrow">The road there</p>
              <h2 className="mt-4 font-display text-ink" style={{ fontSize: "var(--text-step-3)" }}>
                What YSK runs between now <span className="text-gold">and June 2028.</span>
              </h2>
            </Reveal>
            <ol className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {ROAD.map((e, i) => (
                <Reveal key={e.slug} delay={i * 120} as="li" className="flex flex-col border-2 border-black bg-white p-7">
                  <div className="flex items-start justify-between gap-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {e.icon && <img src={`/pacific/icons/${e.icon}.png`} alt="" width={512} height={512} className="h-14 w-14" />}
                    <span className={`px-2.5 py-1 font-sans text-[10px] font-extrabold uppercase tracking-[0.16em] ${STATUS[e.status].cls}`}>{STATUS[e.status].label}</span>
                  </div>
                  <h3 className="mt-5 font-display text-ink" style={{ fontSize: "var(--text-step-2)", lineHeight: 1.1 }}>{e.title}</h3>
                  <p className="mt-3 font-sans text-[13px] font-extrabold uppercase tracking-[0.1em]" style={{ color: "#1b5b70" }}>
                    {e.when}{e.mock && <span className="ml-2 bg-[#fde7f3] px-1.5 py-0.5 text-[9px] text-[#ff018f]">Placeholder</span>}
                  </p>
                  <p className="font-sans text-[13px] text-ink-faint">{e.where}</p>
                  <p className="body-copy mt-4 flex-1 text-[15px]">{e.blurb}</p>
                  {e.cta ? (
                    <a href={e.cta.href} className="btn-gold mt-6 w-fit">{e.cta.label}</a>
                  ) : (
                    <span className="btn-outline mt-6 w-fit cursor-default opacity-60">Registration opens later</span>
                  )}
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* 3. The record */}
        <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20" style={{ background: "#ebdcc5" }}>
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <p className="eyebrow">The record</p>
              <h2 className="mt-4 font-display text-ink" style={{ fontSize: "var(--text-step-3)" }}>
                The world has played here <span className="text-gold">since 2014.</span>
              </h2>
            </Reveal>
            <ul className="mt-12 grid grid-cols-2 gap-5 lg:grid-cols-4">
              {RECORD.map((r, i) => (
                <Reveal key={r.year} delay={i * 100} as="li">
                  <a href="/gallery" className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden border-2 border-black">
                      <Image src={r.image} alt={`${r.title}, ${r.where}`} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]" />
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/pacific/icons/${r.icon}.png`} alt="" width={512} height={512} className="h-9 w-9" />
                      <div>
                        <p className="font-lockup text-[15px]" style={{ color: "#1b5b70" }}>{r.year}</p>
                        <p className="font-sans text-[12px] font-bold uppercase tracking-[0.1em] text-ink">{r.title}</p>
                        <p className="font-sans text-[12px] text-ink-faint">{r.where}</p>
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* 4. Host with us */}
        <section className="px-6 py-16 text-paper md:px-12 md:py-24 lg:px-20" style={{ background: "#123d32" }}>
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow !text-[#d8ee63]">Host with us</p>
              <h2 className="mt-4 font-display" style={{ fontSize: "var(--text-step-3)" }}>
                YSK brings squash to the Puget Sound. <span className="text-[#d8ee63]">Your club or city could be a stop.</span>
              </h2>
              <p className="mt-6 max-w-[56ch] font-sans text-[15px] leading-relaxed text-white/80 md:text-base">
                Glass court, world-ranked players, a crowd that shows up. If you run a club, a venue, or a city sports office and want an event on the road to the qualifier, start here.
              </p>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-5">
              <a href="/#partner" className="btn-light">Start the conversation</a>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
