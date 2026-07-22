import { films, getFilm } from "@/lib/films";
import { FilmDetailClient } from "./FilmDetailClient";

/**
 * ★ Film detail — the conversion page. Curated films resolve on the
 * server; maker-listed films resolve client-side (see lib/useFilm).
 */

export function generateStaticParams() {
  return films.map((f) => ({ id: f.id }));
}

export default async function FilmDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <FilmDetailClient id={id} staticFilm={getFilm(id) ?? null} />;
}
