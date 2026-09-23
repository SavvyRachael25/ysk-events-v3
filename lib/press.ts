/**
 * Press page content. The release mirrors PSA's announcement of
 * September 21, 2026 and adds the YSK angle. Every fact below is from that
 * announcement or from YSK's own record; nothing is projected.
 */
export const PSA_ANNOUNCEMENT =
  "https://www.psasquashtour.com/featured-news/seattle-and-bellevue-washington-to-host-squash-final-qualifier-ahead-of-la28-olympic-games/";

export const RELEASE = {
  dateline: "BELLEVUE, Wash., September 21, 2026",
  headline: "The last road to the Olympics runs through Washington: squash's Final Qualifier comes to Seattle and Bellevue, June 6 to 10, 2028",
  paragraphs: [
    "The Squash Final Qualifier, the last chance for players to earn a place at squash's first Olympic tournament, will be held in Seattle and Bellevue, Washington, from June 6 to 10, 2028, presented by YSK Events. The announcement was made today by the Professional Squash Association with World Squash and US Squash.",
    "Twenty-four men and twenty-four women who have not yet secured a place at the Los Angeles 2028 Games will compete in two draws. The winner of each qualifies for LA28. Early rounds are played at PRO Club in Bellevue; the later rounds and the finals move to an all-glass court in Seattle.",
    "Squash makes its Olympic debut at LA28, where 16 men and 16 women will compete for medals at the Comcast Squash Center at Universal Studios in Los Angeles. Fifteen players in each draw have already qualified through the Continental Games, the PSA World Rankings, and Universality places. Washington decides the last two.",
    "YSK Events, a Bellevue-based 501(c)(3) founded by the Khan family, has brought the sport's biggest events to the region before: the 2015 Men's World Championship at Meydenbauer Center, the first ever held on U.S. soil, and the 2024 PSA World Tour Finals in Bellevue, where the top eight men and women in the world competed.",
  ],
  quote: {
    text: "Hosting the final qualifying tournament for LA28 is a dream come true. This is about far more than hosting a sporting event, it is an opportunity to welcome the world to Seattle and Bellevue.",
    who: "Shabana Khan, CEO and Founder, YSK Events",
    source: "from the PSA announcement",
  },
  closing: "Venue details for the Seattle rounds, tickets, and hospitality will be announced. Fans can sign up to hear first at www.yskevents.com. Sponsorship inquiries: www.yskevents.com/sponsors.",
  boilerplate:
    "YSK Events is a 501(c)(3) nonprofit founded by the Khan family, holders of seven world number one rankings, to grow squash in the United States. Since 2013 it has hosted world championship and world tour events in Bellevue, Washington, and runs youth clinics and scholarship court time at no cost to scholarship athletes. www.yskevents.com",
};

/**
 * Second release: YSK's own story, for local, community and South Asian
 * press. No invented quotes; the Shabana line is from the PSA announcement.
 */
export const RELEASE_2 = {
  dateline: "BELLEVUE, Wash., September 22, 2026",
  headline: "From Pakistan to Seattle to the Olympics: the Khan family will welcome the world to Washington in 2028",
  paragraphs: [
    "When the Squash Final Qualifier for the Los Angeles 2028 Olympic Games comes to Seattle and Bellevue on June 6 to 10, 2028, it will be presented by a family that carried the game across the world and planted it in the Pacific Northwest.",
    "YSK Events is named for Yusuf Khan, who brought squash from Pakistan to Seattle and taught it here for decades. The Khan family holds seven world number one rankings. His daughter, Shabana Khan, founded YSK Events as a 501(c)(3) nonprofit and led the two largest squash events ever held in the region: the 2015 Men's World Championship at Meydenbauer Center, the first on U.S. soil, and the 2024 PSA World Tour Finals in Bellevue.",
    "The 2028 event decides the last two places at squash's first Olympic tournament. Forty-eight players who have not yet qualified, twenty-four men and twenty-four women, compete in two draws. Early rounds are played at PRO Club in Bellevue; the finals move to an all-glass court in Seattle.",
    "Alongside the tournament, YSK Events runs youth clinics and scholarship court time with Title I schools across the Bellevue to Seattle corridor, at no cost to scholarship athletes, directed by Head Coach Azam Khan. Original squash art by Sharif Khan is shown and auctioned at YSK events, with proceeds supporting those programs.",
  ],
  quote: {
    text: "This is about far more than hosting a sporting event, it is an opportunity to welcome the world to Seattle and Bellevue.",
    who: "Shabana Khan, CEO and Founder, YSK Events",
    source: "from the PSA announcement",
  },
  closing: "Community organizations, schools and clubs that want to be part of the road to 2028 can reach YSK Events at hello@yskevents.com. Sponsorship: www.yskevents.com/sponsors. Venue and ticket news first: www.yskevents.com.",
};

export const LOGOS = [
  { name: "YSK Events, deep green", src: "/brand/ysk-events-deep-green.png", bg: "#ffffff" },
  { name: "YSK Events, citron", src: "/brand/ysk-events-citron.png", bg: "#123d32" },
  { name: "YSK Events, pink", src: "/brand/ysk-events-pink.png", bg: "#ffffff" },
];

export const FACTS = [
  ["Event", "Squash Final Qualifier for the Los Angeles 2028 Olympic Games"],
  ["Dates", "June 6 to 10, 2028"],
  ["Where", "Early rounds at PRO Club, Bellevue. Later rounds and finals on an all-glass court in Seattle, venue to be announced."],
  ["Format", "Men's and women's draws of 24. The winner of each draw qualifies for LA28."],
  ["Presented by", "YSK Events, a 501(c)(3) nonprofit, Bellevue, Washington"],
  ["Sanction", "Professional Squash Association, with World Squash and US Squash"],
  ["The Games", "Squash's Olympic debut, LA28. 16 men and 16 women. Comcast Squash Center at Universal Studios, Los Angeles."],
];

export const PRESS_PHOTOS = [
  { src: "/event/worlds-bellevue-hero.jpg", caption: "A women's match at the 2023-24 PSA World Tour Finals, Bellevue. Photo: Nettrom, CC BY-SA 4.0." },
  { src: "/event/khan-family-2015.jpg", caption: "Yusuf Khan and family, front row, 2015 Men's World Championship, Bellevue. Photo: YSK Events." },
  { src: "/event/glass-court-venue.jpg", caption: "The all-glass show court at the 2015 Men's World Championship, Bellevue. Photo: YSK Events." },
  { src: "/event/trophy-lift.jpg", caption: "The 2015 world championship trophy lift in Bellevue. Photo: YSK Events." },
  { src: "/event/glass-court-player.jpg", caption: "On the glass court between points. Photo: YSK Events." },
];
