/**
 * YSK Events — source of truth for copy.
 * Direction: "The Road to LA" — the final Olympic qualification event
 * for squash, Bellevue–Seattle, Washington, June 2028.
 * Keeping real content centralized so components stay presentational.
 */

export const NAV_SECTIONS = [
  { id: "event", label: "The Event", href: "/#event" },
  { id: "road", label: "Road to LA", href: "/#road" },
  { id: "cities", label: "Cities", href: "/#cities" },
  { id: "history", label: "History", href: "/#history" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  { id: "partner", label: "Partner With Us", href: "/#partner" },
] as const;

// ——— The event ———
export const EVENT = {
  kicker: "The Final Olympic Qualification Event for Squash",
  headlineTop: "The Road to LA",
  headlineAccent: "Goes Through Washington.",
  location: "Bellevue · Seattle, Washington",
  date: "June 2028",
  lines: [
    "One final opportunity.",
    "The world's best players.",
    "Olympic dreams on the line.",
  ],
  ctaPrimary: { label: "Explore the Event", href: "#road" },
  ctaSecondary: { label: "Partner With Us", href: "#partner" },
} as const;

export const MARQUEE_ITEMS = [
  "Squash Debuts at the LA Olympics",
  "The Final Qualification Event",
  "Bellevue · Seattle · June 2028",
  "The World's Best Players",
  "One Last Chance to Qualify",
  "Presented by YSK Events · 501(c)(3)",
] as const;

// ——— Why it matters ———
export const QUALIFY = {
  eyebrow: "June 2028 · Washington State",
  headline: "Where the world comes to qualify",
  headlineAccent: "for the Olympics.",
  body: "In 2028, squash makes its Olympic debut at the Los Angeles Games. Before it does, the world's top players will come to Washington for one last chance to earn their place. Every match matters. Every point could send a player to the Olympics, or send them home.",
} as const;

// ——— The journey: three cities ———
export const CITIES = [
  {
    name: "Bellevue",
    tagline: "Where the journey begins.",
    desc: "Home of YSK Events and the 2015 Men's World Championship, the first ever held on U.S. soil.",
    image: "/event/city-bellevue.jpg",
    alt: "Downtown Bellevue, Washington skyline across the water",
  },
  {
    name: "Seattle",
    tagline: "Where the final Olympic places are decided.",
    desc: "The Pacific Northwest's biggest stage hosts the last qualification event before the Games.",
    image: "/event/city-seattle.jpg",
    alt: "Seattle skyline at golden hour with Mount Rainier behind",
  },
  {
    name: "Los Angeles",
    tagline: "Where squash makes its Olympic debut.",
    desc: "For the first time in history, squash is an Olympic sport. The road ends at the LA Games.",
    image: "/event/city-la.jpg",
    alt: "Downtown Los Angeles skyline at sunset with palm trees",
  },
] as const;

// ——— History ———
export const HISTORY = {
  eyebrow: "Since 2013",
  headline: "A history of",
  headlineAccent: "making squash matter.",
  body: "For more than a decade, YSK Events has helped elevate squash in the United States through community impact, major championships, and memorable event experiences. Founded by the Khan family, three generations of champions, YSK is a 501(c)(3) nonprofit rooted in the Pacific Northwest.",
  image: "/event/athlete.jpg",
  alt: "Squash athlete mid-swing under arena lights",
} as const;

export const HISTORY_PROOF = [
  { value: "2015", label: "Hosted the first Men's World Championship on U.S. soil" },
  { value: "25+", label: "Countries represented at YSK championships" },
  { value: "7", label: "Khan family World No. 1 rankings" },
  { value: "10K+", label: "Youth introduced to squash across Washington" },
] as const;

export const TIMELINE = [
  {
    year: "2014",
    title: "World-champion exhibitions",
    desc: "Ramy Ashour, Amr Shabana, and Grégory Gaultier headline exhibitions at PRO Club in Bellevue.",
  },
  {
    year: "2015",
    title: "Men's World Championship",
    desc: "YSK makes history: the PSA World Championship comes to the U.S. for the first time. 100+ pros, 25+ countries, record prize money, an all-glass court at Meydenbauer Center.",
  },
  {
    year: "2017",
    title: "PMI Bellevue Squash Classic",
    desc: "A $200K PSA event brings the world tour back to the Eastside.",
  },
  {
    year: "2021–2025",
    title: "The Yusuf Khan Invitational era",
    desc: "Junior championships, PSA World Tour Finals, and the annual invitational honoring the man who brought squash to the Pacific Northwest.",
  },
  {
    year: "2028",
    title: "The Road to LA",
    desc: "The final Olympic qualification event for squash comes to Washington. Then, Los Angeles.",
  },
] as const;

// ——— Partner ———
export const PARTNER = {
  eyebrow: "Sponsorship & Support",
  headline: "Be part of squash's",
  headlineAccent: "Olympic moment.",
  body: "The first Olympic qualification event on American soil is a once-in-a-generation platform. Partner with YSK Events to put your brand at the center of it, or support the 501(c)(3) mission that builds the next generation of American squash.",
} as const;

export const PARTNER_TIERS = [
  {
    name: "Title Partner",
    desc: "Naming rights to the qualification event, court branding, and first position across all broadcast and press coverage.",
  },
  {
    name: "Official Partner",
    desc: "Court-side branding, hospitality packages, and presence across the event's digital and printed program.",
  },
  {
    name: "Community Partner",
    desc: "Fund youth clinics and scholarship court time around the event. Every dollar is tax-deductible.",
  },
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
