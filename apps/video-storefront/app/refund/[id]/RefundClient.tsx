"use client";

import { useState } from "react";
import Link from "next/link";
import type { Film } from "@/lib/films";
import { formatPrice } from "@/lib/films";
import { useFilm } from "@/lib/useFilm";
import { ReelO } from "@/components/Wordmark";
import { EmptyState } from "@/components/EmptyState";

/** Warm, not punitive: no guilt trips, no retention hoops. */

export function RefundClient({
  id,
  staticFilm,
  order,
}: {
  id: string;
  staticFilm: Film | null;
  order: string;
}) {
  const [confirmed, setConfirmed] = useState(false);
  const { ready, film } = useFilm(id, staticFilm);
  if (!ready) return null;

  if (!film) {
    return (
      <EmptyState
        title="That reel isn't in the archive."
        body="This order links to a film that doesn't exist, or its link has expired."
        actionHref="/"
        actionLabel="Browse the films"
      />
    );
  }

  const price = formatPrice(film.priceCents);

  if (confirmed) {
    return (
      <div className="mx-auto flex max-w-measure flex-col items-start gap-5">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-or-success">
          Order {order} · Refunded
        </p>
        <h1 className="font-serif text-title-lg text-or-ink">
          Your refund is on its way.
        </h1>
        <p className="font-sans text-lg leading-relaxed text-or-ink-soft">
          The full {price} is heading back to your card — usually within 3–5
          days. <em className="font-serif">{film.title}</em> has left your
          screening room, and {film.maker} thanks you for giving it a look.
        </p>
        <Link
          href="/"
          className="mt-2 font-sans font-semibold text-or-ember underline underline-offset-4 hover:text-or-ember-deep"
        >
          Browse the films
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-measure flex-col items-start gap-5">
      <ReelO size={36} className="text-or-line-strong" />
      <h1 className="font-serif text-title-lg text-or-ink">
        Change of heart? That&apos;s alright.
      </h1>
      <p className="font-sans text-lg leading-relaxed text-or-ink-soft">
        Backing should feel good. If{" "}
        <em className="font-serif text-or-ink">{film.title}</em> didn&apos;t land
        for you, we&apos;ll return the full {price} to your card. The film will
        leave your screening room once the refund goes through.
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setConfirmed(true)}
          className="inline-flex items-center justify-center rounded-sm border border-or-ember px-7 py-3 font-sans text-base font-semibold text-or-ember transition-colors hover:bg-or-ember hover:text-or-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or-ember"
        >
          Refund order {order}
        </button>
        <Link
          href={`/backed/${film.id}?order=${order}`}
          className="font-sans font-semibold text-or-ink underline underline-offset-4 hover:text-or-ember"
        >
          Keep the film
        </Link>
      </div>
      <p className="font-sans text-sm text-or-ink-soft">
        Demo refund — synthetic, like the payment. Nothing was really charged.
      </p>
    </div>
  );
}
