"use client";

import Link from "next/link";
import type { Film } from "@/lib/films";
import { formatPrice } from "@/lib/films";
import { useFilm } from "@/lib/useFilm";
import { PosterPlaceholder } from "@/components/PosterPlaceholder";
import { EmptyState } from "@/components/EmptyState";

export function BackedClient({
  id,
  staticFilm,
  order,
}: {
  id: string;
  staticFilm: Film | null;
  order: string;
}) {
  const { ready, film } = useFilm(id, staticFilm);
  if (!ready) return null;

  if (!film) {
    return (
      <div className="mx-auto max-w-page px-6 md:px-10">
        <EmptyState
          title="That reel isn't in the archive."
          body="This order links to a film that doesn't exist, or its link has expired."
          actionHref="/"
          actionLabel="Browse the films"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-page px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-or-success">
            Order {order} · Confirmed
          </p>
          <h1 className="max-w-2xl font-serif text-title-lg text-or-ink">
            You backed {film.maker}. Enjoy the film.
          </h1>
          <p className="max-w-measure font-sans text-lg text-or-ink-soft">
            <em className="font-serif">{film.title}</em> is in your screening
            room — yours to watch whenever you like, for keeps. A receipt and
            your film link are on their way to your email.
          </p>

          {/* Screening room — access fulfillment (demo: no real playback) */}
          <div className="relative mt-2 max-w-xl">
            <PosterPlaceholder
              film={film}
              className="aspect-[16/10] w-full shadow-card"
            />
            <button
              type="button"
              aria-label={`Play ${film.title} (demo preview)`}
              className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-or-ink/80 text-or-paper transition-colors hover:bg-or-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-or-paper"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M6 4l10 6-10 6z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>

        <aside
          aria-label="Receipt"
          className="flex h-fit flex-col gap-4 rounded-md border border-or-line bg-or-paper p-6"
        >
          <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-or-ink-soft">
            Receipt
          </h2>
          <dl className="flex flex-col gap-3 font-sans text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-or-ink-soft">Film</dt>
              <dd className="text-right font-medium text-or-ink">{film.title}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-or-ink-soft">Maker</dt>
              <dd className="text-right font-semibold text-or-ember">{film.maker}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-or-ink-soft">Order</dt>
              <dd className="text-or-ink">{order}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-or-line pt-3">
              <dt className="text-or-ink-soft">Paid</dt>
              <dd className="font-serif text-lg text-or-ink">
                {formatPrice(film.priceCents)}
              </dd>
            </div>
          </dl>
          <p className="flex items-center gap-2 border-t border-or-line pt-4 font-sans text-sm text-or-ink-soft">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-or-ember"
            />
            Straight to the maker.
          </p>
          <div className="flex flex-col gap-2 pt-1 font-sans text-sm">
            <Link
              href="/"
              className="font-semibold text-or-ink underline underline-offset-4 hover:text-or-ember"
            >
              Browse more films
            </Link>
            <Link
              href={`/refund/${film.id}?order=${order}`}
              className="text-or-ink-soft underline underline-offset-4 hover:text-or-ember"
            >
              Changed your mind? Refunds are easy.
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
