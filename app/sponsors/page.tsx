import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import Ribbon from "@/components/Ribbon";
import {
  QUALIFY,
  PARTNER_TIERS,
  SPONSOR_CRED,
  SPONSOR_PROOF,
  PRESS_OUTLETS,
} from "@/lib/content";
import { CONTACT_EMAIL, SITE_URL } from "@/lib/constants";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sponsors",
  description:
    "Sponsorship opportunities for the final Olympic qualification event for squash. Bellevue and Seattle, Washington, June 2028. Title, Official, and Community partnerships with YSK Events, a 501(c)(3) nonprofit.",
  alternates: { canonical: "/sponsors" },
  openGraph: {
    title: "Sponsor the Road to LA · YSK Events",
    description:
      "Put your brand at the center of squash's first Olympic moment. Bellevue and Seattle, June 2028.",
    url: "/sponsors",
    type: "website",
    images: ["/opengraph-image"],
  },
};

const breadcrumbs = breadcrumbJsonLd([
  { name: "Home", url: `${SITE_URL}/` },
  { name: "Sponsors", url: `${SITE_URL}/sponsors` },
]);

const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  "Road to LA Sponsorship Inquiry",
)}`;

export default function SponsorsPage() {
  return (
    <>
      <script {...jsonLdScriptProps(breadcrumbs)} />

      <Navbar />

      <main id="main" className="flex-1">
        {/* ——— Page hero ——— */}
        <section className="paper-grain relative overflow-hidden bg-paper px-6 pt-32 pb-20 md:px-12 md:pt-44 md:pb-28 lg:px-20">
          <span
            aria-hidden="true"
            className="ghost-type right-[-3%] top-16 hidden lg:block"
            style={{ fontSize: "clamp(10rem, 20vw, 18rem)" }}
          >
            LA
          </span>
          <div className="relative z-10 mx-auto max-w-[1280px]">
            <div className="flex items-center gap-4">
              <span className="section-no">Sponsorship</span>
              <span aria-hidden="true" className="rule-gold h-px w-8" />
              <p className="eyebrow">Bellevue · Seattle · June 2028</p>
            </div>
            <h1
              className="mt-6 max-w-[16ch] font-display text-ink"
              style={{ fontSize: "var(--text-step-4)" }}
            >
              Put your name on squash&rsquo;s{" "}
              <span className="text-gold">Olympic moment.</span>
            </h1>
            <span aria-hidden="true" className="rule-tricolor mt-8 block w-20" />
            <p className="body-copy mt-8 max-w-[600px]">
              For the first time in history, squash is an Olympic sport. The
              last qualification event before the Los Angeles Games happens in
              Washington, and the brands beside the glass court will be part
              of the story the sport tells forever.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href={mailto} className="btn-gold">
                Request the Sponsorship Deck
              </a>
              <a href="/#event" className="btn-outline">
                About the Event
              </a>
            </div>
          </div>
        </section>

        <Ribbon />

        {/* ——— Proof ——— */}
        <section className="border-y border-border bg-paper-2 px-6 py-16 md:px-12 md:py-20 lg:px-20">
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
                {SPONSOR_PROOF.map((stat) => (
                  <div key={stat.label}>
                    <dt
                      className="font-lockup text-gold"
                      style={{ fontSize: "var(--text-step-3)", lineHeight: 1 }}
                    >
                      {stat.value}
                    </dt>
                    <dd className="mt-3 max-w-[240px] font-sans text-[13px] leading-relaxed text-ink-soft">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
            <Reveal delay={150} className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-8">
              <span className="eyebrow-quiet">YSK works with</span>
              {SPONSOR_CRED.map((name) => (
                <span
                  key={name}
                  className="font-lockup text-[15px] tracking-[0.06em] text-ink-soft"
                >
                  {name}
                </span>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ——— Tiers ——— */}
        <section className="paper-grain bg-paper px-6 py-24 md:px-12 md:py-32 lg:px-20">
          <div className="mx-auto max-w-[1280px]">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="section-no">Packages</span>
                <span aria-hidden="true" className="rule-gold h-px w-8" />
                <p className="eyebrow">Three ways in</p>
              </div>
              <h2
                className="mt-5 font-display text-ink"
                style={{ fontSize: "var(--text-step-3)" }}
              >
                Choose your <span className="text-gold">position.</span>
              </h2>
            </Reveal>

            <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
              {PARTNER_TIERS.map((tier, i) => (
                <Reveal
                  key={tier.name}
                  delay={i * 140}
                  className="group flex flex-col border-2 border-black bg-white p-8 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3
                      className="font-display text-ink"
                      style={{ fontSize: "1.05rem", letterSpacing: "0.1em" }}
                    >
                      {tier.name}
                    </h3>
                    <span className="font-lockup text-lg text-gold/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-ink-soft">
                    {tier.desc}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3 border-t border-border pt-6">
                    {tier.includes.map((item) => (
                      <li
                        key={item}
                        className="flex gap-3 font-sans text-[13px] leading-relaxed text-ink-soft"
                      >
                        <span aria-hidden="true" className="mt-[7px] h-px w-4 shrink-0 bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={mailto}
                    className="btn-gold mt-8 w-fit"
                  >
                    Start the conversation
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ——— Closing CTA ——— */}
        <section
          className="relative overflow-hidden bg-navy-deep px-6 py-24 text-paper md:px-12 md:py-32 lg:px-20"
          style={{ borderTop: "1px solid var(--color-gold)" }}
        >
          <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-7">
              <p className="eyebrow !text-gold-bright">A 501(c)(3) nonprofit</p>
              <h2
                className="mt-5 font-display text-paper"
                style={{ fontSize: "var(--text-step-3)" }}
              >
                Every sponsorship builds{" "}
                <span className="text-gold-bright">the next generation.</span>
              </h2>
              <p
                className="mt-7 max-w-[540px] font-sans leading-[1.72] text-paper/70"
                style={{ fontSize: "var(--text-step-0)" }}
              >
                YSK Events is the Khan family&rsquo;s nonprofit, three
                generations of champions who have grown squash in the Pacific
                Northwest for decades. Sponsorship revenue beyond event costs
                funds youth clinics, scholarship court time, and the pipeline
                of young American players.
              </p>
              <div className="mt-10">
                <a href={mailto} className="btn-light">
                  Contact {CONTACT_EMAIL}
                </a>
              </div>
              <p className="mt-8 font-sans text-[11px] uppercase tracking-[0.2em] text-paper/40">
                As seen in {PRESS_OUTLETS.join(" · ")}
              </p>
            </Reveal>
            <Reveal delay={160} as="figure" className="hidden lg:col-span-5 lg:block">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="/event/mens-bellevue.jpg"
                  alt="Ali Farag competing at the 2023-24 PSA World Tour Finals in Bellevue, Washington"
                  fill
                  sizes="40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
