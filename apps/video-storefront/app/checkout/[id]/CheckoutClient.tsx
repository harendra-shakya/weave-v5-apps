"use client";

import { useRouter } from "next/navigation";
import type { Film } from "@/lib/films";
import { formatPrice } from "@/lib/films";
import { useFilm } from "@/lib/useFilm";
import { PaymentForm } from "@/components/PaymentForm";
import { PosterPlaceholder } from "@/components/PosterPlaceholder";
import { MakerCredit } from "@/components/MakerCredit";
import { PriceTag } from "@/components/PriceTag";
import { EmptyState } from "@/components/EmptyState";

export function CheckoutClient({
  id,
  staticFilm,
}: {
  id: string;
  staticFilm: Film | null;
}) {
  const router = useRouter();
  const { ready, film } = useFilm(id, staticFilm);
  if (!ready) return null;

  if (!film) {
    return (
      <div className="mx-auto max-w-page px-6 md:px-10">
        <EmptyState
          title="That reel isn't in the archive."
          body="The film you're trying to back doesn't exist, or its link has expired."
          actionHref="/"
          actionLabel="Browse the films"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-page px-6 py-14 md:px-10 md:py-20">
      <h1 className="font-serif text-title text-or-ink">Back this film</h1>
      <p className="mt-2 font-sans text-or-ink-soft">
        Guest checkout — no account needed.
      </p>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,32rem)_minmax(0,22rem)] lg:gap-24">
        <PaymentForm
          amountLabel={formatPrice(film.priceCents)}
          makerName={film.maker}
          onSuccess={(orderId) =>
            router.push(`/backed/${film.id}?order=${orderId}`)
          }
        />

        <aside
          aria-label="Order summary"
          className="order-first flex h-fit flex-col gap-4 rounded-md border border-or-line bg-or-paper p-6 lg:order-none"
        >
          <PosterPlaceholder film={film} className="aspect-[16/10] w-full" />
          <div className="flex flex-col gap-1.5">
            <h2 className="font-serif text-title-sm text-or-ink">
              {film.title}
            </h2>
            <MakerCredit name={film.maker} size="sm" />
          </div>
          <div className="flex items-baseline justify-between border-t border-or-line pt-4">
            <span className="font-sans text-sm text-or-ink-soft">
              One film, one price
            </span>
            <PriceTag cents={film.priceCents} runtimeMin={film.runtimeMin} size="sm" />
          </div>
        </aside>
      </div>
    </div>
  );
}
