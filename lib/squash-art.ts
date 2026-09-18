import type { GalleryImage } from "@/lib/gallery";

/**
 * Sharif Khan's squash art, photographed at the YSK show during the 2024 PSA
 * World Tour Finals in Bellevue. Copy carried over from the previous
 * yskevents.com/squash-art page, which YSK cites in grant applications, so
 * the URL and the wording are kept.
 */
export const SQUASH_ART = {
  eyebrow: "Khan Artist",
  headline: "The game of squash is art in itself,",
  headlineAccent: "so we make it official.",
  body: "Original squash art is displayed and auctioned at every YSK event. Paint-covered squash balls, rackets, and canvas. Every piece is made the way the game is played: by hitting the ball.",
  artist: "Artwork by Sharif Khan",
  contact: "Sharif@yskevents.com",
  feature: {
    title: "555",
    image: "/squash-art/555.jpg",
    alt: "The painting 555 by Sharif Khan: hundreds of red squash-ball prints across a pale canvas",
    caption:
      "This piece pays homage to the great Jahangir Khan and his remarkable 555 match win streak. 555 paint covered squash balls were hit against the canvas in the making of this piece.",
  },
  credit: "Photographs from the YSK show at the 2024 PSA World Tour Finals, Bellevue. Artwork and photographs copyright YSK Events.",
};

const DIMS: ReadonlyArray<readonly [number, number, number]> = [
  [1, 1800, 1200], [2, 1800, 1200], [3, 1800, 1200], [4, 1800, 1200], [5, 1800, 1200],
  [6, 1800, 1200], [7, 1800, 1200], [8, 1800, 1200], [9, 1800, 1200], [10, 1800, 1200],
  [11, 1800, 1200], [12, 1800, 1200], [13, 1800, 1200], [14, 1800, 1200], [15, 1800, 1200],
  [16, 1800, 1200], [17, 1800, 1200], [18, 1800, 1200], [19, 1800, 1200], [20, 1800, 1200],
];

export const SQUASH_ART_GALLERY: GalleryImage[] = DIMS.map(([n, width, height]) => ({
  src: `/squash-art/art-${String(n).padStart(2, "0")}.jpg`,
  width,
  height,
  alt: `Squash art by Sharif Khan on show at the 2024 PSA World Tour Finals in Bellevue, photo ${n}`,
}));
