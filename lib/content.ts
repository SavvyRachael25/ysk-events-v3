/**
 * YSK Events — source of truth for copy.
 * Keeping real content centralized so components stay presentational.
 */

export const NAV_SECTIONS = [
  { id: "about", label: "About", href: "/#about" },
  { id: "programs", label: "Programs", href: "/#programs" },
  { id: "events", label: "Events", href: "/events" },
  { id: "gallery", label: "Gallery", href: "/gallery" },
  { id: "press", label: "Press", href: "/press" },
  { id: "donate", label: "Donate", href: "/#donate" },
  { id: "contact", label: "Contact", href: "/#contact" },
] as const;

export const MARQUEE_ITEMS = [
  "3 Generations of Champions",
  "7 World No. 1 Rankings",
  "Squash at LA28",
  "Youth-First Mission",
  "501(c)(3) Nonprofit",
  "Pacific Northwest",
  "Kids First. Always.",
] as const;

export const PILLARS = [
  {
    num: "01",
    title: "Youth-First Mission",
    desc: "Every dollar, every decision, every program — designed around the growth and well-being of young athletes.",
  },
  {
    num: "02",
    title: "World-Class Coaching",
    desc: "Three generations of Khan family expertise. 7 family members ranked World No. 1. That legacy now coaches your kids.",
  },
  {
    num: "03",
    title: "Community Access",
    desc: "Scholarship-funded court time, free clinics, and Title I school partnerships — no child turned away for inability to pay.",
  },
  {
    num: "04",
    title: "Proven Results",
    desc: "From hosting the first-ever Men's World Championship on U.S. soil to Hall of Fame inductions — we deliver on what we promise.",
  },
] as const;

export const PARTNERS = [
  { name: "US Squash", label: "Sanctioned Partner" },
  { name: "PSA World Tour", label: "Professional Events" },
  { name: "LA28 Olympics", label: "Olympic Pathway" },
  { name: "Title I Schools", label: "Community Access" },
  { name: "Xbox", label: "Title Sponsor" },
  { name: "PRO Club", label: "Training Facility" },
] as const;

export const PRESS_OUTLETS = [
  "The Seattle Times",
  "FOX 13",
  "KUOW (NPR)",
  "KING 5",
  "US Squash",
] as const;

export type Program = {
  tag: string;
  accent: "mint" | "coral" | "sun";
  name: string;
  headline: string;
  desc: string;
  status?: string;
  cta: string;
  featured?: boolean;
};

export const PROGRAMS: Program[] = [
  {
    tag: "Flagship",
    accent: "mint",
    name: "Squash Forward",
    headline: "Where champions are made",
    desc: "Structured youth development integrating social-emotional learning with competitive squash. Recruiting from Title I schools across Bellevue–Seattle.",
    status: "Launching 2026",
    cta: "Enroll now",
    featured: true,
  },
  {
    tag: "Community",
    accent: "mint",
    name: "Community Clinics",
    headline: "Zero barriers to entry",
    desc: "Free introductory clinics for ages 5–18 with scholarship-funded access for underserved families. No experience needed.",
    cta: "Join a clinic",
  },
  {
    tag: "Academics",
    accent: "coral",
    name: "Squash + Academics",
    headline: "Court to classroom pipeline",
    desc: "Athletic training paired with academic enrichment, college prep, and 1-on-1 mentorship. Building pathways that last.",
    status: "Launching 2026",
    cta: "Learn more",
  },
  {
    tag: "Elite",
    accent: "mint",
    name: "Competitive Training",
    headline: "Train with the best",
    desc: "High-performance coaching for tournament-ready athletes. US Squash sanctioned, led by world-class Khan family coaches.",
    cta: "Apply now",
  },
  {
    tag: "Culture",
    accent: "coral",
    name: "Squash Art Initiative",
    headline: "Sport meets expression",
    desc: "Youth explore identity, resilience, and community through art and squash. Original works by Sharif Khan featured at every event.",
    cta: "Explore",
  },
  {
    tag: "Olympic",
    accent: "sun",
    name: "LA28 Pathway",
    headline: "The Olympic dream starts here",
    desc: "Squash debuts at Los Angeles 2028. We're building the pipeline from Pacific Northwest courts to the Olympic stage.",
    status: "Launching 2027",
    cta: "Learn more",
    featured: true,
  },
];

