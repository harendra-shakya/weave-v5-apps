'use client';
import { useState, useId } from 'react';
import { createOrder } from '@/lib/orders';
import { clearCart, cartTotal } from '@/lib/cart';
import { getPoster } from '@/lib/catalog';
import { formatPrice } from '@/lib/format';
import type { Cart } from '@/lib/types';
import { useRouter } from 'next/navigation';

interface PaymentFormProps {
  cart: Cart;
}

// ponytail: declining card ending 0002 matches Marginalia's pattern — consistent synthetic seam
const DECLINE_SUFFIX = '0002';

export default function PaymentForm({ cart }: PaymentFormProps) {
  const router = useRouter();
  const emailId  = useId();
  const cardId   = useId();
  const expiryId = useId();
  const cvvId    = useId();
  const termsId  = useId();

  const [email,     setEmail]   = useState('');
  const [card,      setCard]    = useState('');
  const [expiry,    setExpiry]  = useState('');
  const [cvv,       setCvv]     = useState('');
  const [agreed,    setAgreed]  = useState(false);
  const [error,     setError]   = useState<string | null>(null);
  const [submitting, setSub]    = useState(false);

  const prices: Record<string, number> = {};
  cart.items.forEach((i) => { prices[i.poster_id] = getPoster(i.poster_id)?.price_cents ?? 0; });
  const total = cartTotal(cart, prices);

  function validate(): string | null {
    if (!email.includes('@')) return 'Please enter a valid email address.';
    if (card.replace(/\s/g, '').length < 12) return 'Please enter a valid card number.';
    if (!expiry.match(/^\d{2}\/\d{2}$/)) return 'Please enter expiry as MM/YY.';
    if (cvv.length < 3) return 'Please enter a valid CVV.';
    if (!agreed) return 'Please accept the terms before paying.';
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }

    setSub(true);
    setError(null);
    await new Promise((r) => setTimeout(r, 800));

    const clean = card.replace(/\s/g, '');
    if (clean.endsWith(DECLINE_SUFFIX)) {
      setError('Your card was declined. Please check your details and try again.');
      setSub(false);
      return;
    }

    const order = createOrder({ cart, prices, email });
    clearCart();
    window.dispatchEvent(new Event('tableau:cart-updated'));
    router.push(`/order/${order.id}`);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {error && (
        <div role="alert" className="border border-red-300 bg-red-50 text-red-800 text-sm rounded-control px-4 py-3">
          {error}
        </div>
      )}

      <div>
        <label htmlFor={emailId} className="label-caption block mb-1.5">Email address</label>
        <input
          id={emailId}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error?.includes('email') ? 'true' : 'false'}
          className="w-full border border-border rounded-control px-3 py-2.5 text-sm text-ink bg-white/surface focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
          placeholder="you@example.com"
          required
        />
      </div>

      <div>
        <label htmlFor={cardId} className="label-caption block mb-1.5">Card number</label>
        <input
          id={cardId}
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          value={card}
          onChange={(e) => setCard(e.target.value)}
          aria-invalid={error?.includes('card') ? 'true' : 'false'}
          className="w-full border border-border rounded-control px-3 py-2.5 text-sm text-ink bg-white/surface focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          required
        />
        <p className="mt-1 text-xs text-ink-faint">To test card decline: use a card ending in {DECLINE_SUFFIX}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor={expiryId} className="label-caption block mb-1.5">Expiry</label>
          <input
            id={expiryId}
            type="text"
            autoComplete="cc-exp"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            aria-invalid={error?.includes('expiry') ? 'true' : 'false'}
            className="w-full border border-border rounded-control px-3 py-2.5 text-sm text-ink bg-white/surface focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            placeholder="MM/YY"
            maxLength={5}
            required
          />
        </div>
        <div>
          <label htmlFor={cvvId} className="label-caption block mb-1.5">CVV</label>
          <input
            id={cvvId}
            type="text"
            autoComplete="cc-csc"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            aria-invalid={error?.includes('CVV') ? 'true' : 'false'}
            className="w-full border border-border rounded-control px-3 py-2.5 text-sm text-ink bg-white/surface focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
            placeholder="123"
            maxLength={4}
            required
          />
        </div>
      </div>

      <div className="flex items-start gap-3 pt-1">
        <input
          id={termsId}
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          aria-invalid={error?.includes('terms') ? 'true' : 'false'}
          className="mt-0.5 h-4 w-4 rounded border-border text-sage focus:ring-sage"
        />
        <label htmlFor={termsId} className="text-xs text-ink-soft leading-relaxed">
          I agree to the{' '}
          <a href="/terms" target="_blank" className="text-sage underline">Terms of Service</a>{' '}
          and{' '}
          <a href="/refund" target="_blank" className="text-sage underline">Refund Policy</a>.
          This purchase is synthetic — no real money will be charged.
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full min-h-[44px] bg-sage-deep text-white rounded-control font-sans text-sm font-medium py-3 hover:bg-sage disabled:opacity-60 transition-colors"
      >
        {submitting ? 'Processing…' : `Pay ${formatPrice(total)}`}
      </button>
    </form>
  );
}
