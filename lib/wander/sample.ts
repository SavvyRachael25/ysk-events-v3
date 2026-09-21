import type { Board, Pin } from "./types";

/**
 * A starter board so the app is not empty on first open. Paris, because the
 * brief was "say I'm going to the Louvre today".
 *
 * Coordinates are approximate (well-known landmarks to within roughly a
 * block). Re-pin anything you plan to rely on with the location search in
 * the Add tab. The whole sample can be cleared from the board menu.
 */
const base = Date.parse("2026-09-01T00:00:00Z");

const p = (
  i: number,
  name: string,
  category: Pin["category"],
  area: string,
  lat: number,
  lng: number,
  note: string,
  tags: string[] = [],
): Pin => ({
  id: `sample-${i}`,
  name,
  category,
  trip: "Paris",
  area,
  note,
  tags,
  lat,
  lng,
  visited: false,
  createdAt: base + i * 60_000,
});

export const SAMPLE_PINS: Pin[] = [
  p(1, "The Louvre", "museum", "1er", 48.8606, 2.3376, "Go straight to the Richelieu wing, skip the pyramid queue.", ["big day"]),
  p(2, "Musée de l'Orangerie", "museum", "Tuileries", 48.8638, 2.3227, "Monet's water lilies in the oval rooms. Small, quiet, an hour.", ["rainy day"]),
  p(3, "Musée d'Orsay", "museum", "7e", 48.86, 2.3266, "The clock window photo. Late opening Thursdays.", ["golden hour"]),
  p(4, "Palais-Royal gardens", "park", "1er", 48.8637, 2.3372, "Striped columns, the fountain chairs, a pastry on a bench.", ["solo"]),
  p(5, "Galerie Vivienne", "shop", "2e", 48.8667, 2.3395, "Covered passage with mosaic floors. Wander, don't shop.", ["rainy day"]),
  p(6, "Angelina", "cafe", "Rivoli", 48.8651, 2.3284, "The Mont-Blanc and the thick hot chocolate.", ["treat"]),
  p(7, "Café de Flore", "cafe", "Saint-Germain", 48.8541, 2.3326, "Sit outside, order one thing, stay two hours.", ["people watching"]),
  p(8, "Shakespeare and Company", "shop", "Latin Quarter", 48.8526, 2.3471, "Get a book stamped. The café next door for after.", []),
  p(9, "Jardin du Luxembourg", "park", "6e", 48.8462, 2.3372, "Green chairs by the pond. Bring the book from Shakespeare.", ["solo", "sunny"]),
  p(10, "Le Bon Marché", "shop", "7e", 48.8508, 2.3243, "La Grande Épicerie downstairs for edible souvenirs.", ["gifts"]),
  p(11, "Merci", "shop", "Haut-Marais", 48.86, 2.3676, "The red Fiat in the courtyard. Linen and notebooks.", ["gifts"]),
  p(12, "Marché des Enfants Rouges", "restaurant", "Haut-Marais", 48.8628, 2.3623, "Oldest covered market. Eat at whichever stall has a line.", ["lunch"]),
  p(13, "Place des Vosges", "landmark", "Marais", 48.8555, 2.3655, "Arcades all the way around. Sit in the square.", ["sunny"]),
  p(14, "Canal Saint-Martin", "view", "10e", 48.8718, 2.3655, "Iron footbridges. Evening light on the water.", ["golden hour"]),
  p(15, "Du Pain et des Idées", "bakery", "10e", 48.871, 2.3628, "Escargot pistache. Closed weekends, go early.", ["breakfast"]),
  p(16, "Sacré-Cœur", "landmark", "Montmartre", 48.8867, 2.3431, "Climb for the view, then get lost in the streets behind it.", ["big day", "golden hour"]),
  p(17, "Sainte-Chapelle", "landmark", "Île de la Cité", 48.8554, 2.345, "Stained glass. Go when the sun is out.", ["sunny"]),
  p(18, "Pont des Arts", "view", "1er", 48.8583, 2.3375, "The bridge between the Louvre and Saint-Germain. Sunset spot.", ["golden hour"]),
];

export const SAMPLE_BOARD: Board = {
  version: 1,
  title: "Christine's Wanderboard",
  handle: "slaystine",
  sample: true,
  pins: SAMPLE_PINS,
};

export const EMPTY_BOARD: Board = {
  version: 1,
  title: "Christine's Wanderboard",
  handle: "slaystine",
  pins: [],
};
