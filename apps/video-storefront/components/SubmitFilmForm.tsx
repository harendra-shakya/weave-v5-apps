"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { Film } from "@/lib/films";
import { formatPrice } from "@/lib/films";
import { addSubmittedFilm } from "@/lib/submissions";
import { BackFilmButton } from "./BackFilmButton";
import { ReelO } from "./Wordmark";

/**
 * SubmitFilmForm — synthetic maker listing. No real upload: a title, a
 * price, a logline, and an optional private screener link. The film goes
 * straight into the catalog (this browser only) and is buyable like any other.
 */

const INPUT =
  "w-full rounded-sm border border-or-line bg-or-paper px-3.5 py-2.5 " +
  "font-sans text-base text-or-ink placeholder:text-or-ink-soft/60 " +
  "focus:border-or-line-strong focus:outline focus:outline-2 " +
  "focus:outline-offset-1 focus:outline-or-ember " +
  "aria-[invalid=true]:border-or-danger";
const LABEL = "mb-1.5 block font-sans text-sm font-semibold text-or-ink";
const ERROR = "mt-1.5 text-sm text-or-danger";

interface Fields {
  title: string;
  maker: string;
  runtime: string;
  price: string;
  logline: string;
  screenerUrl: string;
}

const EMPTY: Fields = {
  title: "",
  maker: "",
  runtime: "",
  price: "",
  logline: "",
  screenerUrl: "",
};

function validate(f: Fields): Partial<Record<keyof Fields, string>> {
  const errors: Partial<Record<keyof Fields, string>> = {};
  if (f.title.trim().length < 2) errors.title = "Give the film its title.";
  if (f.maker.trim().length < 2) errors.maker = "Your name goes on the film.";
  const runtime = Number(f.runtime);
  if (!runtime || runtime < 1 || runtime > 40)
    errors.runtime = "Shorts only — 1 to 40 minutes.";
  const price = Number(f.price);
  if (!price || price < 1 || price > 20)
    errors.price = "Pick a price from $1 to $20.";
  if (f.logline.trim().length < 10)
    errors.logline = "One sentence that sells the film.";
  if (f.screenerUrl.trim() && !/^https?:\/\//.test(f.screenerUrl.trim()))
    errors.screenerUrl = "Links start with http:// or https://.";
  return errors;
}

export function SubmitFilmForm() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [listed, setListed] = useState<Film | null>(null);

  const set =
    (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFields((f) => ({ ...f, [key]: e.target.value }));

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    const film = addSubmittedFilm({
      title: fields.title,
      maker: fields.maker,
      runtimeMin: Number(fields.runtime),
      priceCents: Math.round(Number(fields.price) * 100),
      logline: fields.logline,
      screenerUrl: fields.screenerUrl,
    });
    setListed(film);
  }

  if (listed) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-md border border-or-line bg-or-paper p-8">
        <ReelO size={36} className="text-or-ember" />
        <h2 className="font-serif text-title-sm text-or-ink">
          Your film is live.
        </h2>
        <p className="font-sans leading-relaxed text-or-ink-soft">
          <em className="font-serif text-or-ink">{listed.title}</em> is in the
          catalog — your name on it, your price on it. Every backing at{" "}
          {formatPrice(listed.priceCents)} goes straight to you.
        </p>
        <div className="flex flex-wrap gap-4 font-sans text-sm">
          <Link
            href={`/films/${listed.id}`}
            className="font-semibold text-or-ember underline underline-offset-4 hover:text-or-ember-deep"
          >
            See your film page
          </Link>
          <button
            type="button"
            onClick={() => {
              setListed(null);
              setFields(EMPTY);
            }}
            className="text-or-ink-soft underline underline-offset-4 hover:text-or-ember"
          >
            List another film
          </button>
        </div>
        <p className="font-sans text-xs text-or-ink-soft">
          Demo listing — stored in this browser only. Real distribution needs
          the backend.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <p className="rounded-sm bg-or-cream-deep px-4 py-3 font-sans text-sm text-or-ink-soft">
        Demo listing — no real upload. Your film joins the catalog in this
        browser, priced and credited to you.
      </p>

      <div>
        <label htmlFor="sf-title" className={LABEL}>
          Film title
        </label>
        <input
          id="sf-title"
          type="text"
          value={fields.title}
          onChange={set("title")}
          aria-invalid={!!errors.title}
          aria-describedby={errors.title ? "sf-title-error" : undefined}
          className={INPUT}
        />
        {errors.title && (
          <p id="sf-title-error" className={ERROR}>
            {errors.title}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="sf-maker" className={LABEL}>
          Your name
        </label>
        <input
          id="sf-maker"
          type="text"
          autoComplete="name"
          value={fields.maker}
          onChange={set("maker")}
          aria-invalid={!!errors.maker}
          aria-describedby={errors.maker ? "sf-maker-error" : undefined}
          className={INPUT}
        />
        {errors.maker && (
          <p id="sf-maker-error" className={ERROR}>
            {errors.maker}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="sf-runtime" className={LABEL}>
            Runtime (minutes)
          </label>
          <input
            id="sf-runtime"
            type="number"
            inputMode="numeric"
            min={1}
            max={40}
            value={fields.runtime}
            onChange={set("runtime")}
            aria-invalid={!!errors.runtime}
            aria-describedby={errors.runtime ? "sf-runtime-error" : undefined}
            className={INPUT}
          />
          {errors.runtime && (
            <p id="sf-runtime-error" className={ERROR}>
              {errors.runtime}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="sf-price" className={LABEL}>
            Your price (USD)
          </label>
          <input
            id="sf-price"
            type="number"
            inputMode="decimal"
            min={1}
            max={20}
            step={1}
            placeholder="4"
            value={fields.price}
            onChange={set("price")}
            aria-invalid={!!errors.price}
            aria-describedby={errors.price ? "sf-price-error" : undefined}
            className={INPUT}
          />
          {errors.price && (
            <p id="sf-price-error" className={ERROR}>
              {errors.price}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="sf-logline" className={LABEL}>
          Logline
        </label>
        <textarea
          id="sf-logline"
          rows={2}
          placeholder="One sentence that sells the film."
          value={fields.logline}
          onChange={set("logline")}
          aria-invalid={!!errors.logline}
          aria-describedby={errors.logline ? "sf-logline-error" : undefined}
          className={INPUT}
        />
        {errors.logline && (
          <p id="sf-logline-error" className={ERROR}>
            {errors.logline}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="sf-screener" className={LABEL}>
          Private screener link{" "}
          <span className="font-normal text-or-ink-soft">(optional)</span>
        </label>
        <input
          id="sf-screener"
          type="url"
          placeholder="https://…"
          value={fields.screenerUrl}
          onChange={set("screenerUrl")}
          aria-invalid={!!errors.screenerUrl}
          aria-describedby={errors.screenerUrl ? "sf-screener-error" : undefined}
          className={INPUT}
        />
        {errors.screenerUrl && (
          <p id="sf-screener-error" className={ERROR}>
            {errors.screenerUrl}
          </p>
        )}
      </div>

      <div className="mt-2 flex flex-col gap-3">
        <BackFilmButton type="submit">List your film</BackFilmButton>
        <p className="flex items-center gap-2 font-sans text-sm text-or-ink-soft">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-or-ember"
          />
          Every backing goes straight to you.
        </p>
      </div>
    </form>
  );
}
