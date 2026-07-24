'use client';
import type { Cart, CartItem, Format } from './types';
import { applyDiscount } from './format';

const KEY = 'tableau_cart';
const PROMOS: Record<string, number> = { FIRST15: 15, WELCOME10: 10 };

function read(): Cart {
  if (typeof window === 'undefined') return empty();
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? 'null') ?? empty();
  } catch {
    return empty();
  }
}

function empty(): Cart {
  return { items: [], promo_code: null, discount_percent: 0 };
}

function save(cart: Cart): void {
  localStorage.setItem(KEY, JSON.stringify(cart));
}

export function getCart(): Cart {
  return read();
}

export function addToCart(poster_id: string, format: Format): Cart {
  const cart = read();
  const existing = cart.items.findIndex((i) => i.poster_id === poster_id && i.format === format);
  if (existing === -1) cart.items.push({ poster_id, format, quantity: 1 });
  save(cart);
  return cart;
}

export function removeFromCart(poster_id: string, format: Format): Cart {
  const cart = read();
  cart.items = cart.items.filter((i) => !(i.poster_id === poster_id && i.format === format));
  save(cart);
  return cart;
}

export function clearCart(): Cart {
  const cart = empty();
  save(cart);
  return cart;
}

export function applyPromo(code: string): { cart: Cart; error: string | null } {
  const pct = PROMOS[code.trim().toUpperCase()];
  if (!pct) return { cart: read(), error: `"${code}" is not a valid promo code.` };
  const cart = read();
  cart.promo_code = code.trim().toUpperCase();
  cart.discount_percent = pct;
  save(cart);
  return { cart, error: null };
}

export function removePromo(): Cart {
  const cart = read();
  cart.promo_code = null;
  cart.discount_percent = 0;
  save(cart);
  return cart;
}

export function cartTotal(cart: Cart, prices: Record<string, number>): number {
  const sub = cart.items.reduce((sum, i) => sum + (prices[i.poster_id] ?? 0), 0);
  return applyDiscount(sub, cart.discount_percent);
}
