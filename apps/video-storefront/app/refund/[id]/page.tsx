import { getFilm } from "@/lib/films";
import { RefundClient } from "./RefundClient";

/** Cancellation / refund — warm, not punitive. */

export default async function RefundPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ order?: string }>;
}) {
  const { id } = await params;
  const order = (await searchParams).order ?? "OR-0000";

  return (
    <div className="mx-auto max-w-page px-6 py-16 md:px-10 md:py-24">
      <RefundClient id={id} staticFilm={getFilm(id) ?? null} order={order} />
    </div>
  );
}
