import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createCart, addToCart, removeFromCart, getCartTotal } from '../packages/commerce-core/cart.mjs';
import { createCheckout, completeCheckout } from '../packages/commerce-core/checkout.mjs';
import { createOrder, transitionOrder, VALID_TRANSITIONS } from '../packages/commerce-core/orders.mjs';
import { computeKPIs } from '../packages/commerce-core/kpi.mjs';
import { mulberry32 } from '../packages/commerce-core/rng.mjs';

// -- cart ---------------------------------------------------------------------

test('cart: createCart returns empty cart with session_id', () => {
  const cart = createCart('s1');
  assert.equal(cart.session_id, 's1');
  assert.deepEqual(cart.items, []);
  assert.equal(cart.total_cents, 0);
});

test('cart: addToCart adds an item and recomputes total', () => {
  const cart = createCart('s1');
  addToCart(cart, { item_id: 'film-001', unit_price_cents: 599, quantity: 1 });
  assert.equal(cart.items.length, 1);
  assert.equal(cart.total_cents, 599);
});

test('cart: addToCart accumulates same item', () => {
  const cart = createCart('s1');
  addToCart(cart, { item_id: 'pack-001', unit_price_cents: 1400, quantity: 1 });
  addToCart(cart, { item_id: 'pack-001', unit_price_cents: 1400, quantity: 1 });
  assert.equal(cart.items[0].quantity, 2);
  assert.equal(cart.total_cents, 2800);
});

test('cart: removeFromCart removes item', () => {
  const cart = createCart('s1');
  addToCart(cart, { item_id: 'film-001', unit_price_cents: 599 });
  removeFromCart(cart, 'film-001');
  assert.deepEqual(cart.items, []);
  assert.equal(cart.total_cents, 0);
});

test('cart: getCartTotal returns 0 for empty cart', () => {
  assert.equal(getCartTotal(createCart('s1')), 0);
});

// -- checkout -----------------------------------------------------------------

test('checkout: createCheckout from completed cart', () => {
  const cart = createCart('s2');
  addToCart(cart, { item_id: 'edition-001', unit_price_cents: 2500 });
  const co = createCheckout(cart);
  assert.equal(co.status, 'open');
  assert.equal(co.total_cents, 2500);
  assert.ok(co.checkout_id);
});

test('checkout: createCheckout throws on empty cart', () => {
  assert.throws(() => createCheckout(createCart('s2')), /empty cart/);
});

test('checkout: completeCheckout sets status and completed_at', () => {
  const cart = createCart('s2');
  addToCart(cart, { item_id: 'pack-001', unit_price_cents: 1400 });
  const co = completeCheckout(createCheckout(cart));
  assert.equal(co.status, 'completed');
  assert.ok(co.completed_at);
});

test('checkout: cannot complete a non-open checkout', () => {
  const cart = createCart('s2');
  addToCart(cart, { item_id: 'film-001', unit_price_cents: 599 });
  const co = completeCheckout(createCheckout(cart));
  assert.throws(() => completeCheckout(co), /not open/);
});

// -- orders -------------------------------------------------------------------

test('order: createOrder from completed checkout', () => {
  const cart = createCart('s3');
  addToCart(cart, { item_id: 'film-001', unit_price_cents: 599 });
  const order = createOrder(completeCheckout(createCheckout(cart)));
  assert.equal(order.state, 'pending');
  assert.ok(order.order_id);
  assert.deepEqual(order.state_history, []);
});

test('order: createOrder throws if checkout not completed', () => {
  const cart = createCart('s3');
  addToCart(cart, { item_id: 'film-001', unit_price_cents: 599 });
  assert.throws(() => createOrder(createCheckout(cart)), /completed/);
});

test('order: transitionOrder pending → fulfilled succeeds', () => {
  const cart = createCart('s3');
  addToCart(cart, { item_id: 'film-001', unit_price_cents: 599 });
  let order = createOrder(completeCheckout(createCheckout(cart)));
  order = transitionOrder(order, 'fulfilled');
  assert.equal(order.state, 'fulfilled');
  assert.equal(order.state_history.length, 1);
  assert.equal(order.state_history[0].from, 'pending');
  assert.equal(order.state_history[0].to, 'fulfilled');
});

test('order: transitionOrder pending → ownership_granted succeeds (Vitrine flow)', () => {
  const cart = createCart('s3');
  addToCart(cart, { item_id: 'edition-001', unit_price_cents: 2500 });
  let order = createOrder(completeCheckout(createCheckout(cart)));
  order = transitionOrder(order, 'ownership_granted');
  assert.equal(order.state, 'ownership_granted');
});

