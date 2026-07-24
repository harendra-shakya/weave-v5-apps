'use client';
import type { Order, OrderItem, OrderState, Cart } from './types';
import { getPoster } from './catalog';

const KEY = 'tableau_orders';
const CANCEL_WINDOW_MS = 30 * 60 * 1000;

function read(): Order[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(KEY) ?? '[]'); }
  catch { return []; }
}

function save(orders: Order[]): void {
  localStorage.setItem(KEY, JSON.stringify(orders));
}

export function getOrders(): Order[] { return read(); }
export function getOrder(id: string): Order | undefined { return read().find((o) => o.id === id); }

export function createOrder(params: { cart: Cart; prices: Record<string, number>; email: string }): Order {
  const { cart, prices, email } = params;
  const subtotal = cart.items.reduce((s, i) => s + (prices[i.poster_id] ?? 0), 0);
  const total_cents = Math.round(subtotal * (1 - cart.discount_percent / 100));
  const items: OrderItem[] = cart.items.map((i) => ({
    poster_id: i.poster_id,
    format: i.format,
    price_cents: prices[i.poster_id] ?? 0,
    downloaded: false,
  }));
  const order: Order = {
    id: `ORD-${Date.now().toString(36).toUpperCase()}`,
    items,
    promo_code: cart.promo_code,
    discount_percent: cart.discount_percent,
    total_cents,
    email,
    state: 'download_ready',
    placed_at: new Date().toISOString(),
  };
  const orders = read();
  orders.unshift(order);
  save(orders);
  return order;
}

export function markDownloaded(orderId: string, posterId: string): Order | undefined {
  const orders = read();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return undefined;
  const item = order.items.find((i) => i.poster_id === posterId);
  if (item) item.downloaded = true;
  save(orders);
  return order;
}

export function cancelOrder(id: string): { order: Order | undefined; error: string | null } {
  const orders = read();
  const order = orders.find((o) => o.id === id);
  if (!order) return { order: undefined, error: 'Order not found.' };
  const anyDownloaded = order.items.some((i) => i.downloaded);
  if (anyDownloaded) return { order, error: 'Cannot cancel after download. Contact support.' };
  const age = Date.now() - new Date(order.placed_at).getTime();
  if (age > CANCEL_WINDOW_MS) return { order, error: 'Cancellation window (30 min) has closed.' };
  order.state = 'cancelled';
  save(orders);
  return { order, error: null };
}

export function canCancel(order: Order): boolean {
  if (order.items.some((i) => i.downloaded) || order.state === 'cancelled') return false;
  return Date.now() - new Date(order.placed_at).getTime() <= CANCEL_WINDOW_MS;
}

export const STATE_COPY: Record<OrderState, { label: string; description: string }> = {
  placed:         { label: 'Order placed',      description: 'Payment received. Your download is being prepared.' },
  download_ready: { label: 'Ready to download', description: 'Your poster PDF is ready. Click the button below to download.' },
  cancelled:      { label: 'Cancelled',          description: 'This order has been cancelled. A refund (synthetic) has been recorded.' },
};
