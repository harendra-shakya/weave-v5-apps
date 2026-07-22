"use client";

import type { Film } from "@/lib/films";
import { formatPrice } from "@/lib/films";
import { useFilm } from "@/lib/useFilm";
import { PosterPlaceholder } from "@/components/PosterPlaceholder";
import { MakerCredit } from "@/components/MakerCredit";
import { PriceTag } from "@/components/PriceTag";
import { BackFilmButton } from "@/components/BackFilmButton";
import { EmptyState } from "@/components/EmptyState";

export function FilmDetailClient({
  id,
  staticFilm,
}: {
  id: string;
  staticFilm: Film | null;
}) {
  const { ready, film } = useFilm(id, staticFilm);
  if (!ready) return null;

  if (!film) {
    return (
      <div className="mx-auto max-w-page px-6 md:px-10">
        <EmptyState
          title="That reel isn't in the archive."
          body="The film you're looking for doesn't exist, or its link has expired."
          actionHref="/"
          actionLabel="Browse the films"
        />
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-page px-6 py-14 md:px-10 md:py-20">
      <div className="grid gap-10 lg:grid-cols-[7fr_5fr] lg:gap-16">
        <PosterPlaceholder
          film={film}
          className="aspect-[16/10] w-full self-start shadow-card lg:aspect-[4/3]"
        />

        <div className="flex flex-col gap-5">
          <MakerCredit name={film.maker} size="lg" />
          <h1 className="font-serif text-title-lg text-or-ink">{film.title}</h1>
          <p className="font-sans text-sm text-or-ink-soft">
            {film.year} · {film.runtimeMin} min · Short film
          </p>
          <p className="max-w-measure font-serif text-lg leading-relaxed text-or-ink">
            {film.logline}
          </p>
          {film.synopsis !== film.logline && (
            <p className="max-w-measure font-sans leading-relaxed text-or-ink-soft">
              {film.synopsis}
            </p>
          )}

          <div className="mt-4 flex flex-col items-start gap-4 border-t border-or-line pt-6">
            <div className="flex items-baseline gap-3">
              <PriceTag cents={film.priceCents} size="lg" />
              <span className="font-sans text-sm text-or-ink-soft">
                One film, one price. Yours to watch, for keeps.
              </span>
            </div>
            <BackFilmButton href={`/checkout/${film.id}`}>
              Back this film — {formatPrice(film.priceCents)}
            </BackFilmButton>
            <p className="flex items-center gap-2 font-sans text-sm text-or-ink-soft">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-or-ember"
              />
              Your payment goes straight to the maker.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