export const PROGRAM_STATS = [
  { big: "500+", label: "Youth athletes served" },
  { big: "12+", label: "Years of impact" },
  { big: "LA28", label: "Olympic debut" },
  { big: "$0", label: "Cost for scholarship athletes" },
] as const;

export type TeamMember = {
  name: string;
  role: string;
  group: "khan" | "board";
  bio: string;
  accolades?: readonly string[];
  featured?: boolean;
  memorial?: boolean;
};

export const KHAN_FAMILY: TeamMember[] = [
  {
    name: "Yusuf Khan",
    role: "Patriarch & Founder of Seattle Squash",
    group: "khan",
    bio: "A 10-time All-India squash champion who moved to Seattle in 1968 and is credited with bringing the sport to the Pacific Northwest. He served as head pro at the Seattle Tennis Club before founding the Seattle Athletic Club. He remained a legendary figure in the squash community until his passing in 2018.",
    accolades: ["10× All-India Champion", "Seattle Pioneer", "1968–2018"],
    featured: true,
    memorial: true,
  },
  {
    name: "Shabana Khan",
    role: "Founder & CEO",
    group: "khan",
    bio: "A former Women's National Squash Champion and professional player who founded YSK Events to bring world-class tournaments to the U.S. She organized the 2015 Men's World Squash Championship in Bellevue — the first time the event was held in the United States. She is the visionary behind YSK's shift toward youth development and professional showcases.",
    accolades: ["National Champion", "2015 Worlds Host", "Visionary"],
    featured: true,
  },
  {
    name: "Latasha Khan",
    role: "Director",
    group: "khan",
    bio: "A former Women's National Champion who reached World No. 18 and was inducted into the US Squash Hall of Fame in 2024. She earned two Gold medals at the 2003 Pan American Games. In the 1990s and 2000s, Shabana and Latasha dominated the U.S. squash scene, often meeting in national finals. Latasha provides business development expertise to YSK Events.",
    accolades: ["World No. 18", "Hall of Fame 2024", "2× Pan Am Gold"],
    featured: true,
  },
  {
    name: "Murad Khan",
    role: "President & Manager",
    group: "khan",
    bio: "One of Yusuf's sons, Murad played professional squash and now leads YSK Events operations. He is the driving force behind major events like the Yusuf Khan Invitational, and focuses on bridging the Pacific Northwest tech community — notably Microsoft and Google employees — with the sport of squash.",
    accolades: ["Pro Player", "Event Operations", "Tech Bridge"],
  },
  {
    name: "Azam Khan",
    role: "Head Coach & Director",
    group: "khan",
    bio: "A renowned coach who directs a world-class squash program at PRO Club in Bellevue. While less focused on event production, Azam's coaching excellence and player development are central to the Khan family's mission of growing squash's player base across Washington State.",
    accolades: ["PRO Club Bellevue", "World-Class Coach"],
  },
];

export const BOARD: TeamMember[] = [
  {
    name: "Craig B. Landgren",
    role: "Secretary & Treasurer",
    group: "board",
    bio: "Overseeing financial stewardship and governance, Craig ensures YSK Events' 501(c)(3) operations run with full transparency and accountability.",
  },
  {
    name: "Curt Ligot",
    role: "Board of Directors",
    group: "board",
    bio: "Founder of Roundbox Fitness in Seattle with 20+ years in fitness and performance training. His holistic approach to human performance aligns with YSK's commitment to developing well-rounded young athletes.",
    accolades: ["Roundbox Fitness", "Seattle"],
  },
];

export const DONATION_AMOUNTS = ["$25", "$50", "$100", "$250", "$1,000"] as const;

export const DONATION_IMPACTS = [
  { amount: "$25", desc: "One week of court time for a scholarship athlete" },
  { amount: "$50", desc: "Full racket and gear set for a first-time player" },
  { amount: "$100", desc: "One month of academic tutoring for a student athlete" },
  { amount: "$250", desc: "Full tournament season sponsorship for one youth" },
  { amount: "$1,000", desc: "An entire year of coaching, competition, and mentorship" },
] as const;

export const CONTACT_INTERESTS = [
  "Youth Program Enrollment",
  "Corporate Sponsorship",
  "Olympic Court Naming Rights",
  "Foundation / Grant Partnership",
  "Volunteering",
  "Media / Press Inquiry",
  "General Donation",
  "Other",
] as const;
