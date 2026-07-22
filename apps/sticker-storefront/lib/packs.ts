import type { Pack, VariantSelection } from './types';

/**
 * Typed placeholder catalog — synthetic, public-safe. Pack names and artists
 * are fictional; artwork is generated from simple shapes (see StickerPlaceholder).
 * Swap this module for the real data source; everything downstream is typed
 * against `Pack`.
 */
export const PACKS: Pack[] = [
  {
    id: 'field-notes-botanical',
    name: 'Field Notes: Botanical',
    artist: 'Junia Vale',
    description:
      'Pressed-leaf sprigs and seed dots in quiet greens — drawn for margins, headers, and habit trackers.',
    contents: ['4 leaf sprigs', '3 seed dots', '2 stem dividers', '2 corner vines', '1 large fern'],
    sizes: ['A6', 'A5'],
    finishes: ['Matte', 'Clear matte'],
    sheetsAvailable: [1, 2, 3],
    pricing: {
      baseCents: 700,
      sizeDeltaCents: { A6: 0, A5: 300 },
      finishDeltaCents: { Matte: 0, Glossy: 50, 'Clear matte': 100 },
      extraSheetCents: 450,
    },
    stickers: [
      { shape: 'pill', color: 'mint', size: 3 },
      { shape: 'circle', color: 'mint', size: 1 },
      { shape: 'squircle', color: 'sun', size: 2 },
      { shape: 'pill', color: 'mint-deep', size: 2 },
      { shape: 'circle', color: 'sun', size: 1 },
      { shape: 'diamond', color: 'mint', size: 2 },
    ],
  },
  {
    id: 'quiet-hours',
    name: 'Quiet Hours',
    artist: 'Marta Ilves',
    description:
      'Moons, half-lights, and small stars for evening pages — the slow end of the day, in pink and plum.',
    contents: ['5 moon phases', '4 small stars', '2 cloud banners', '1 large crescent'],
    sizes: ['A6', 'A5'],
    finishes: ['Matte', 'Glossy'],
    sheetsAvailable: [1, 2],
    pricing: {
      baseCents: 650,
      sizeDeltaCents: { A6: 0, A5: 300 },
      finishDeltaCents: { Matte: 0, Glossy: 75, 'Clear matte': 100 },
      extraSheetCents: 400,
    },
    stickers: [
      { shape: 'circle', color: 'pink', size: 3 },
      { shape: 'circle', color: 'purple-deep', size: 1 },
      { shape: 'diamond', color: 'pink', size: 1 },
      { shape: 'circle', color: 'pink-deep', size: 2 },
      { shape: 'diamond', color: 'purple-deep', size: 1 },
      { shape: 'circle', color: 'pink', size: 1 },
    ],
  },
  {
    id: 'desk-in-order',
    name: 'A Desk in Order',
    artist: 'Theo Brandt',
    description:
      'Tidy little objects — tabs, clips, and blocks — for people whose spreads look like well-kept desks.',
    contents: ['6 index tabs', '3 paper clips', '2 washi strips', '2 stamp blocks'],
    sizes: ['A6', 'A5'],
    finishes: ['Matte'],
    sheetsAvailable: [1, 2, 3],
    pricing: {
      baseCents: 600,
      sizeDeltaCents: { A6: 0, A5: 250 },
      finishDeltaCents: { Matte: 0, Glossy: 50, 'Clear matte': 100 },
      extraSheetCents: 380,
    },
    stickers: [
      { shape: 'squircle', color: 'art-orange', size: 2 },
      { shape: 'pill', color: 'art-blue', size: 3 },
      { shape: 'squircle', color: 'sun', size: 1 },
      { shape: 'pill', color: 'art-orange', size: 1 },
      { shape: 'squircle', color: 'art-blue', size: 2 },
    ],
  },
  {
    id: 'margins-and-asterisks',
    name: 'Margins & Asterisks',
    artist: 'Ada Quill',
    description:
      'Hand-inked marks for the edges of a page — asterisks, arrows, underlines, and small emphatic dots.',
    contents: ['5 asterisks', '4 arrows', '3 underline strokes', '3 emphasis dots'],
    sizes: ['A6'],
    finishes: ['Matte', 'Clear matte'],
    sheetsAvailable: [1, 2, 3],
    pricing: {
      baseCents: 550,
      sizeDeltaCents: { A6: 0, A5: 0 },
      finishDeltaCents: { Matte: 0, Glossy: 50, 'Clear matte': 90 },
      extraSheetCents: 350,
    },
    stickers: [
      { shape: 'diamond', color: 'purple-deep', size: 2 },
      { shape: 'pill', color: 'purple', size: 1 },
      { shape: 'circle', color: 'pink-deep', size: 1 },
      { shape: 'diamond', color: 'purple', size: 1 },
      { shape: 'pill', color: 'purple-deep', size: 2 },
      { shape: 'circle', color: 'purple-deep', size: 1 },
    ],
  },
  {
    id: 'sunroom-citrus',
    name: 'Sunroom Citrus',
    artist: 'Ines Okafor',
    description:
      'Warm slices and round fruits in sunshine and pink — a bright corner for meal plans and summer spreads.',
    contents: ['4 citrus slices', '3 whole fruits', '2 leaf pairs', '2 rind curls', '1 large half'],
    sizes: ['A6', 'A5'],
    finishes: ['Matte', 'Glossy'],
    sheetsAvailable: [1, 2],
    pricing: {
      baseCents: 750,
      sizeDeltaCents: { A6: 0, A5: 300 },
      finishDeltaCents: { Matte: 0, Glossy: 75, 'Clear matte': 100 },
      extraSheetCents: 480,
    },
    stickers: [
      { shape: 'circle', color: 'sun', size: 3 },
      { shape: 'circle', color: 'pink', size: 2 },
      { shape: 'pill', color: 'mint', size: 1 },
      { shape: 'circle', color: 'sun', size: 1 },
      { shape: 'squircle', color: 'pink', size: 1 },
    ],
  },
  {
    id: 'grid-and-grain',
    name: 'Grid & Grain',
    artist: 'Noor Fasel',
    description:
      'Quiet geometry — squares, grids, and grain lines for structured spreads that still feel handmade.',
    contents: ['6 grid squares', '4 grain lines', '3 corner brackets', '2 large blocks'],
    sizes: ['A6', 'A5'],
    finishes: ['Matte', 'Glossy', 'Clear matte'],
    sheetsAvailable: [1, 2, 3],
    pricing: {
      baseCents: 800,
      sizeDeltaCents: { A6: 0, A5: 350 },
      finishDeltaCents: { Matte: 0, Glossy: 60, 'Clear matte': 110 },
      extraSheetCents: 500,
    },
    stickers: [
      { shape: 'squircle', color: 'art-blue', size: 2 },
      { shape: 'squircle', color: 'purple-deep', size: 1 },
      { shape: 'squircle', color: 'mint', size: 3 },
      { shape: 'diamond', color: 'art-blue', size: 1 },
      { shape: 'squircle', color: 'purple', size: 2 },
    ],
  },
];

