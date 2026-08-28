/**
 * Gallery image data. Real pixel dimensions so the masonry grid can
 * preserve each photo's natural aspect ratio. Alt text stays neutral:
 * we don't have verified scene descriptions for these photos.
 */

export type GalleryImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

const DIMENSIONS: ReadonlyArray<readonly [number, number, number]> = [
  [1, 2500, 1677],
  [2, 2500, 2768],
  [3, 2500, 1886],
  [4, 2500, 1576],
  [5, 2500, 1542],
  [6, 2500, 1443],
  [7, 2500, 1358],
  [8, 2500, 1502],
  [9, 2500, 1669],
  [10, 2500, 1498],
  [11, 2500, 1598],
  [12, 2500, 1448],
  [13, 2500, 2321],
  [14, 2500, 1600],
  [15, 2500, 2404],
  [16, 2500, 1406],
  [17, 2500, 1779],
  [18, 2500, 1959],
  [19, 2500, 1667],
  [20, 2500, 1616],
];

export const GALLERY: GalleryImage[] = DIMENSIONS.map(([n, width, height]) => ({
  src: `/gallery/gallery-${String(n).padStart(2, "0")}.jpg`,
  width,
  height,
  alt: `YSK Events photo ${n} of ${DIMENSIONS.length}`,
}));
