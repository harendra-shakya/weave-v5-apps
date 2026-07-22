"use client";

import { useEffect, useState } from "react";
import type { Film } from "@/lib/films";
import { getSubmittedFilms } from "@/lib/submissions";
import { FilmCard } from "./FilmCard";

/**
 * CommunityFilms — maker-listed films (localStorage), merged into the
 * catalog under their own heading. Renders nothing when there are none.
 */
export function CommunityFilms() {
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    setFilms(getSubmittedFilms());
  }, []);

  if (films.length === 0) return null;

  return (
    <section aria-labelledby="community-heading" className="mt-20">
      <h2
        id="community-heading"
        className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-or-ink-soft"
      >
        New from the makers
      </h2>
      <div className="mt-10 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:gap-x-16">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </section>
  );
}
