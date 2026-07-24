'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import EmptyState from '@/components/EmptyState';
import PriceTag from '@/components/PriceTag';
import { getCart, removeFromCart, applyPromo, removePromo, cartTotal } from '@/lib/cart';
import { getPoster } from '@/lib/catalog';
import { formatPrice, applyDiscount } from '@/lib/format';
import type { Cart } from '@/lib/types';

export default function CartPage() {
  const [cart, setCart] = useState<Cart>({ items: [], promo_code: null, discount_percent: 0 });
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState<string | null>(null);

  useEffect(() => { setCart(getCart()); }, []);

  function refresh(updated: Cart) {
    setCart(updated);
    window.dispatchEvent(new Event('tableau:cart-updated'));
  }

  function handleRemove(poster_id: string, format: string) {
    refresh(removeFromCart(poster_id, format as never));
  }

  function handlePromo(e: React.FormEvent) {
    e.preventDefault();
    const { cart: updated, error } = applyPromo(promoInput);
    if (error) { setPromoError(error); } else { setPromoError(null); setPromoInput(''); refresh(updated); }
  }

  const prices: Record<string, number> = {};
  cart.items.forEach((i) => { prices[i.poster_id] = getPoster(i.poster_id)?.price_cents ?? 0; });
  const subtotal = cart.items.reduce((s, i) => s + (prices[i.poster_id] ?? 0), 0);
  const total    = cartTotal(cart, prices);

  if (cart.items.length === 0) {
    return (
      <EmptyState
        heading="Your collection is empty"
        body="Browse the posters and add one you'd like to print."
        cta={{ label: 'Browse all posters', href: '/catalog' }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-page px-6 py-12">
      <h1 className="font-display text-display text-ink mb-8">Your cart</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Line items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => {
            const poster = getPoster(item.poster_id);
            if (!poster) return null;
            return (
              <div key={`${item.poster_id}-${item.format}`} className="flex items-center gap-4 border border-border rounded-card p-4">
                <div className="w-16 h-20 flex-shrink-0 rounded overflow-hidden bg-white-surface border border-border">
                  <svg viewBox="0 0 80 112" className="w-full h-full">
                    <rect width="80" height="112" fill={poster.art_palette === 'sage' ? '#e8f0ea' : poster.art_palette === 'parchment' ? '#f5efe3' : '#e8ecf0'} />
                    <text x="40" y="62" textAnchor="middle" fontSize="8" fontFamily="Georgia,serif" fill="#555">{poster.title.split(' ')[0]}</text>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{poster.title}</p>
                  <p className="label-caption mt-0.5">{poster.artist} · {item.format}</p>
                  <PriceTag cents={poster.price_cents} className="mt-1" />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemove(item.poster_id, item.format)}
                  aria-label={`Remove ${poster.title} (${item.format}) from collection`}
                  className="p-2 text-ink-muted hover:text-ink rounded-control"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="space-y-5">
          {/* Promo */}
          <div className="border border-border rounded-card p-4 space-y-3">
            <p className="label-caption">Promo code</p>
            {cart.promo_code ? (
              <div className="flex items-center justify-between">
                <span className="text-xs text-sage font-medium">{cart.promo_code} (-{cart.discount_percent}%)</span>
                <button type="button" onClick={() => refresh(removePromo())} className="text-xs text-ink-muted hover:text-ink">Remove</button>
              </div>
            ) : (
              <form onSubmit={handlePromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="FIRST15"
                  aria-label="Promo code"
                  aria-invalid={promoError ? 'true' : 'false'}
                  aria-describedby={promoError ? 'promo-error' : undefined}
                  className="flex-1 border border-border rounded-control px-3 py-2 text-xs text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
                />
                <button type="submit" className="px-3 py-2 bg-sage-deep text-white text-xs rounded-control hover:bg-sage">Apply</button>
              </form>
            )}
            {promoError && <p id="promo-error" className="text-xs text-red-600" role="alert" aria-live="polite">{promoError}</p>}
          </div>

          {/* Totals */}
          <div className="border border-border rounded-card p-4 space-y-2">
            <div className="flex justify-between text-xs text-ink-soft">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            {cart.discount_percent > 0 && (
              <div className="flex justify-between text-xs text-sage">
                <span>Discount ({cart.discount_percent}%)</span>
                <span>−{formatPrice(subtotal - total)}</span>
              </div>
            )}
            <div className="rule-thin pt-2" />
            <div className="flex justify-between text-sm font-medium text-ink pt-1">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="block w-full text-center bg-sage-deep text-white text-sm font-medium py-3 rounded-control hover:bg-sage transition-colors no-underline"
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
