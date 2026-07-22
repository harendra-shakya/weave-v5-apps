/**
 * OneReel — placeholder catalog data.
 * Synthetic / public-safe: fictional titles, fictional makers, gradient
 * posters instead of real stills. Swap this module for a real data source —
 * components consume only the `Film` type.
 */

export interface Film {
  /** URL slug, e.g. /films/salt-on-the-windowsill */
  id: string;
  title: string;
  /** The filmmaker — always visible wherever the film appears (brand proof point). */
  maker: string;
  year: number;
  runtimeMin: number;
  priceCents: number;
  /** One-sentence hook shown on cards. */
  logline: string;
  /** Short paragraph for the film detail page. */
  synopsis: string;
  /** Placeholder poster gradient (no real imagery — public-safe). */
  poster: { from: string; to: string };
}

export const films: Film[] = [
  {
    id: "salt-on-the-windowsill",
    title: "Salt on the Windowsill",
    maker: "Mara Okonkwo",
    year: 2026,
    runtimeMin: 11,
    priceCents: 400,
    logline:
      "A grandmother's kitchen, a recipe with no measurements, and one last afternoon to learn it.",
    synopsis:
      "Shot in a single Lagos apartment over two days, Okonkwo's second short watches a granddaughter chase a dish that exists only in her grandmother's hands. What starts as a cooking lesson becomes an argument about everything the recipe was invented to survive.",
    poster: { from: "#8A9B8E", to: "#54655B" },
  },
  {
    id: "night-bus-to-aldgate",
    title: "Night Bus to Aldgate",
    maker: "Tomás Ferreira",
    year: 2025,
    runtimeMin: 14,
    priceCents: 500,
    logline:
      "Two strangers, one night bus, and the conversation neither of them meant to have.",
    synopsis:
      "Ferreira shot the whole film on a moving double-decker with a two-person crew. A nurse coming off shift and a man who missed his own leaving party ride east through London, trading half-truths until the truth gets on at the last stop.",
    poster: { from: "#5B6B7E", to: "#2E3947" },
  },
  {
    id: "the-projectionists-daughter",
    title: "The Projectionist's Daughter",
    maker: "June Nakamura",
    year: 2026,
    runtimeMin: 9,
    priceCents: 400,
    logline:
      "She grew up in the booth of a dying cinema. Tonight it closes — and one reel is missing.",
    synopsis:
      "A daughter threads the final screening at her father's single-screen cinema and discovers the last reel of the night has been swapped for something meant only for her. Nakamura's love letter to the booth, the beam, and the people who keep them lit.",
    poster: { from: "#C0A87B", to: "#8A7040" },
  },
  {
    id: "dust-choir",
    title: "Dust Choir",
    maker: "Ilya Brandt",
    year: 2025,
    runtimeMin: 16,
    priceCents: 600,
    logline:
      "In an emptying prairie town, the grain-elevator crew rehearses one last concert.",
    synopsis:
      "Part documentary, part staged requiem. Brandt spent a season with six workers whose elevator is scheduled for demolition, recording the songs they sing into its enormous, resonant dark.",
    poster: { from: "#9A8B99", to: "#5F4E5E" },
  },
  {
    id: "a-field-guide-to-leaving",
    title: "A Field Guide to Leaving",
    maker: "Priya Raghunathan",
    year: 2026,
    runtimeMin: 13,
    priceCents: 500,
    logline:
      "Two sisters pack their family home into thirty-seven boxes. Some of them refuse to close.",
    synopsis:
      "Raghunathan structures the film like a field guide — each box a chapter, each chapter a small negotiation over what a family keeps. Funny until it suddenly isn't.",
    poster: { from: "#B08B7E", to: "#74544B" },
  },
  {
    id: "winter-swimmers",
    title: "Winter Swimmers",
    maker: "Saoirse Deane",
    year: 2024,
    runtimeMin: 8,
    priceCents: 300,
    logline:
      "Every January morning, four retirees break the ice at the town lido. This year, one lane is empty.",
    synopsis:
      "Deane's early-morning documentary short, filmed over a single freezing week in County Clare. Steam, laughter, and a quiet accounting of who keeps showing up.",
    poster: { from: "#7FA3A8", to: "#435F63" },
  },
];

export function getFilm(id: string): Film | undefined {
  return films.find((f) => f.id === id);
}

export function formatPrice(cents: number): string {
  return cents % 100 === 0 ? `$${cents / 100}` : `$${(cents / 100).toFixed(2)}`;
}

export function formatRuntime(min: number): string {
  return `${min} min`;
}
