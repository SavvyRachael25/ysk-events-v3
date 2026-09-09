/**
 * YSK Events — source of truth for copy.
 * Direction: "The Road to LA" — the final Olympic qualification event
 * for squash, Bellevue–Seattle, Washington, June 2028.
 *
 * CLIENT-EDITABLE COPY now lives in content/pages/home.json and is edited
 * through the portal at /admin (TinaCMS). This file re-exports it under the
 * same names the components already use, so nothing downstream changed.
 *
 * Anything below the "not client-editable" divider stays in code on purpose:
 * it is structural (nav), legal, or SEO wiring the client should not break.
 */

import home from "@/content/pages/home.json";

// ——— The event (editable) ———
export const EVENT = {
  kicker: home.hero.kicker,
  headlineTop: home.hero.headlineTop,
  headlineAccent: home.hero.headlineAccent,
  location: home.hero.location,
  date: home.hero.date,
  lines: home.hero.lines,
  image: home.hero.image,
  imageAlt: home.hero.imageAlt,
  imageSecondary: home.hero.imageSecondary,
  imageSecondaryAlt: home.hero.imageSecondaryAlt,
  ctaPrimary: { label: home.hero.ctaPrimaryLabel, href: home.hero.ctaPrimaryHref },
  ctaSecondary: { label: home.hero.ctaSecondaryLabel, href: home.hero.ctaSecondaryHref },
};

export const MARQUEE_ITEMS = home.marquee;

// ——— Why it matters (editable) ———
export const QUALIFY = home.qualify;

// ——— The journey: three cities (editable) ———
export const CITIES = home.cities;

// ——— History (editable) ———
export const HISTORY = home.history;
export const HISTORY_PROOF = home.historyProof;
export const TIMELINE = home.timeline;

// ——— Partner (editable) ———
export const PARTNER = home.partner;
export const PARTNER_TIERS = home.partnerTiers;

/* ============================================================
   NOT CLIENT-EDITABLE below this line.
   Structural, legal, and SEO wiring. Change in code only.
   ============================================================ */

export const NAV_SECTIONS = [
  { id: "event", label: "The Event", href: "/#event" },
  { id: "road", label: "Road to LA", href: "/#road" },
  { id: "cities", label: "Cities", href: "/#cities" },
  { id: "history", label: "History", href: "/#history" },
  { id: "faq", label: "FAQ", href: "/#faq" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  { id: "partner", label: "Sponsors", href: "/sponsors" },
] as const;

// ——— Credibility: names YSK has worked with across its events ———
export const SPONSOR_CRED = [
  "US Squash",
  "PSA World Tour",
  "PRO Club",
  "Xbox",
  "LA28 Olympic pathway",
] as const;

export const SPONSOR_PROOF = [
  { value: "2015", label: "First Men's World Championship ever held on U.S. soil, hosted by YSK in Bellevue" },
  { value: "100+", label: "Professional players competed at that championship" },
  { value: "25+", label: "Countries represented" },
  { value: "1st", label: "Squash appears at the Olympics for the first time in LA" },
] as const;

export const CONTACT_INTERESTS = [
  "Title Partnership",
  "Official Partnership",
  "Community Partnership",
  "Media / Press Inquiry",
  "Volunteering",
  "General Donation",
  "Other",
] as const;

export const PRESS_OUTLETS = [
  "The Seattle Times",
  "FOX 13",
  "KUOW (NPR)",
  "KING 5",
  "US Squash",
] as const;

// ——— Homepage FAQ (SEO/AEO structured data) ———
export const HOMEPAGE_FAQ = [
  {
    question: "Where does YSK Events train youth squash players?",
    answer:
      "YSK Events programs are based at PRO Club Bellevue (4455 148th Ave NE, Bellevue, WA), where Head Coach Azam Khan directs a world-class squash program. We also partner with Title I schools across the Bellevue–Seattle corridor for community access clinics.",
  },
  {
    question: "Who runs YSK Events?",
    answer:
      "YSK Events was founded in 2013 by national champion Shabana Khan. The Khan family has produced seven World No. 1–ranked players across three generations, beginning with patriarch Yusuf Khan, who brought squash to Seattle in 1968. The full coaching and leadership team is led by Shabana Khan (Founder & CEO), Murad Khan (President), Azam Khan (Head Coach), and Latasha Khan (Director and 2024 US Squash Hall of Fame inductee).",
  },
  {
    question: "Is YSK Events a registered nonprofit?",
    answer:
      "Yes. YSK Events is a 501(c)(3) tax-exempt nonprofit. All donations are tax-deductible, and 100% of program funding goes directly to youth — coaching, court time, equipment, academic support, and tournament travel.",
  },
  {
    question: "Are the youth programs really free for scholarship athletes?",
    answer:
      "Yes. No child is turned away for inability to pay. Through scholarship-funded court time, donated equipment, and partnerships with Title I schools, the cost for a scholarship athlete is $0 — that includes coaching, gear, and competitive play.",
  },
  {
    question: "How does YSK Events connect to the LA28 Olympic Games?",
    answer:
      "Squash makes its Olympic debut at the Los Angeles 2028 Games. YSK Events runs the LA28 Pathway program (launching 2027) to identify and develop Pacific Northwest junior players with Olympic potential, in alignment with US Squash sanctioning.",
  },
  {
    question: "How can I support YSK Events?",
    answer:
      "Three ways: make a tax-deductible donation, sponsor a scholarship athlete or tournament season, or partner as a corporation or foundation. Contact hello@yskevents.com to discuss naming rights, multi-year sponsorships, or grant partnerships.",
  },
] as const;
