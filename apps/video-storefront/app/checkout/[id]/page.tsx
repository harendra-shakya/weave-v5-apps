import { getFilm } from "@/lib/films";
import { CheckoutClient } from "./CheckoutClient";

/** Checkout — guest, synthetic payment, no real provider, no % claimed. */

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CheckoutClient id={id} staticFilm={getFilm(id) ?? null} />;
}
