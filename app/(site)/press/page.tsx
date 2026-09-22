import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Ribbon from "@/components/Ribbon";
import Reveal from "@/components/Reveal";
import { RELEASE, RELEASE_2, FACTS, PRESS_PHOTOS, LOGOS, PSA_ANNOUNCEMENT } from "@/lib/press";
import PressStrip from "@/components/PressStrip";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Press",
  description: "Press release, facts, photos and logos for the Squash Final Qualifier, Seattle and Bellevue, June 6 to 10, 2028, presented by YSK Events.",
  alternates: { canonical: "/press" },
  openGraph: { title: "Press · YSK Events", description: RELEASE.headline, url: "/press", type: "article", images: ["/opengraph-image"] },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Press", url: `${SITE_URL}/press` },
]);

const newsJsonLd = {
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  headline: RELEASE.headline,
  datePublished: "2026-09-21",
  author: { "@id": `${SITE_URL}/#organization` },
  publisher: { "@id": `${SITE_URL}/#organization` },
  about: { "@id": `${SITE_URL}/#event` },
  url: `${SITE_URL}/press`,
};

export default function PressPage() {
  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />
      <script {...jsonLdScriptProps(newsJsonLd)} />
      <Navbar />
      <main id="main" className="flex-1 pt-16 md:pt-[76px]">
        <section className="px-6 pb-16 pt-16 md:px-12 md:pb-20 md:pt-24 lg:px-20" style={{ background: "var(--color-paper)" }}>
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-12 lg:grid-cols-12">
            <article className="lg:col-span-8">
              <p className="eyebrow">Press release · {RELEASE.dateline}</p>
              <h1 className="mt-5 max-w-[24ch] font-display text-ink" style={{ fontSize: "var(--text-step-3)", lineHeight: 1.05 }}>
                {RELEASE.headline}
              </h1>
              <span aria-hidden="true" className="rule-tricolor mt-8 block w-20" />
              <div className="mt-8 max-w-[68ch] space-y-5">
                {RELEASE.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)} className="body-copy">{p}</p>
                ))}
                <blockquote className="border-l-4 pl-6" style={{ borderColor: "#e87953" }}>
                  <p className="font-display text-ink" style={{ fontSize: "var(--text-step-1)", lineHeight: 1.3 }}>“{RELEASE.quote.text}”</p>
                  <p className="mt-3 font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-ink-faint">
                    {RELEASE.quote.who}, <a href={PSA_ANNOUNCEMENT} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">{RELEASE.quote.source}</a>
                  </p>
                </blockquote>
                <p className="body-copy">{RELEASE.closing}</p>
                <p className="font-sans text-[13px] font-extrabold uppercase tracking-[0.12em] text-ink">About YSK Events</p>
                <p className="body-copy text-[15px]">{RELEASE.boilerplate}</p>
                <p className="body-copy text-[15px]">
                  Media contact: <a href={`mailto:${CONTACT_EMAIL}`} className="text-gold underline-offset-4 hover:underline">{CONTACT_EMAIL}</a>.
                  Official announcement: <a href={PSA_ANNOUNCEMENT} target="_blank" rel="noopener noreferrer" className="text-gold underline-offset-4 hover:underline">PSA World Tour</a>.
                </p>
              </div>
            </article>
            <aside className="lg:col-span-4">
              <div className="border-2 border-black bg-white p-7">
                <p className="eyebrow">Facts</p>
                <dl className="mt-4 space-y-4">
                  {FACTS.map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-sans text-[11px] font-extrabold uppercase tracking-[0.14em]" style={{ color: "#1b5b70" }}>{k}</dt>
                      <dd className="mt-1 font-sans text-[14px] leading-relaxed text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="mt-6 border-2 border-black bg-white p-7">
                <p className="eyebrow">Logos</p>
                <ul className="mt-4 grid grid-cols-1 gap-3">
                  {LOGOS.map((l) => (
                    <li key={l.src}>
                      <a href={l.src} download className="group block border border-black/15 p-5 transition-colors hover:border-black" style={{ background: l.bg }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={l.src} alt={l.name} width={1400} height={815} className="mx-auto h-auto w-40" />
                      </a>
                      <p className="mt-1.5 font-sans text-[12px] text-ink-faint">{l.name} · PNG, click to download</p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-sans text-[12px] leading-relaxed text-ink-faint">The LA28 emblem is used under clearance held by YSK Events and is not available for download.</p>
              </div>
              <div className="mt-6 border-2 border-black bg-white p-7">
                <p className="eyebrow">Partners and coverage</p>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/partners/seattle-sports-commission.svg" alt="Seattle Sports Commission" width={558} height={559} className="mt-4 h-20 w-20" />
                <PressStrip className="mt-5 gap-x-6" />
              </div>
            </aside>
          </div>
        </section>

        <section className="px-6 pb-20 md:px-12 md:pb-28 lg:px-20" style={{ background: "var(--color-paper)" }}>
          <article className="mx-auto max-w-[1280px] border-t-2 border-black pt-14">
            <p className="eyebrow">Press release · {RELEASE_2.dateline}</p>
            <h2 className="mt-5 max-w-[26ch] font-display text-ink" style={{ fontSize: "var(--text-step-3)", lineHeight: 1.05 }}>{RELEASE_2.headline}</h2>
            <div className="mt-8 max-w-[68ch] space-y-5">
              {RELEASE_2.paragraphs.map((p) => (<p key={p.slice(0, 40)} className="body-copy">{p}</p>))}
              <blockquote className="border-l-4 pl-6" style={{ borderColor: "#e87953" }}>
                <p className="font-display text-ink" style={{ fontSize: "var(--text-step-1)", lineHeight: 1.3 }}>“{RELEASE_2.quote.text}”</p>
                <p className="mt-3 font-sans text-[13px] font-bold uppercase tracking-[0.1em] text-ink-faint">{RELEASE_2.quote.who}, <a href={PSA_ANNOUNCEMENT} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-ink">{RELEASE_2.quote.source}</a></p>
              </blockquote>
              <p className="body-copy">{RELEASE_2.closing}</p>
            </div>
          </article>
        </section>

        <Ribbon />

        <section className="px-6 py-16 md:px-12 md:py-20 lg:px-20" style={{ background: "var(--color-paper-2)" }}>
          <div className="mx-auto max-w-[1280px]">
            <p className="eyebrow">Photos for editorial use</p>
            <h2 className="mt-4 font-display text-ink" style={{ fontSize: "var(--text-step-3)" }}>
              Use with the credit <span className="text-gold">shown.</span>
            </h2>
            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PRESS_PHOTOS.map((ph, i) => (
                <Reveal key={ph.src} delay={i * 80} as="li">
                  <a href={ph.src} download className="group block">
                    <div className="relative aspect-[4/3] overflow-hidden border-2 border-black">
                      <Image src={ph.src} alt={ph.caption} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]" />
                    </div>
                    <p className="mt-3 font-sans text-[12px] leading-relaxed text-ink-faint">{ph.caption}</p>
                  </a>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
