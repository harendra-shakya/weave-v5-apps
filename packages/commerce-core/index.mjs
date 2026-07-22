// commerce-core: deterministic, synchronous commerce engine.
// No external network calls, no real payments, no blockchain.
export { createCart, addToCart, removeFromCart, getCartTotal } from './cart.mjs';
export { createCheckout, completeCheckout } from './checkout.mjs';
export { createOrder, transitionOrder, VALID_TRANSITIONS } from './orders.mjs';
export { computeKPIs } from './kpi.mjs';
export { mulberry32 } from './rng.mjs';
