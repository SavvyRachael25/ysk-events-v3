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
  "Seattle Sports Commission",
  "LA28",
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

// ——— Homepage FAQ: questions about the qualifier, for sponsors, officials, and press ———
// Only supported facts. Where YSK has not confirmed a figure, the answer says so.
export const HOMEPAGE_FAQ = [
  {
    question: "What is the Final Olympic Qualifier for Squash?",
    answer:
      "The last qualification event before squash makes its Olympic debut at the Los Angeles 2028 Games. It takes place in Bellevue and Seattle, Washington, in June 2028. Players who have not yet secured a place at LA28 compete here for the final spots.",
  },
  {
    question: "When and where is it held?",
    answer:
      "June 2028, in Bellevue and Seattle, Washington. The venue and match schedule will be announced. The Olympic squash competition itself follows in Los Angeles at the Comcast Squash Center at Universal Studios.",
  },
  {
    question: "Who hosts the qualifier?",
    answer:
      "YSK Events, a 501(c)(3) nonprofit based in Bellevue and founded by the Khan family, which holds seven World No. 1 rankings across its members. YSK hosted the 2015 Men's World Squash Championship at Meydenbauer Center, the first ever on U.S. soil, with more than 100 professionals from more than 25 countries. In June 2024, Bellevue hosted the PSA World Tour Finals, the top eight men and women in the world.",
  },
  {
    question: "Why is squash at the Olympics for the first time?",
    answer:
      "Squash was added to the Olympic programme for Los Angeles 2028. It has never been contested at a Summer Games before, which makes the 2028 qualification cycle the first of its kind and this event the last stop on the way to it.",
  },
  {
    question: "How do sponsors and partners get involved?",
    answer:
      "Three partnership levels are open: Title, Official, and Community. Details are on the Sponsors page. To start a conversation or request the sponsorship deck, email hello@yskevents.com.",
  },
  {
    question: "How do press and public partners reach the organizers?",
    answer:
      "Email hello@yskevents.com. For media, use the subject line Press. For city, county, or state partnership, use the subject line Public Partnership. YSK Events is a registered 501(c)(3); governance and financial documents are available on request.",
  },
] as const;

// ——— Youth program FAQ: moved off the home page, shown to Community Partner prospects ———
export const YOUTH_FAQ = [
  {
    question: "Where does YSK Events train youth squash players?",
    answer:
      "YSK Events programs are based at PRO Club Bellevue (4455 148th Ave NE, Bellevue, WA), where Head Coach Azam Khan directs the squash program. YSK also partners with Title I schools across the Bellevue to Seattle corridor for community access clinics.",
  },
  {
    question: "Are the youth programs free for scholarship athletes?",
    answer:
      "Yes. No child is turned away for inability to pay. Through scholarship-funded court time, donated equipment, and partnerships with Title I schools, the cost for a scholarship athlete is $0. That includes coaching, gear, and competitive play.",
  },
  {
    question: "How does YSK Events connect to the LA28 Olympic Games?",
    answer:
      "Beyond hosting the final qualifier, YSK Events runs the LA28 Pathway program (launching 2027) to identify and develop Pacific Northwest junior players with Olympic potential, in alignment with US Squash sanctioning.",
  },
] as const;
