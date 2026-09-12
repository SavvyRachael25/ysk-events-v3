import Image from "next/image";
import MotionToggle from "./MotionToggle";
import { CONTACT_EMAIL, ORG_FOUNDED, SOCIAL } from "@/lib/constants";
import { NAV_SECTIONS, PRESS_OUTLETS } from "@/lib/content";

function FacebookIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-8.25h2.75l.41-3.19H13.5V7.52c0-.92.26-1.55 1.58-1.55h1.69V3.13c-.29-.04-1.29-.13-2.45-.13-2.43 0-4.09 1.48-4.09 4.2v2.36H7.48v3.19h2.75V21h3.27Z" />
    </svg>
  );
}

function InstagramIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.12-2.12C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.53A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.12 2.12c1.88.53 9.38.53 9.38.53s7.5 0 9.38-.53a3 3 0 0 0 2.12-2.12A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto max-w-[1280px] px-6 py-16 md:px-12 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <Image
              src="/ysk-logo.png"
              alt="YSK Events"
              width={1254}
              height={1254}
              sizes="64px"
              className="h-16 w-16"
            />
            <p className="mt-6 max-w-[380px] font-sans text-sm leading-relaxed text-paper/55">
              The final Olympic qualification event for squash. Bellevue ·
              Seattle, Washington, June 2028. Presented by YSK Events, a
              501(c)(3) that hosted the 2015 Men's World Championship and the 2024 PSA World Tour Finals in Bellevue. Growing squash in the United States since{" "}
              {ORG_FOUNDED}.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SOCIAL.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YSK Events on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-paper/70 transition-colors duration-300 hover:border-gold-bright hover:text-gold-bright"
              >
                <InstagramIcon />
              </a>
              <a
                href={SOCIAL.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YSK Events on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-paper/70 transition-colors duration-300 hover:border-gold-bright hover:text-gold-bright"
              >
                <FacebookIcon />
              </a>
              <a
                href={SOCIAL.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YSK Events on YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/20 text-paper/70 transition-colors duration-300 hover:border-gold-bright hover:text-gold-bright"
              >
                <YoutubeIcon />
              </a>
            </div>
          </div>

          {/* Explore */}
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-gold-bright">
              Explore
            </p>
            <ul className="mt-5 space-y-3">
              {NAV_SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    className="font-sans text-sm text-paper/60 transition-colors duration-300 hover:text-gold-bright"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact + press */}
          <div className="md:col-span-4">
            <p className="font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-gold-bright">
              Contact
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 inline-block font-sans text-sm text-paper/70 underline-offset-4 transition-colors duration-300 hover:text-gold-bright hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="mt-8 font-sans text-[11px] font-bold uppercase tracking-[0.24em] text-gold-bright">
              As Seen In
            </p>
            <p className="mt-4 max-w-[320px] font-sans text-xs leading-loose text-paper/60">
              {PRESS_OUTLETS.join(" · ")}
            </p>
          </div>
        </div>

        {/* Rights and photo credits. Attribution is required by the CC licences;
            the disclaimer is standard for any use of an Olympic mark under licence. */}
        <div className="mt-12 max-w-[820px] space-y-4 border border-paper/25 p-5 font-sans text-[12px] leading-relaxed text-paper/70">
          <p>
            LA28 and the Olympic rings are trademarks of the LA28 Organizing Committee and the International
            Olympic Committee, used with permission. This event is presented by YSK Events, a 501(c)(3)
            nonprofit, and is not organized, sponsored, or endorsed by LA28, the IOC, or the USOPC.
          </p>
          <p>
            Photographs of Hania El Hammamy, Ali Farag, and Olivia Weaver by Nettrom, 2023-24 PSA World Tour
            Finals, Bellevue, via Wikimedia Commons, licensed{" "}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">CC BY-SA 4.0</a>
            {" "}(
            <a href="https://commons.wikimedia.org/wiki/File:Hania_El_Hammamy_at_the_2023-24_PSA_World_Tour_Finals-06.jpg" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">1</a>,{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Ali_Farag_at_the_2023-24_PSA_World_Tour_Finals-01.jpg" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">2</a>,{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Nele_Gilis_and_Olivia_Weaver_at_the_2023-24_PSA_World_Tour_Finals.jpg" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">3</a>
            ). Cropped and scaled for display; these versions are shared under the same licence. Universal Studios
            globe by Benoît Prieur,{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Universal_Studios_Hollywood_globe_(July_2022).JPG" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-white">CC0</a>.
            2015 World Championship photography copyright YSK Events.
          </p>
          <div className="pt-1"><MotionToggle /></div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-paper/10 pt-7 md:flex-row md:items-center">
          <p className="font-sans text-xs text-paper/60">
            © {year} YSK Events. A 501(c)(3) nonprofit organization.
          </p>
          <p className="font-sans text-xs text-paper/60">
            Built by{" "}
            <a
              href="https://www.thesavvydigitalco.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-paper/60 underline-offset-4 transition-colors duration-300 hover:text-white hover:underline"
            >
              RB Collective, dba The Savvy Digital Co.
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
