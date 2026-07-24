'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import EmptyState from '@/components/EmptyState';
import PriceTag from '@/components/PriceTag';
import PaymentForm from '@/components/PaymentForm';
import { getCart, cartTotal } from '@/lib/cart';
import { getPoster } from '@/lib/catalog';
import type { Cart } from '@/lib/types';

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    const c = getCart();
    if (c.items.length === 0) { router.replace('/catalog'); return; }
    setCart(c);
  }, [router]);

  if (!cart) return null;

  const prices: Record<string, number> = {};
  cart.items.forEach((i) => { prices[i.poster_id] = getPoster(i.poster_id)?.price_cents ?? 0; });
  const total = cartTotal(cart, prices);

  return (
    <div className="mx-auto max-w-page px-6 py-12">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-xs text-ink-muted list-none p-0 m-0">
          <li><Link href="/cart" className="hover:text-sage">Cart</Link></li>
          <li aria-hidden="true">·</li>
          <li aria-current="page" className="text-ink-soft">Checkout</li>
        </ol>
      </nav>

      <h1 className="font-display text-display text-ink mb-8">Complete your order</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {/* Payment */}
        <div className="lg:col-span-2">
          <PaymentForm cart={cart} />
        </div>

        {/* Summary */}
        <div>
          <div className="border border-border rounded-card p-5 space-y-4 sticky top-24">
            <h2 className="label-caption">Order summary</h2>
            <div className="space-y-3">
              {cart.items.map((item) => {
                const poster = getPoster(item.poster_id);
                if (!poster) return null;
                return (
                  <div key={`${item.poster_id}-${item.format}`} className="flex justify-between text-xs text-ink-soft">
                    <span className="truncate mr-2">{poster.title} ({item.format})</span>
                    <PriceTag cents={poster.price_cents} />
                  </div>
                );
              })}
            </div>
            <div className="rule-thin" />
            {cart.promo_code && (
              <div className="flex justify-between text-xs text-sage">
                <span>{cart.promo_code} (-{cart.discount_percent}%)</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-medium text-ink">
              <span>Total</span>
              <PriceTag cents={total} className="text-sm" />
            </div>
            <p className="text-xs text-ink-muted">
              PDF download links are delivered instantly after payment.
            </p>
            <p className="text-xs text-ink-faint">
              By completing your purchase you agree to our{' '}
              <Link href="/terms" className="underline hover:text-ink-muted">terms</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
