"use client";

import { useState, type FormEvent } from "react";
import { BackFilmButton } from "./BackFilmButton";

/**
 * PaymentForm — synthetic guest checkout. No real provider, no real charge.
 * Any details pass validation; a card number ending in 0002 simulates a
 * decline (the payment-failure state). Fully labelled and keyboard-navigable.
 */

export interface PaymentFormProps {
  /** Formatted amount, e.g. "$5" */
  amountLabel: string;
  makerName: string;
  /** Locked CTA copy by default; override only for sanctioned experiments. */
  ctaLabel?: string;
  onSuccess: (orderId: string) => void;
}

interface Fields {
  email: string;
  nameOnCard: string;
  cardNumber: string;
  expiry: string;
  cvc: string;
}

const EMPTY: Fields = {
  email: "",
  nameOnCard: "",
  cardNumber: "",
  expiry: "",
  cvc: "",
};

function formatCardNumber(raw: string): string {
  return raw
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(raw: string): string {
  const d = raw.replace(/\D/g, "").slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email))
    errors.email = "Enter the email that should receive the film.";
  if (f.nameOnCard.trim().length < 2)
    errors.nameOnCard = "Enter the name on the card.";
  if (f.cardNumber.replace(/\D/g, "").length !== 16)
    errors.cardNumber = "Card numbers have 16 digits.";
  const [mm, yy] = f.expiry.split("/");
  if (!mm || !yy || Number(mm) < 1 || Number(mm) > 12 || yy.length !== 2)
    errors.expiry = "Use MM/YY.";
  if (!/^\d{3,4}$/.test(f.cvc)) errors.cvc = "3 or 4 digits.";
  return errors;
}

const INPUT =
  "w-full rounded-sm border border-or-line bg-or-paper px-3.5 py-2.5 " +
  "font-sans text-base text-or-ink placeholder:text-or-ink-soft/60 " +
  "focus:border-or-line-strong focus:outline focus:outline-2 " +
  "focus:outline-offset-1 focus:outline-or-ember " +
  "aria-[invalid=true]:border-or-danger";

const LABEL = "mb-1.5 block font-sans text-sm font-semibold text-or-ink";
const ERROR = "mt-1.5 text-sm text-or-danger";

export function PaymentForm({
  amountLabel,
  makerName,
  ctaLabel = "Back this film",
  onSuccess,
}: PaymentFormProps) {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<"idle" | "processing" | "declined">("idle");

  const set =
    (key: keyof Fields, format?: (v: string) => string) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFields((f) => ({ ...f, [key]: format ? format(e.target.value) : e.target.value }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("processing");
    // Synthetic processing — no provider. Ending 0002 simulates a decline.
    window.setTimeout(() => {
      if (fields.cardNumber.replace(/\D/g, "").endsWith("0002")) {
        setStatus("declined");
      } else {
        onSuccess(`OR-${Math.floor(1000 + Math.random() * 9000)}`);
      }
    }, 900);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <p className="rounded-sm bg-or-cream-deep px-4 py-3 font-sans text-sm text-or-ink-soft">
        Demo checkout — synthetic payment, no real charge. Any details work; a
        card ending in <strong className="text-or-ink">0002</strong> simulates
        a decline.
      </p>

      {status === "declined" && (
        <div
          role="alert"
          className="rounded-sm border border-or-danger/40 bg-or-paper px-4 py-3"
        >
          <p className="font-sans text-sm font-semibold text-or-danger">
            Your card was declined.
          </p>
          <p className="mt-1 font-sans text-sm text-or-ink-soft">
            Nothing was charged and {makerName} hasn&apos;t been paid yet. Try a
            different card — the film will wait.
          </p>
        </div>
      )}

      <div>
        <label htmlFor="pf-email" className={LABEL}>
          Email for access
        </label>
        <input
          id="pf-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={fields.email}
          onChange={set("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "pf-email-error" : undefined}
          className={INPUT}
        />
        {errors.email && (
          <p id="pf-email-error" className={ERROR}>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="pf-name" className={LABEL}>
          Name on card
        </label>
        <input
          id="pf-name"
          type="text"
          autoComplete="cc-name"
          value={fields.nameOnCard}
          onChange={set("nameOnCard")}
          aria-invalid={!!errors.nameOnCard}
          aria-describedby={errors.nameOnCard ? "pf-name-error" : undefined}
          className={INPUT}
        />
        {errors.nameOnCard && (
          <p id="pf-name-error" className={ERROR}>
            {errors.nameOnCard}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="pf-card" className={LABEL}>
          Card number
        </label>
        <input
          id="pf-card"
          type="text"
          inputMode="numeric"
          autoComplete="cc-number"
          placeholder="4242 4242 4242 4242"
          value={fields.cardNumber}
          onChange={set("cardNumber", formatCardNumber)}
          aria-invalid={!!errors.cardNumber}
          aria-describedby={errors.cardNumber ? "pf-card-error" : undefined}
          className={INPUT}
        />
        {errors.cardNumber && (
          <p id="pf-card-error" className={ERROR}>
            {errors.cardNumber}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="pf-expiry" className={LABEL}>
            Expiry
          </label>
          <input
            id="pf-expiry"
            type="text"
            inputMode="numeric"
            autoComplete="cc-exp"
            placeholder="MM/YY"
            value={fields.expiry}
            onChange={set("expiry", formatExpiry)}
            aria-invalid={!!errors.expiry}
            aria-describedby={errors.expiry ? "pf-expiry-error" : undefined}
            className={INPUT}
          />
          {errors.expiry && (
            <p id="pf-expiry-error" className={ERROR}>
              {errors.expiry}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="pf-cvc" className={LABEL}>
            CVC
          </label>
          <input
            id="pf-cvc"
            type="text"
            inputMode="numeric"
            autoComplete="cc-csc"
            placeholder="123"
            value={fields.cvc}
            onChange={set("cvc", (v) => v.replace(/\D/g, "").slice(0, 4))}
            aria-invalid={!!errors.cvc}
            aria-describedby={errors.cvc ? "pf-cvc-error" : undefined}
            className={INPUT}
          />
          {errors.cvc && (
            <p id="pf-cvc-error" className={ERROR}>
              {errors.cvc}
            </p>
          )}
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-3">
        <BackFilmButton type="submit" disabled={status === "processing"}>
          {status === "processing" ? "Backing…" : `${ctaLabel} — ${amountLabel}`}
        </BackFilmButton>
        <p className="flex items-center gap-2 font-sans text-sm text-or-ink-soft">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-or-ember"
          />
          Your payment goes straight to the maker.
        </p>
      </div>
    </form>
  );
}
