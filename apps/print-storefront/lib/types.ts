export type Format = 'A4' | 'A3' | 'Letter';

export interface Poster {
  id: string;
  title: string;
  artist: string;
  price_cents: number;
  currency: 'USD';
  category: string;
  description: string;
  available_formats: Format[];
  art_palette: 'sage' | 'parchment' | 'slate';
}

export interface CartItem {
  poster_id: string;
  format: Format;
  quantity: 1; // always 1 per line
}

export interface Cart {
  items: CartItem[];
  promo_code: string | null;
  discount_percent: number;
}

export type OrderState = 'placed' | 'download_ready' | 'cancelled';

export interface OrderItem {
  poster_id: string;
  format: Format;
  price_cents: number;
  downloaded: boolean;
}

export interface Order {
  id: string;
  items: OrderItem[];
  promo_code: string | null;
  discount_percent: number;
  total_cents: number;
  email: string;
  state: OrderState;
  placed_at: string; // ISO
}
