// ponytail: tiny nanoid — crypto.randomUUID is available in Node 14.17+ and all modern browsers
export function nanoid() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  // fallback for older Node
  return Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
}
