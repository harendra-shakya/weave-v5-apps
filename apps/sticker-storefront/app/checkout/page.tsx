'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart';
import { shippingCents, variantLabel, getPack } from '@/lib/packs';
import { createOrder } from '@/lib/orders';
import { formatCents } from '@/lib/format';
import { PaymentForm, type PaymentResult } from '@/components/PaymentForm';
import { EmptyState } from '@/components/EmptyState';

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();
  const [declined, setDeclined] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const declineRef = useRef<HTMLDivElement>(null);
  const shipping = shippingCents(cart.subtotalCents);
  const total = cart.subtotalCents + shipping;

  if (cart.lines.length === 0) {
    return (
      <div className="py-20">
        <EmptyState
          note="an empty page"
          title="Your page is blank — go find a pack."
          body="There's nothing to check out yet. The current drop is one page over."
          actionLabel="see the current drop"
          actionHref="/"
        />
      </div>
    );
  }

  function handleResult(r: PaymentResult) {
    if (!r.ok) {
      setDeclined(true);
      setSubmitting(false);
      window.scrollTo(0, 0);
      setTimeout(() => declineRef.current?.focus(), 0);
      return;
    }
    const order = createOrder(cart.lines, r.details.email);
    cart.clear();
    router.push(`/orders/${order.id}`);
  }

  return (
    <div className="grid items-start gap-8 py-12 lg:grid-cols-[1.5fr_1fr]">
      <section aria-labelledby="checkout-heading" className="rounded-card bg-cream px-8 py-7 shadow-pop">
        <h1 id="checkout-heading" className="mb-1 text-display font-extrabold text-ink">
          check out
        </h1>
        <p className="mb-7 text-sm font-semibold text-ink-soft">
          Guest checkout — we only ask for what shipping needs.
        </p>
        {declined && (
          <div ref={declineRef} tabIndex={-1} role="alert" className="mb-7 rounded-2xl border-[3px] border-pink bg-pink/15 px-5 py-4 focus:outline-none">
            <p className="text-lg font-extrabold text-pink-deep">That card didn&rsquo;t go through.</p>
            <p className="mt-1 text-sm font-medium leading-relaxed text-ink-soft">
              No charge was made and your cart is exactly as you left it. Check the number and
              try again, or use a different card — your packs will wait.
            </p>
          </div>
        )}
        <PaymentForm totalLabel={formatCents(total)} onResult={handleResult} onSubmitting={setSubmitting} disabled={submitting} />
      </section>

      <aside aria-labelledby="order-summary" className="rounded-card bg-cream px-8 py-7 shadow-pop lg:max-w-md">
        <h2 id="order-summary" className="mb-4 text-display-sm font-extrabold text-ink">
          your packs
        </h2>
        <ul className="flex list-none flex-col gap-3 text-sm">
          {cart.lines.map((l) => {
            const pack = getPack(l.packId);
            if (!pack) return null;
            return (
              <li key={`${l.packId}-${variantLabel(l.variant)}`}>
                <span className="font-extrabold text-ink">{pack.name}</span>
                <span className="block text-xs font-semibold text-ink-soft">
                  {variantLabel(l.variant)} · ×{l.qty} · by {pack.artist}
                </span>
              </li>
            );
          })}
        </ul>
        <dl className="mt-4 flex flex-col gap-2 border-t-[3px] border-dashed border-line pt-4 text-[15px] font-semibold text-ink-soft">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd className="font-extrabold text-ink">{formatCents(cart.subtotalCents)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd className="font-extrabold text-ink">{shipping === 0 ? 'Free' : formatCents(shipping)}</dd>
          </div>
          <div className="flex justify-between text-lg">
            <dt className="font-extrabold text-ink">Total</dt>
            <dd className="font-extrabold text-ink">{formatCents(total)}</dd>
          </div>
        </dl>
        <p className="mt-4 text-xs font-semibold leading-relaxed text-ink-faint">
          Synthetic payment — no real charge. <Link href="/cart">back to cart</Link>
        </p>
      </aside>
    </div>
  );
}
