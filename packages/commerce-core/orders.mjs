// Order management with truthful state transitions.
// A state must only advance when the action actually completes.
import { nanoid } from './nanoid.mjs';

// Mirrors contracts/state-transitions.json
export const VALID_TRANSITIONS = new Map([
  ['pending',           ['fulfilled', 'ownership_granted', 'packed', 'cancelled']],
  ['packed',            ['shipped', 'cancelled']],
  ['shipped',           ['delivered']],
  ['fulfilled',         ['refunded']],
  ['ownership_granted', ['refunded']],
  ['delivered',         ['refunded']],
  // terminal states — no outbound transitions
  ['refunded',          []],
  ['cancelled',         []],
]);

export function createOrder(checkout) {
  if (checkout.status !== 'completed') throw new Error('createOrder: checkout must be completed');
  const now = new Date().toISOString();
  return {
    order_id: nanoid(),
    session_id: checkout.session_id,
    checkout_id: checkout.checkout_id,
    items: checkout.items.map((i) => ({ ...i })),
    total_cents: checkout.total_cents,
    state: 'pending',
    created_at: now,
    updated_at: now,
    state_history: [],
  };
}

export function transitionOrder(order, toState) {
  const allowed = VALID_TRANSITIONS.get(order.state);
  if (!allowed) throw new Error(`transitionOrder: unknown state "${order.state}"`);
  if (!allowed.includes(toState)) {
    throw new Error(`transitionOrder: invalid transition ${order.state} → ${toState}`);
  }
  const now = new Date().toISOString();
  return {
    ...order,
    state: toState,
    updated_at: now,
    state_history: [...order.state_history, { from: order.state, to: toState, at: now }],
  };
}
