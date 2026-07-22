// Checkout operations — deterministic, no real payment processing.
import { nanoid } from './nanoid.mjs';

export function createCheckout(cart) {
  if (!cart.session_id) throw new Error('createCheckout: cart must have session_id');
  if (cart.items.length === 0) throw new Error('createCheckout: cannot checkout empty cart');
  return {
    checkout_id: nanoid(),
    session_id: cart.session_id,
    items: cart.items.map((i) => ({ ...i })),
    total_cents: cart.total_cents,
    status: 'open',
  };
}

export function completeCheckout(checkout) {
  if (checkout.status !== 'open') throw new Error(`completeCheckout: checkout is ${checkout.status}, not open`);
  return {
    ...checkout,
    status: 'completed',
    completed_at: new Date().toISOString(),
  };
}
