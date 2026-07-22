// Evidence event builders. Events are append-only records of what happened.

export function viewEvent(userId, itemId) {
  return { user_id: userId, event: 'view', ts: new Date().toISOString(), ...(itemId ? { item_id: itemId } : {}) };
}

export function engageEvent(userId, itemId) {
  return { user_id: userId, event: 'engage', ts: new Date().toISOString(), ...(itemId ? { item_id: itemId } : {}) };
}

export function convertEvent(userId, itemId, amountCents) {
  return { user_id: userId, event: 'convert', ts: new Date().toISOString(), item_id: itemId, amount_cents: amountCents };
}

export function fulfillEvent(userId, itemId) {
  return { user_id: userId, event: 'fulfill', ts: new Date().toISOString(), item_id: itemId };
}

export function refundEvent(userId, itemId, amountCents) {
  return { user_id: userId, event: 'refund', ts: new Date().toISOString(), item_id: itemId, amount_cents: amountCents };
}

export function cancelEvent(userId, itemId) {
  return { user_id: userId, event: 'cancel', ts: new Date().toISOString(), item_id: itemId };
}
