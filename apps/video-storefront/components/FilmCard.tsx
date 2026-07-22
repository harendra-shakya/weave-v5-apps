import Link from "next/link";
import type { Film } from "@/lib/films";
import { PosterPlaceholder } from "./PosterPlaceholder";
import { MakerCredit } from "./MakerCredit";
import { PriceTag } from "./PriceTag";

/**
 * FilmCard — editorial, not a grid tile. Each film gets room; the maker's
 * name is always on the card (brand proof point). `featured` renders the
 * large side-by-side treatment for the lead film.
 */

export function FilmCard({
  film,
  featured = false,
}: {
  film: Film;
  featured?: boolean;
}) {
  if (featured) {
    return (
      <Link
        href={`/films/${film.id}`}
        className="group grid gap-8 no-underline md:grid-cols-[3fr_2fr] md:items-center"
      >
        <PosterPlaceholder
          film={film}
          className="aspect-[16/10] w-full shadow-card"
        />
        <div className="flex flex-col items-start gap-4">
          <MakerCredit name={film.maker} />
          <h3 className="font-serif text-title text-or-ink transition-colors group-hover:text-or-ember">
            {film.title}
          </h3>
          <p className="max-w-measure text-or-ink-soft">{film.logline}</p>
          <PriceTag cents={film.priceCents} runtimeMin={film.runtimeMin} />
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/films/${film.id}`}
      className="group flex flex-col items-start gap-3 no-underline"
    >
      <PosterPlaceholder film={film} className="aspect-[16/10] w-full" />
      <MakerCredit name={film.maker} size="sm" />
      <h3 className="font-serif text-title-sm text-or-ink transition-colors group-hover:text-or-ember">
        {film.title}
      </h3>
      <p className="text-sm leading-relaxed text-or-ink-soft line-clamp-2">
        {film.logline}
      </p>
      <PriceTag cents={film.priceCents} runtimeMin={film.runtimeMin} size="sm" />
    </Link>
  );
}
