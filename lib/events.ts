/**
 * Events page data. MOCK for review, 2026-09-19: every date below the
 * qualifier is a placeholder and is labelled as one on the page. Replace with
 * Shabana's real calendar before this ships, and remove the `mock` flags.
 */
export type EventStatus = "announced" | "planned" | "past";

export type YskEvent = {
  slug: string;
  title: string;
  when: string;
  where: string;
  status: EventStatus;
  blurb: string;
  image?: string;
  icon?: string;
  cta?: { label: string; href: string };
  mock?: boolean;
};

export const HEADLINE_EVENT = {
  title: "The Final Olympic Qualifier for Squash",
  when: "June 2028",
  where: "Bellevue and Seattle, Washington",
  blurb:
    "The last qualification event before squash makes its Olympic debut at Los Angeles 2028. The world's top men and women, one last chance. Venue and tickets to be announced.",
  image: "/pacific/seattle-court-real.jpg",
};

export const ROAD: YskEvent[] = [
  {
    slug: "yusuf-khan-invitational-2027",
    title: "Yusuf Khan Invitational",
    when: "Spring 2027 (date to be confirmed)",
    where: "PRO Club, Bellevue",
    status: "planned",
    blurb: "The annual invitational honoring the man who brought squash to the Pacific Northwest. Juniors and pros on the same weekend.",
    icon: "2021-2023",
    mock: true,
  },
  {
    slug: "puget-sound-series",
    title: "Puget Sound Squash Series",
    when: "2027 season (placeholder)",
    where: "Bellevue, Seattle, Tacoma, and clubs across the Sound",
    status: "planned",
    blurb: "A run of ranking events across the region in the year before the qualifier, one registration for all of them. Shown here as a placeholder while the series is being scoped.",
    icon: "2028",
    mock: true,
  },
  {
    slug: "youth-clinics",
    title: "Youth clinics and scholarship court time",
    when: "Year-round",
    where: "PRO Club, Bellevue, and Title I school partners",
    status: "announced",
    blurb: "Coaching, gear, and competitive play at no cost to scholarship athletes. Directed by Head Coach Azam Khan.",
    icon: "2014",
    cta: { label: "Ask about clinics", href: "/#partner" },
  },
];

export const RECORD = [
  { year: "2024", title: "PSA World Tour Finals", where: "Bellevue", image: "/event/worlds-bellevue-hero.jpg", icon: "2024" },
  { year: "2017", title: "PMI Bellevue Squash Classic", where: "Bellevue", image: "/gallery/gallery-09.jpg", icon: "2017" },
  { year: "2015", title: "Men's World Championship", where: "Meydenbauer Center, Bellevue", image: "/event/yusuf-khan-gaultier-2015.jpg", icon: "2015" },
  { year: "2014", title: "World-champion exhibitions", where: "PRO Club, Bellevue", image: "/gallery/gallery-18.jpg", icon: "2014" },
];
