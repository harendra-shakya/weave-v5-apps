import { films } from "@/lib/films";
import { FilmCard } from "@/components/FilmCard";
import { EmptyState } from "@/components/EmptyState";
import { CommunityFilms } from "@/components/CommunityFilms";

/**
 * Catalog — hero + editorial film list. Not a poster grid: one featured
 * film with room to breathe, then a loose two-column flow.
 *
 * NOTE: the hero headline is the deterministic baseline copy for the
 * ATM-417 learning loop. Do not reword before the baseline run.
 */

export default function CatalogPage() {
  return (
    <>
      <section className="border-b border-or-line">
        <div className="mx-auto max-w-page px-6 py-20 md:px-10 md:py-28">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-or-ember">
            The patron's channel for indie shorts
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-display text-or-ink">
            Be the reason the next one gets made.
          </h1>
          <p className="mt-6 max-w-measure font-sans text-lg text-or-ink-soft">
            Back indie filmmakers you discover — one film at a time, straight
            to the maker.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="catalog-heading"
        className="mx-auto max-w-page px-6 py-16 md:px-10 md:py-20"
      >
        <h2
          id="catalog-heading"
          className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-or-ink-soft"
        >
          Now showing
        </h2>

        {films.length === 0 ? (
          <EmptyState
            title="Nothing here yet — the next reel is coming."
            body="We add films one at a time, when they're ready."
            actionHref="/about"
            actionLabel="Why OneReel?"
          />
        ) : (
          <div className="mt-10 flex flex-col gap-20">
            <FilmCard film={films[0]} featured />
            <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:gap-x-16">
              {films.slice(1).map((film) => (
                <FilmCard key={film.id} film={film} />
              ))}
            </div>
          </div>
        )}
        <CommunityFilms />
      </section>
    </>
  );
}
