import { getFilm } from "@/lib/films";
import { BackedClient } from "./BackedClient";

/**
 * Order confirmation + access — "You backed [Filmmaker]. Enjoy the film."
 */

export default async function BackedPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ order?: string }>;
}) {
  const { id } = await params;
  const order = (await searchParams).order ?? "OR-0000";
  return <BackedClient id={id} staticFilm={getFilm(id) ?? null} order={order} />;
}