export const SHIPPING_FLAT_CENTS = 400; // tracked letter mail (synthetic)
export const FREE_SHIPPING_MIN_CENTS = 3000;

export function getPack(id: string): Pack | undefined {
  return PACKS.find((p) => p.id === id);
}

export function variantPrice(pack: Pack, v: VariantSelection): number {
  const { baseCents, sizeDeltaCents, finishDeltaCents, extraSheetCents } = pack.pricing;
  return baseCents + sizeDeltaCents[v.size] + finishDeltaCents[v.finish] + (v.sheets - 1) * extraSheetCents;
}

export function minPrice(pack: Pack): number {
  return variantPrice(pack, {
    size: pack.sizes[0],
    finish: pack.finishes[0],
    sheets: pack.sheetsAvailable[0],
  });
}

export function defaultVariant(pack: Pack): VariantSelection {
  return { size: pack.sizes[0], finish: pack.finishes[0], sheets: pack.sheetsAvailable[0] };
}

export function isValidVariant(pack: Pack, v: VariantSelection): boolean {
  return pack.sizes.includes(v.size) && pack.finishes.includes(v.finish) && pack.sheetsAvailable.includes(v.sheets);
}

export function variantLabel(v: VariantSelection): string {
  return `${v.size} · ${v.finish} · ${v.sheets} ${v.sheets === 1 ? 'sheet' : 'sheets'}`;
}

export function shippingCents(subtotalCents: number): number {
  return subtotalCents === 0 || subtotalCents >= FREE_SHIPPING_MIN_CENTS ? 0 : SHIPPING_FLAT_CENTS;
}
