import type { CartLine, Order, OrderStatus } from './types';
import { getPack, shippingCents, variantPrice } from './packs';

/** Synthetic order store (localStorage) — swap for the real order API on port. */
const STORAGE_KEY = 'marginalia.orders.v1';
export const STATUS_FLOW: OrderStatus[] = ['ordered', 'packed', 'shipped', 'delivered'];

function readAll(): Record<string, Order> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function writeAll(orders: Record<string, Order>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function createOrder(lines: CartLine[], email: string): Order {
  const snapshots = lines.flatMap((l) => {
    const pack = getPack(l.packId);
    return pack
      ? [{ ...l, packName: pack.name, artist: pack.artist, unitCents: variantPrice(pack, l.variant) }]
      : [];
  });
  const subtotalCents = snapshots.reduce((s, l) => s + l.unitCents * l.qty, 0);
  const shipping = shippingCents(subtotalCents);
  const order: Order = {
    id: `MRG-${Date.now().toString(36).toUpperCase().slice(-6)}`,
    lines: snapshots,
    subtotalCents,
    shippingCents: shipping,
    totalCents: subtotalCents + shipping,
    email,
    placedAt: new Date().toISOString(),
    status: 'ordered',
  };
  const all = readAll();
  all[order.id] = order;
  writeAll(all);
  return order;
}

export function getOrder(id: string): Order | undefined {
  return readAll()[id];
}

/** Demo-only helper — real fulfillment events come from the backend. */
export function advanceOrder(id: string): Order | undefined {
  const all = readAll();
  const order = all[id];
  if (!order || order.status === 'cancelled') return order;
  const i = STATUS_FLOW.indexOf(order.status);
  if (i < STATUS_FLOW.length - 1) {
    order.status = STATUS_FLOW[i + 1];
    writeAll(all);
  }
  return order;
}

export function canCancel(order: Order): boolean {
  return order.status === 'ordered' || order.status === 'packed';
}

export function cancelOrder(id: string): Order | undefined {
  const all = readAll();
  const order = all[id];
  if (!order || !canCancel(order)) return order;
  order.status = 'cancelled';
  order.refundedCents = order.totalCents;
  writeAll(all);
  return order;
}
