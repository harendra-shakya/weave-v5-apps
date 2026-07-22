// Cart operations — pure functions, no side effects.

export function createCart(sessionId) {
  return { session_id: sessionId, items: [], total_cents: 0 };
}

export function addToCart(cart, item) {
  const { item_id, quantity = 1, unit_price_cents, variant } = item;
  if (!item_id || typeof unit_price_cents !== 'number') throw new Error('addToCart: item_id and unit_price_cents required');
  const existing = cart.items.find((i) => i.item_id === item_id && JSON.stringify(i.variant) === JSON.stringify(variant));
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ item_id, quantity, unit_price_cents, ...(variant ? { variant } : {}) });
  }
  cart.total_cents = getCartTotal(cart);
  return cart;
}

export function removeFromCart(cart, item_id) {
  cart.items = cart.items.filter((i) => i.item_id !== item_id);
  cart.total_cents = getCartTotal(cart);
  return cart;
}

export function getCartTotal(cart) {
  return cart.items.reduce((sum, i) => sum + i.unit_price_cents * i.quantity, 0);
}
