/**
 * YSK Events — blog content (typed, structured for SEO + AEO).
 *
 * Posts are stored as block arrays so the renderer can map types to JSX
 * and so we can later swap this for an MDX/CMS pipeline without touching
 * components. Each post carries its own FAQ entries, which are emitted
 * as FAQPage JSON-LD on the post page.
 */

import type { FaqEntry } from "./seo";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id?: string }
  | { type: "h3"; text: string; id?: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; tone: "mint" | "gold" | "coral"; title: string; text: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  category: "Youth Programs" | "Olympic Pathway" | "Brand Story";
  datePublished: string; // ISO 8601
  dateModified?: string;
  author: string;
  readingMinutes: number;
  heroEyebrow: string;
  heroSubtitle: string;
  body: Block[];
  faq: FaqEntry[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "youth-squash-bellevue-parents-guide-2026",
    title:
      "Youth Squash in Bellevue: A 2026 Parent's Guide to Getting Started",
    description:
      "A practical, parent-friendly guide to youth squash in Bellevue — what the sport actually is, why families on the Eastside are signing kids up, where to play at PRO Club, and what scholarship programs cover.",
    excerpt:
      "If you've heard the word \"squash\" thrown around at school pickup or seen LA28 in the news, you're in the right place. Here's the honest, no-jargon guide to getting your kid into squash on the Eastside.",
    category: "Youth Programs",
    datePublished: "2026-04-15",
    author: "YSK Events",
    readingMinutes: 8,
    heroEyebrow: "For Bellevue & Eastside Parents",
    heroSubtitle:
      "What squash actually is, why it's catching on with Eastside families, and how to get your kid on a court — at PRO Club Bellevue or at a free community clinic.",
    body: [
      {
        type: "p",
        text: "Every couple of weeks a parent asks us some version of the same question: \"My kid is bouncing off the walls — would squash actually work for them?\" The short answer is almost always yes. The longer answer is what this guide is for.",
      },
      {
        type: "p",
        text: "Squash has quietly become one of the most parent-friendly youth sports in the country. It's a year-round indoor sport — no rained-out tournaments. It rewards focus and patience over raw size. It's individual, so kids can't hide on the bench. And it's about to make its Olympic debut at LA28, which means college programs are scaling up fast and recruitment is heating up. If you're on the Eastside, you're sitting on top of one of the deepest squash benches in the United States. Here's how to use it.",
      },
      {
        type: "h2",
        text: "What is squash, really?",
        id: "what-is-squash",
      },
      {
        type: "p",
        text: "Squash is a racquet sport played on an enclosed four-walled court. Two players take turns hitting a small rubber ball off the front wall — ricochets off the side and back walls are fair game. The rallies are fast, the rules are simple, and the strategy is closer to chess than to tennis: it's a sport of angles, deception, and endurance.",
      },
      {
        type: "p",
        text: "Forbes has named it the healthiest sport in the world more than once. It builds cardiovascular fitness, agility, and lower-body strength simultaneously, and it's low-contact — the injury profile is closer to swimming than to soccer or basketball.",
      },
      {
        type: "h2",
        text: "Why squash for kids? Five honest reasons.",
        id: "why-squash",
      },
      {
        type: "ol",
        items: [
          "It's a focus sport. Squash forces single-task attention for 30+ minutes at a stretch. Parents and teachers see the carryover in homework within weeks, not months.",
          "It scales with the kid. Your child doesn't need to be the tallest, fastest, or strongest. The best junior players in the world are not unusually tall or fast — they're disciplined and creative.",
          "College recruitment is real. Over 30 U.S. colleges field varsity squash teams, including most of the Ivy League. With LA28 driving growth, more programs are launching every year.",
          "It's a lifelong sport. We've coached kids whose parents played in college and still play three nights a week at 55. Squash sticks.",
          "It's coachable in a Pacific Northwest winter. Squash is indoor, climate-controlled, and 60 minutes door-to-door from most Eastside neighborhoods.",
        ],
      },
      {
        type: "callout",
        tone: "mint",
        title: "The PNW advantage",
        text: "Pacific Northwest squash has a deeper coaching bench than most parents realize. Three generations of the Khan family — including seven World No. 1 ranked players — train juniors right here in Bellevue. That's not marketing copy. That's the Seattle Times' phrasing: \"What the Andretti family is to auto racing, the Khan family is to squash.\"",
      },
      {
        type: "h2",
        text: "Where Eastside kids actually play",
        id: "where-to-play",
      },
      {
        type: "p",
        text: "YSK Events programs are based at PRO Club Bellevue (4455 148th Ave NE), where Head Coach Azam Khan directs a world-class squash program. PRO Club has the court infrastructure to support every level — from a six-year-old's first lesson to a nationally ranked junior's pre-tournament training block.",
      },
      {
        type: "p",
        text: "If you're not a PRO Club member, that's not a barrier. YSK Events runs scholarship-funded court time, free community clinics, and Title I school partnerships specifically so cost and membership status don't keep a kid off a court. We also coach at partner facilities across Seattle when scheduling makes more sense for a family's commute.",
      },
      {
        type: "h2",
        text: "What does it cost?",
        id: "cost",
      },
      {
        type: "p",
        text: "Honest answer: it depends on the program tier, and for many of our families it costs nothing.",
      },
      {
        type: "ul",
        items: [
          "Community Clinics — free for ages 5–18. No experience or equipment needed. We loan rackets and eyewear at the door.",
          "Scholarship-funded competitive coaching — $0 for qualifying families. Includes coaching, gear, and tournament travel support.",
          "Standard junior coaching — comparable to other private lesson rates in the Eastside, with package pricing for siblings and multi-month commitments.",
          "Squash Forward (flagship development program, launching 2026) — sliding-scale, with full scholarship spots reserved for Title I school recruits.",
        ],
      },
      {
        type: "p",
        text: "We're a 501(c)(3) nonprofit. That means donations are tax-deductible, and 100% of program funding goes to the kids — not overhead. If your family doesn't qualify for a scholarship spot but you'd like to help fund one, the Donate section of this site is the fastest path.",
      },
      {
        type: "h2",
        text: "What happens at the first lesson?",
        id: "first-lesson",
      },
      {
        type: "p",
        text: "Showing up is the hard part. Once a kid is on the court, the first lesson is mostly play. Coaches assess hand-eye, footwork, and attention span in the first 15 minutes through games — not drills. Parents are welcome to watch from the gallery for the first session, but most families step away by week two so kids can build their own relationship with the coach.",
      },
      {
        type: "p",
        text: "What to bring: athletic clothes (no special uniform), non-marking court shoes, water. We provide rackets, balls, and eyewear for new players. Most kids know within three sessions whether squash clicks for them — and most kids who try it stay.",
      },
      {
        type: "h2",
        text: "What about LA28?",
        id: "la28",
      },
      {
        type: "p",
        text: "Squash makes its Olympic debut at the Los Angeles 2028 Games. For an 11-year-old in 2026, LA28 is a stretch but not an impossibility — the U.S. team will be small, but it will be real. For a 7-year-old, LA32 and LA36 are realistic horizon points if the kid loves the sport.",
      },
      {
        type: "p",
        text: "Either way, the day-to-day reason to play squash isn't the Olympics — it's the focus, the friendships, the college pathway, and the fact that your kid will probably still be playing it at 50. The Olympics is a tailwind, not a target.",
      },
      {
        type: "h2",
        text: "What to do this week",
        id: "next-steps",
      },
      {
        type: "ol",
        items: [
          "Email hello@yskevents.com with your child's age and (rough) availability. We'll match you to the right program tier.",
          "Ask about the next free Community Clinic if you'd rather try before committing.",
          "If cost is a factor, say so directly. We have scholarship spots and we'd rather use them than waitlist a kid who'd love this sport.",
        ],
      },
    ],
    faq: [
      {
        question: "What age can my child start playing squash?",
        answer:
          "We start kids as young as five in our Community Clinics. The fundamentals — racket grip, ready position, ball tracking — are introduced through games, not drills. Most kids are ready for structured coaching around age seven, but we adapt to the individual child rather than the calendar.",
      },
      {
        question: "Do we need to be PRO Club members to train with YSK Events?",
        answer:
          "No. YSK Events programs welcome non-members, and our scholarship-funded spots are specifically designed for families without club access. Our flagship training facility is PRO Club Bellevue, but we also coach at partner facilities across the Seattle–Bellevue corridor.",
      },
      {
        question: "How much does youth squash cost in Bellevue?",
        answer:
          "Community Clinics are free. Scholarship-funded competitive coaching is $0 for qualifying families. Standard junior coaching is priced comparably to other Eastside private lessons. Because YSK Events is a 501(c)(3) nonprofit, no child is turned away for inability to pay.",
      },
      {
        question: "Is squash safer than other youth sports?",
        answer:
          "Generally yes. Squash is low-contact and the injury profile is closer to swimming than to soccer or basketball. The most common precaution is protective eyewear, which we require for all juniors and provide at the door for new players.",
      },
      {
        question: "Can my kid play squash competitively if they start late?",
        answer:
          "Absolutely. The U.S. squash junior pipeline is still small enough that committed players who start in their early teens can compete nationally within a few years. With LA28 expanding the sport, the window for late-starters is unusually wide right now.",
      },
    ],
  },
  {
    slug: "la28-olympic-squash-pacific-northwest-juniors",
    title:
      "LA28 Olympic Squash: What Pacific Northwest Junior Players Need to Know",
    description:
      "Squash makes its Olympic debut at the Los Angeles 2028 Games. Here's what that actually means for U.S. junior players, the qualification pathway, and why the Pacific Northwest is unusually well-positioned.",
    excerpt:
      "When the IOC added squash to LA28, it changed the math for every junior player in the country. Here's the unhyped version of what's coming, what to do about it, and where the Pacific Northwest fits in.",
    category: "Olympic Pathway",
    datePublished: "2026-04-22",
    author: "YSK Events",
    readingMinutes: 7,
    heroEyebrow: "LA28 Pathway",
    heroSubtitle:
      "Squash debuts at the Los Angeles 2028 Olympic Games. What the qualification path actually looks like, and why families in the Pacific Northwest have a structural advantage.",
    body: [
      {
        type: "p",
        text: "The headline is simple: squash will be contested at the Olympic Games for the first time in history at Los Angeles 2028. The follow-up question — \"so what does that mean for my kid?\" — is what this post is actually about.",
      },
      {
        type: "p",
        text: "We get this question a lot. Some of the answers are encouraging. Some are sobering. All of them are more concrete than the LA28 marketing reel suggests.",
      },
      {
        type: "h2",
        text: "What LA28 inclusion actually changes",
        id: "what-changes",
      },
      {
        type: "p",
        text: "Olympic inclusion does three things to a sport almost overnight. First, federal and federation funding scales — USA Squash and the broader U.S. squash ecosystem now have access to development resources that didn't exist in 2024. Second, college programs accelerate. When a sport has Olympic visibility, athletic directors who were on the fence about adding squash get off the fence. Third, the talent identification pipeline gets formal. Where junior development used to be informal and club-driven, you now see structured national pathways with measurable benchmarks.",
      },
      {
        type: "p",
        text: "The result is a window of opportunity that's unusually wide for U.S. juniors. The squash player pool in the United States is still small relative to the size of the country, which means the bar to make a national-level age group is reachable for a committed player in a way it isn't in tennis or swimming.",
      },
      {
        type: "callout",
        tone: "gold",
        title: "The math, briefly",
        text: "Squash at LA28 will field men's and women's singles. The U.S. team will be small — but it's the first one. For a junior who is already nationally ranked, LA32 and LA36 become realistic horizon points. For a junior just starting, this is the best moment in U.S. squash history to begin.",
      },
      {
        type: "h2",
        text: "How U.S. qualification works",
        id: "qualification",
      },
      {
        type: "p",
        text: "Olympic squash qualification is administered by the World Squash Federation in coordination with national governing bodies. Final 2028 qualification quotas and criteria are still being finalized, but the structure is broadly clear: a combination of world ranking, regional championship results, and a host-nation allocation for Team USA.",
      },
      {
        type: "p",
        text: "For a junior player, the practical implication is that the path to Olympic consideration runs through age-group national rankings, then college or PSA tour competition, then world ranking. That's the same path the world's top juniors have always taken — what's new is that there's now a U.S. Olympic destination at the end of it.",
      },
      {
        type: "h2",
        text: "Why the Pacific Northwest is structurally well-positioned",
        id: "pnw-advantage",
      },
      {
        type: "p",
        text: "Three things make the PNW unusual in the U.S. squash landscape:",
      },
      {
        type: "ol",
        items: [
          "Coaching depth. Three generations of the Khan family — seven World No. 1 ranked players — coach in this region. The PNW has a coaching density per junior player that rivals any region in the country.",
          "A flagship facility. PRO Club Bellevue houses tournament-grade courts, a developmental program, and the operational base for YSK Events. We hosted the first U.S.-soil Men's World Championship in 2015 here.",
          "A growing talent pipeline. Title I school partnerships, scholarship-funded court access, and structured developmental programs (Squash Forward, Competitive Training, LA28 Pathway) mean the region is set up to identify and develop talent that would otherwise never touch the sport.",
        ],
      },
      {
        type: "h2",
        text: "What committed juniors should be doing now",
        id: "what-to-do",
      },
      {
        type: "p",
        text: "If your child is already a tournament-level junior, the playbook for 2026–2028 is fairly settled:",
      },
      {
        type: "ul",
        items: [
          "Compete consistently in age-group nationals and the regional circuit. Ranking improvement is non-linear; consistent exposure is the input that drives it.",
          "Train with coaches who have themselves competed at the international level. Coaching quality compounds — five years with a world-class coach beats ten years of well-intentioned generalist instruction.",
          "Layer fitness and mental performance on top of court time. The athletes who advance in their late teens are the ones who treated squash as a four-pillar sport — technical, tactical, physical, and mental — from age 12 onward.",
          "Plan college pathways early. U.S. college squash programs are recruiting younger every year, and LA28 is accelerating that trend.",
        ],
      },
      {
        type: "h2",
        text: "What the rest of us should be doing",
        id: "for-everyone",
      },
      {
        type: "p",
        text: "Most kids who play squash will not stand on an Olympic podium. That's true in every sport, and squash is no exception. The reason to put your kid in squash isn't the medal. It's the focus, the resilience, the college pathway, and the lifelong relationship with a sport they can play in their fifties.",
      },
      {
        type: "p",
        text: "The Olympic story is a tailwind. It pulls more kids into the sport, brings more coaching investment to the region, and builds the depth of community that makes any youth sport sustainable. The kids who chase the medal benefit. The kids who never come close also benefit. That's the model.",
      },
      {
        type: "h2",
        text: "Where YSK Events fits",
        id: "ysk-fits",
      },
      {
        type: "p",
        text: "Our LA28 Pathway program (launching 2027) exists specifically to identify and develop Pacific Northwest juniors with Olympic potential, in alignment with US Squash sanctioning. It's not a separate league — it's a development track within our broader youth ecosystem, with a structured progression from Community Clinics through Competitive Training and into national-level competition.",
      },
      {
        type: "p",
        text: "If you'd like to be on the early-access list as the LA28 Pathway program opens, email hello@yskevents.com with your child's age and current squash experience. If you're not sure your child is ready for a developmental track, start with a Community Clinic — that's how most of our LA28 Pathway candidates began.",
      },
    ],
    faq: [
      {
        question: "When does Olympic squash debut?",
        answer:
          "Squash will be contested for the first time in Olympic history at the Los Angeles 2028 Games (LA28). The IOC announced inclusion as part of the LA28 sport program.",
      },
      {
        question: "How does a U.S. squash player qualify for the Olympics?",
        answer:
          "Olympic squash qualification combines world ranking, regional championship performance, and host-nation allocation, administered by the World Squash Federation in coordination with USA Squash. Final 2028 quotas and criteria are still being finalized.",
      },
      {
        question: "Is it too late for a 13-year-old to start squash and aim for the Olympics?",
        answer:
          "Realistically, LA28 itself is unlikely for a 13-year-old just beginning. LA32 and LA36 are reasonable horizon points for a committed player. Because the U.S. squash player pool is still small, late starters who train seriously can reach national-ranked play within a few years.",
      },
      {
        question: "What's the LA28 Pathway program at YSK Events?",
        answer:
          "The LA28 Pathway is a developmental track for Pacific Northwest juniors with Olympic potential, launching in 2027. It's a structured progression within our existing youth ecosystem — beginning at Community Clinics, advancing through Competitive Training, and into US Squash–sanctioned national competition.",
      },
      {
        question: "Where will I be able to watch Olympic squash in 2028?",
        answer:
          "Squash matches at LA28 will be hosted at the Los Angeles Convention Center. Broadcast coverage will be handled through standard Olympic broadcast partners; specific U.S. coverage details will be announced closer to the Games.",
      },
    ],
  },
  {
    slug: "khan-family-american-squash-bellevue-history",
    title:
      "How the Khan Family Built American Squash from Bellevue",
    description:
      "From Yusuf Khan's 1968 arrival in Seattle to the 2015 World Championship and a 2024 Hall of Fame induction — a short history of the family that put Pacific Northwest squash on the map.",
    excerpt:
      "Three generations. Seven World No. 1 rankings. One family. Here's the story of how the Khans turned Bellevue into one of the deepest squash communities in the United States.",
    category: "Brand Story",
    datePublished: "2026-04-29",
    author: "YSK Events",
    readingMinutes: 9,
    heroEyebrow: "Brand Story",
    heroSubtitle:
      "Yusuf Khan brought squash to Seattle in 1968. Three generations later, his family is still building it — now for a new generation of Pacific Northwest kids.",
    body: [
      {
        type: "quote",
        text: "What the Andretti family is to auto racing, the local Khan family is to squash. There have been seven Khans ranked No. 1 in the world.",
        cite: "The Seattle Times",
      },
      {
        type: "p",
        text: "It's a strong claim and the Seattle Times made it without hedging. Most of the time when a sport has a \"first family,\" they're a famous one or two — a parent who played and a kid who turned pro. The Khans are something different. Three generations. Seven World No. 1 rankings. National titles, Pan American gold, a Hall of Fame induction in 2024, and the first Men's World Squash Championship ever held on U.S. soil — staged right here in Bellevue.",
      },
      {
        type: "p",
        text: "If you've ever wondered why a small city east of Seattle ended up with one of the deepest junior squash scenes in the country, this is the answer.",
      },
      {
        type: "h2",
        text: "1968: Yusuf Khan arrives in Seattle",
        id: "1968",
      },
      {
        type: "p",
        text: "Yusuf Khan was a 10-time All-India squash champion when he arrived in Seattle in 1968. He took the head pro position at the Seattle Tennis Club, and over the next several decades he became, more or less single-handedly, the founding figure of Pacific Northwest squash. He later founded the Seattle Athletic Club and trained generations of Northwest players. He remained a presence in the squash community until his passing in 2018.",
      },
      {
        type: "p",
        text: "The point worth pausing on: in 1968, squash in the Pacific Northwest essentially didn't exist as a developed sport. Yusuf didn't inherit a community. He built one. Every junior player in this region today — every kid showing up to a Community Clinic at PRO Club — is downstream of that decision.",
      },
      {
        type: "h2",
        text: "The next generation: a national dynasty",
        id: "next-generation",
      },
      {
        type: "p",
        text: "Yusuf's children carried the sport forward at the highest competitive levels. Two of them — Shabana Khan and Latasha Khan — became Women's National Squash Champions and dominated the U.S. women's circuit through the 1990s and 2000s, often meeting each other in national finals.",
      },
      {
        type: "ul",
        items: [
          "Shabana Khan — former Women's National Squash Champion and professional player. Now Founder & CEO of YSK Events, the visionary behind both the 2015 World Championship and the organization's pivot toward youth development.",
          "Latasha Khan — former Women's National Champion who reached World No. 18, won two Pan American Games gold medals in 2003, and was inducted into the U.S. Squash Hall of Fame in 2024.",
          "Murad Khan — professional player turned operations leader. Now President of YSK Events, responsible for major events including the Yusuf Khan Invitational, and for building bridges between Pacific Northwest tech (Microsoft, Google) and the sport.",
          "Azam Khan — Head Coach at PRO Club Bellevue and Director at YSK Events, focused on coaching excellence and player development across Washington State.",
        ],
      },
      {
        type: "p",
        text: "Across the family, seven Khans have held a World No. 1 ranking. That's a sentence that's almost impossible to write about another family in any sport.",
      },
      {
        type: "h2",
        text: "2015: The first U.S.-soil Men's World Championship",
        id: "2015-worlds",
      },
      {
        type: "p",
        text: "In 2015, Shabana Khan organized the Men's World Squash Championship in Bellevue — the first time the world's most prestigious individual squash tournament had ever been staged in the United States. It was a structurally significant moment for the sport in this country: U.S. squash had long been a serious participant in international competition, but it had never been a host of the headline event. The 2015 Worlds changed that.",
      },
      {
        type: "p",
        text: "The tournament also signaled what the family was about to do next. Hosting a world championship is a thing professional sport does. The Khans pulled it off — and then immediately turned the operational and reputational capital they'd built into something that didn't yet exist: a youth development engine.",
      },
      {
        type: "h2",
        text: "2013–today: from professional events to youth development",
        id: "youth-pivot",
      },
      {
        type: "p",
        text: "YSK Events was founded in 2013, formally established as a 501(c)(3) nonprofit, with a deceptively simple mission: harness the power of squash to build focus, resilience, and opportunity for young people across the Pacific Northwest. After 2015, the organization quietly but decisively shifted its center of gravity toward that mission. Professional showcases didn't go away — but the strategic priority became kids.",
      },
      {
        type: "p",
        text: "That pivot now expresses itself in six programs:",
      },
      {
        type: "ul",
        items: [
          "Squash Forward — the flagship development program, integrating social-emotional learning with competitive squash. Recruiting from Title I schools across Bellevue and Seattle.",
          "Community Clinics — free introductory clinics for ages 5–18, with scholarship-funded access for underserved families.",
          "Squash + Academics — athletic training paired with academic enrichment, college prep, and 1-on-1 mentorship.",
          "Competitive Training — high-performance coaching for tournament-ready athletes, US Squash sanctioned.",
          "Squash Art Initiative — a culture program where youth explore identity and resilience through art and squash, featuring original works by Sharif Khan.",
          "LA28 Pathway — the Olympic development track, identifying and developing PNW juniors for the 2028 Games and beyond.",
        ],
      },
      {
        type: "h2",
        text: "2024: a Hall of Fame induction",
        id: "2024-hof",
      },
      {
        type: "p",
        text: "In 2024, Latasha Khan was inducted into the U.S. Squash Hall of Fame. The induction was a recognition of her playing career, but it landed at a moment that mattered for the family's broader project: the next generation of Khan-coached kids were already on the courts at PRO Club Bellevue, and the Hall of Fame ceremony underlined that the same family producing the coaches was also producing the lineage those coaches were drawing on.",
      },
      {
        type: "callout",
        tone: "mint",
        title: "Why this matters for your kid",
        text: "When a child shows up to a YSK clinic, they're not getting general youth instruction. They're getting coaching from a family that has produced seven World No. 1 players and that organized the first Men's World Championship on U.S. soil. That depth of expertise is being intentionally directed at developing kids — not at preserving a private legacy.",
      },
      {
        type: "h2",
        text: "What's next",
        id: "whats-next",
      },
      {
        type: "p",
        text: "The next chapter of the story is the one being written right now. LA28 is the headline event, but the long-arc bet is bigger: that with the right coaching, the right facilities, and the right access for kids who otherwise wouldn't touch this sport, the Pacific Northwest can produce a generation of squash players who carry the Khan family's standard forward — and that the sport itself, in the United States, finally enters its developed era.",
      },
      {
        type: "p",
        text: "If you want your kid to be part of that, the door is open. Email hello@yskevents.com or come to a Community Clinic. We don't gatekeep talent. We try to find it.",
      },
    ],
    faq: [
      {
        question: "Who founded YSK Events?",
        answer:
          "YSK Events was founded in 2013 by Shabana Khan, a former Women's National Squash Champion and professional player. Shabana also organized the 2015 Men's World Squash Championship in Bellevue, the first time the event was held in the United States.",
      },
      {
        question: "How many Khan family members have been ranked World No. 1 in squash?",
        answer:
          "Seven. Across three generations of the Khan family — beginning with Yusuf Khan, who brought squash to Seattle in 1968 — seven family members have held a World No. 1 ranking, an unprecedented record in U.S. squash.",
      },
      {
        question: "Where is the Khan family squash program based?",
        answer:
          "The Khan family squash program is based at PRO Club Bellevue (4455 148th Ave NE, Bellevue, WA), where Azam Khan serves as Head Coach. PRO Club is also the operational home of YSK Events youth programs.",
      },
      {
        question: "Was the 2015 World Squash Championship the first held in the U.S.?",
        answer:
          "Yes. The 2015 Men's World Squash Championship, organized by Shabana Khan and held in Bellevue, was the first time the World Squash Championship had ever been staged on United States soil.",
      },
      {
        question: "Is YSK Events still focused on professional squash events, or only youth development?",
        answer:
          "YSK Events has shifted its strategic priority toward youth development since 2013, with a deepening focus after 2015. The organization continues to host professional showcases — including the Yusuf Khan Invitational under Murad Khan's leadership — but the central mission is now building futures for Pacific Northwest youth through squash.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
