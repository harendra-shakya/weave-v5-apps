'use client';
import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import type { CartLine, VariantSelection } from './types';
import { getPack, variantPrice } from './packs';

export const lineKey = (packId: string, v: VariantSelection) =>
  `${packId}|${v.size}|${v.finish}|${v.sheets}`;

type Action =
  | { type: 'add'; packId: string; variant: VariantSelection; qty?: number }
  | { type: 'remove'; key: string }
  | { type: 'setQty'; key: string; qty: number }
  | { type: 'clear' }
  | { type: 'replace'; lines: CartLine[] };

function reducer(lines: CartLine[], action: Action): CartLine[] {
  switch (action.type) {
    case 'add': {
      const key = lineKey(action.packId, action.variant);
      const existing = lines.find((l) => lineKey(l.packId, l.variant) === key);
      if (existing) {
        return lines.map((l) =>
          lineKey(l.packId, l.variant) === key ? { ...l, qty: l.qty + (action.qty ?? 1) } : l,
        );
      }
      return [...lines, { packId: action.packId, variant: action.variant, qty: action.qty ?? 1 }];
    }
    case 'remove':
      return lines.filter((l) => lineKey(l.packId, l.variant) !== action.key);
    case 'setQty':
      if (action.qty < 1) return lines.filter((l) => lineKey(l.packId, l.variant) !== action.key);
      return lines.map((l) =>
        lineKey(l.packId, l.variant) === action.key ? { ...l, qty: action.qty } : l,
      );
    case 'clear':
      return [];
    case 'replace':
      return action.lines;
  }
}

export interface CartApi {
  lines: CartLine[];
  count: number;
  subtotalCents: number;
  add: (packId: string, variant: VariantSelection, qty?: number) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartApi | null>(null);
const STORAGE_KEY = 'marginalia.cart.v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, []);
  const hydrated = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: 'replace', lines: JSON.parse(raw) as CartLine[] });
    } catch {
      /* corrupted storage — start empty */
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (hydrated.current) localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  const api = useMemo<CartApi>(() => {
    const subtotalCents = lines.reduce((sum, l) => {
      const pack = getPack(l.packId);
      return pack ? sum + variantPrice(pack, l.variant) * l.qty : sum;
    }, 0);
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      subtotalCents,
      add: (packId, variant, qty) => dispatch({ type: 'add', packId, variant, qty }),
      remove: (key) => dispatch({ type: 'remove', key }),
      setQty: (key, qty) => dispatch({ type: 'setQty', key, qty }),
      clear: () => dispatch({ type: 'clear' }),
    };
  }, [lines]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within <CartProvider>');
  return ctx;
}
