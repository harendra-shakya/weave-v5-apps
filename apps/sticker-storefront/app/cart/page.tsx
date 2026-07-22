'use client';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { shippingCents } from '@/lib/packs';
import { formatCents } from '@/lib/format';
import { CartLineItem } from '@/components/CartLineItem';
import { EmptyState } from '@/components/EmptyState';

export default function CartPage() {
  const { lines, subtotalCents } = useCart();
  const shipping = shippingCents(subtotalCents);

  if (lines.length === 0) {
    return (
      <div className="py-20">
        <EmptyState
          note="an empty page"
          title="Your page is blank — go find a pack."
          body="The current drop is small on purpose: a few packs from artists we trust, each shown at true size."
          actionLabel="see the current drop"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div className="grid items-start gap-8 py-12 lg:grid-cols-[1.5fr_1fr]">
      <section aria-labelledby="cart-heading" className="rounded-card bg-cream px-8 py-7 shadow-pop">
        <h1 id="cart-heading" className="mb-1 text-display font-extrabold text-ink">
          your cart
        </h1>
        <ul className="list-none">
          {lines.map((line) => (
            <CartLineItem
              key={`${line.packId}-${line.variant.size}-${line.variant.finish}-${line.variant.sheets}`}
              line={line}
            />
          ))}
        </ul>
      </section>

      <aside aria-labelledby="summary-heading" className="rounded-card bg-cream px-8 py-7 shadow-pop lg:max-w-md">
        <h2 id="summary-heading" className="mb-4 text-display-sm font-extrabold text-ink">
          summary
        </h2>
        <dl className="flex flex-col gap-2 text-[15px] font-semibold text-ink-soft">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-extrabold text-ink">{formatCents(subtotalCents)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping (tracked letter mail)</dt>
            <dd className="font-extrabold text-ink">{shipping === 0 ? 'Free' : formatCents(shipping)}</dd>
          </div>
          <div className="mt-2 flex justify-between border-t-[3px] border-dashed border-line pt-3 text-lg">
            <dt className="font-extrabold text-ink">Total</dt>
            <dd className="font-extrabold text-ink">{formatCents(subtotalCents + shipping)}</dd>
          </div>
        </dl>
        <Link
          href="/checkout"
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center whitespace-nowrap rounded-full bg-mint text-lg font-extrabold text-cream no-underline shadow-mint transition active:translate-y-[3px] active:shadow-mint-sm hover:no-underline"
        >
          check out
        </Link>
        <p className="mt-3 text-center text-[13px] font-semibold text-ink-faint">
          guest checkout — no account needed
        </p>
      </aside>
    </div>
  );
}
