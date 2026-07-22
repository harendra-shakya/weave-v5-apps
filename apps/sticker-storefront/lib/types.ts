export type Size = 'A6' | 'A5';
export type Finish = 'Matte' | 'Glossy' | 'Clear matte';

export interface VariantSelection {
  size: Size;
  finish: Finish;
  sheets: number;
}

export interface PackPricing {
  baseCents: number;
  sizeDeltaCents: Record<Size, number>;
  finishDeltaCents: Record<Finish, number>;
  extraSheetCents: number;
}

/** Simple-shape placeholder sticker (synthetic, public-safe — no real art). */
export interface StickerShape {
  shape: 'circle' | 'squircle' | 'pill' | 'diamond';
  /** token color name resolved by <StickerPlaceholder>, e.g. 'mint' | 'pink' | 'art-blue' */
  color: string;
  /** relative size 1–3 */
  size: 1 | 2 | 3;
}

export interface Pack {
  id: string;
  name: string;
  artist: string;
  description: string;
  /** named contents — "what you see ships" */
  contents: string[];
  sizes: Size[];
  finishes: Finish[];
  sheetsAvailable: number[];
  pricing: PackPricing;
  stickers: StickerShape[];
}

export interface CartLine {
  packId: string;
  variant: VariantSelection;
  qty: number;
}

export type OrderStatus = 'ordered' | 'packed' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderLineSnapshot extends CartLine {
  packName: string;
  artist: string;
  unitCents: number;
}

export interface Order {
  id: string;
  lines: OrderLineSnapshot[];
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
  email: string;
  placedAt: string; // ISO
  status: OrderStatus;
  refundedCents?: number;
}
