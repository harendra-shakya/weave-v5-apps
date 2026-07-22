'use client';
import { useState } from 'react';

export interface PaymentDetails {
  email: string;
  name: string;
  address: string;
  city: string;
  postal: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

export type PaymentResult = { ok: true; details: PaymentDetails } | { ok: false; reason: string };

/**
 * Synthetic guest-checkout form — no real provider. Any well-formed card
 * succeeds; a card number ending 0002 is declined (for testing the failure
 * state). Swap this component for the real payment integration on port.
 */
export function PaymentForm({
  totalLabel,
  onResult,
  onSubmitting,
  disabled = false,
}: {
  totalLabel: string;
  onResult: (r: PaymentResult) => void;
  onSubmitting?: (v: boolean) => void;
  disabled?: boolean;
}) {
  const [d, setD] = useState<PaymentDetails>({
    email: '',
    name: '',
    address: '',
    city: '',
    postal: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof PaymentDetails, string>>>({});
  const set = (k: keyof PaymentDetails) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setD((prev) => ({ ...prev, [k]: e.target.value }));

  function validate(): boolean {
    const errs: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(d.email)) errs.email = 'Enter an email so we can send tracking.';
    if (!d.name.trim()) errs.name = 'Enter the name on the card.';
    if (!d.address.trim()) errs.address = 'Enter a street address.';
    if (!d.city.trim()) errs.city = 'Enter a city.';
    if (!d.postal.trim()) errs.postal = 'Enter a postal code.';
    if (d.cardNumber.replace(/\s/g, '').length < 12) errs.cardNumber = 'Enter the full card number.';
    if (!/^\d{2}\s*\/\s*\d{2}$/.test(d.expiry)) errs.expiry = 'Use MM / YY.';
    if (!/^\d{3,4}$/.test(d.cvc)) errs.cvc = 'Enter the 3–4 digit code.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSubmitting?.(true);
    if (d.cardNumber.replace(/\s/g, '').endsWith('0002')) {
      onResult({ ok: false, reason: 'declined' });
    } else {
      onResult({ ok: true, details: d });
    }
  }

  const inputCls =
    'w-full rounded-control border-[3px] border-line bg-cream-bright px-3.5 py-2.5 text-base font-semibold text-ink placeholder:text-ink-faint focus:border-purple';

  const errorCount = Object.keys(errors).length;

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-6">
      {errorCount > 0 && (
        <div aria-live="polite" className="rounded-2xl border-[3px] border-pink bg-pink/10 px-5 py-3 text-sm font-bold text-pink-deep">
          Please fix {errorCount} {errorCount === 1 ? 'field' : 'fields'} before placing your order.
        </div>
      )}
      <Fieldset legend="Contact">
        <Field label="Email" error={errors.email} htmlFor="pay-email" errorId="err-email">
          <input id="pay-email" type="email" autoComplete="email" required value={d.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} className={inputCls} placeholder="you@example.com" />
        </Field>
      </Fieldset>
      <Fieldset legend="Ship to">
        <Field label="Street address" error={errors.address} htmlFor="pay-address" errorId="err-address">
          <input id="pay-address" autoComplete="street-address" required value={d.address} onChange={set('address')} aria-invalid={!!errors.address} aria-describedby={errors.address ? 'err-address' : undefined} className={inputCls} />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="City" error={errors.city} htmlFor="pay-city" errorId="err-city">
            <input id="pay-city" autoComplete="address-level2" required value={d.city} onChange={set('city')} aria-invalid={!!errors.city} aria-describedby={errors.city ? 'err-city' : undefined} className={inputCls} />
          </Field>
          <Field label="Postal code" error={errors.postal} htmlFor="pay-postal" errorId="err-postal">
            <input id="pay-postal" autoComplete="postal-code" required value={d.postal} onChange={set('postal')} aria-invalid={!!errors.postal} aria-describedby={errors.postal ? 'err-postal' : undefined} className={inputCls} />
          </Field>
        </div>
      </Fieldset>
      <Fieldset legend="Payment">
        <Field label="Name on card" error={errors.name} htmlFor="pay-name" errorId="err-name">
          <input id="pay-name" autoComplete="cc-name" required value={d.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} className={inputCls} />
        </Field>
        <Field label="Card number" error={errors.cardNumber} htmlFor="pay-card" errorId="err-card" hint="Demo checkout — any number works; end it in 0002 to see a decline.">
          <input id="pay-card" inputMode="numeric" autoComplete="cc-number" required value={d.cardNumber} onChange={set('cardNumber')} aria-invalid={!!errors.cardNumber} aria-describedby={errors.cardNumber ? 'err-card' : undefined} className={inputCls} placeholder="4242 4242 4242 4242" />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Expiry" error={errors.expiry} htmlFor="pay-expiry" errorId="err-expiry">
            <input id="pay-expiry" inputMode="numeric" autoComplete="cc-exp" required value={d.expiry} onChange={set('expiry')} aria-invalid={!!errors.expiry} aria-describedby={errors.expiry ? 'err-expiry' : undefined} className={inputCls} placeholder="MM / YY" />
          </Field>
          <Field label="Security code" error={errors.cvc} htmlFor="pay-cvc" errorId="err-cvc">
            <input id="pay-cvc" inputMode="numeric" autoComplete="cc-csc" required value={d.cvc} onChange={set('cvc')} aria-invalid={!!errors.cvc} aria-describedby={errors.cvc ? 'err-cvc' : undefined} className={inputCls} placeholder="123" />
          </Field>
        </div>
      </Fieldset>
      <button
        type="submit"
        disabled={disabled}
        className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full bg-mint px-9 text-lg font-extrabold text-cream shadow-mint transition active:translate-y-[3px] active:shadow-mint-sm disabled:opacity-60 disabled:shadow-none"
      >
        {disabled ? 'Placing order…' : `Place order — ${totalLabel}`}
      </button>
      <p className="text-center text-sm font-bold text-mint-deep">What you saw is what ships.</p>
    </form>
  );
}

function Fieldset({ legend, children }: { legend: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-3">
      <legend className="mb-2 text-sm font-extrabold uppercase tracking-[0.06em] text-ink-faint">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

function Field({
  label,
  htmlFor,
  error,
  errorId,
  hint,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  errorId?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-bold text-ink">
        {label}
      </label>
      {children}
      {hint && !error && <p className="text-xs font-semibold text-ink-faint">{hint}</p>}
      {error && (
        <p id={errorId} className="text-xs font-bold text-pink-deep">
          {error}
        </p>
      )}
    </div>
  );
}