test('order: transitionOrder pending → packed → shipped → delivered (sticker flow)', () => {
  const cart = createCart('s4');
  addToCart(cart, { item_id: 'pack-001', unit_price_cents: 1400 });
  let order = createOrder(completeCheckout(createCheckout(cart)));
  order = transitionOrder(order, 'packed');
  order = transitionOrder(order, 'shipped');
  order = transitionOrder(order, 'delivered');
  assert.equal(order.state, 'delivered');
  assert.equal(order.state_history.length, 3);
});

test('order: invalid transition throws', () => {
  const cart = createCart('s5');
  addToCart(cart, { item_id: 'film-001', unit_price_cents: 599 });
  let order = createOrder(completeCheckout(createCheckout(cart)));
  order = transitionOrder(order, 'fulfilled');
  assert.throws(() => transitionOrder(order, 'packed'), /invalid transition/);
});

test('order: terminal state refunded cannot transition further', () => {
  const cart = createCart('s5');
  addToCart(cart, { item_id: 'film-001', unit_price_cents: 599 });
  let order = createOrder(completeCheckout(createCheckout(cart)));
  order = transitionOrder(order, 'fulfilled');
  order = transitionOrder(order, 'refunded');
  assert.throws(() => transitionOrder(order, 'pending'), /invalid transition/);
});

test('order: terminal state cancelled cannot transition further', () => {
  const cart = createCart('s5');
  addToCart(cart, { item_id: 'film-001', unit_price_cents: 599 });
  let order = createOrder(completeCheckout(createCheckout(cart)));
  order = transitionOrder(order, 'cancelled');
  assert.throws(() => transitionOrder(order, 'pending'), /invalid transition/);
});

// -- KPI ----------------------------------------------------------------------

test('kpi: computeKPIs from empty event list', () => {
  const kpis = computeKPIs([]);
  assert.equal(kpis.conversion_rate, 0);
  assert.equal(kpis.aov, 0);
  assert.equal(kpis.refund_rate, 0);
  assert.equal(kpis.guardrail_breach, false);
});

test('kpi: computeKPIs with basic funnel', () => {
  const events = [
    { user_id: 'u1', event: 'view', ts: 't' },
    { user_id: 'u1', event: 'engage', ts: 't' },
    { user_id: 'u1', event: 'convert', ts: 't', amount_cents: 599 },
    { user_id: 'u1', event: 'fulfill', ts: 't' },
    { user_id: 'u2', event: 'view', ts: 't' },
  ];
  const kpis = computeKPIs(events);
  assert.equal(kpis.conversion_rate, 0.5); // 1 convert / 2 views
  assert.equal(kpis.aov, 5.99);
  assert.equal(kpis.refund_rate, 0);
  assert.equal(kpis.guardrail_breach, false);
});

test('kpi: guardrail_breach true when refund_rate > 0.15', () => {
  const events = [
    { user_id: 'u1', event: 'view', ts: 't' },
    { user_id: 'u1', event: 'convert', ts: 't', amount_cents: 999 },
    { user_id: 'u1', event: 'refund', ts: 't', amount_cents: 999 },
  ];
  const kpis = computeKPIs(events);
  assert.equal(kpis.refund_rate, 1.0);
  assert.equal(kpis.guardrail_breach, true);
});

// -- RNG determinism ----------------------------------------------------------

test('rng: mulberry32 same seed produces same sequence', () => {
  const rand1 = mulberry32(42);
  const rand2 = mulberry32(42);
  const n = 20;
  const seq1 = Array.from({ length: n }, rand1);
  const seq2 = Array.from({ length: n }, rand2);
  assert.deepEqual(seq1, seq2);
});

test('rng: mulberry32 different seeds produce different sequences', () => {
  const rand1 = mulberry32(1);
  const rand2 = mulberry32(2);
  const seq1 = Array.from({ length: 10 }, rand1);
  const seq2 = Array.from({ length: 10 }, rand2);
  assert.notDeepEqual(seq1, seq2);
});

test('rng: mulberry32 output is in [0, 1)', () => {
  const rand = mulberry32(99);
  for (let i = 0; i < 100; i++) {
    const v = rand();
    assert.ok(v >= 0 && v < 1, `value ${v} out of [0,1)`);
  }
});
