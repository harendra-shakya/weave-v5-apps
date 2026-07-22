'use client';
import { use, useState } from 'react';
import Link from 'next/link';
import { getPack, defaultVariant, variantPrice, variantLabel } from '@/lib/packs';
import { useCart } from '@/lib/cart';
import type { VariantSelection } from '@/lib/types';
import { VariantSelector } from '@/components/VariantSelector';
import { AddToCartButton } from '@/components/AddToCartButton';
import { ArtistCredit } from '@/components/ArtistCredit';
import { PriceTag } from '@/components/PriceTag';
import { StickerPlaceholder } from '@/components/StickerPlaceholder';
import { EmptyState } from '@/components/EmptyState';

export default function PackPage({ params }: { params: Promise<{ packId: string }> }) {
  const { packId } = use(params);
  const pack = getPack(packId);
  const [variant, setVariant] = useState<VariantSelection | null>(null);
  const [added, setAdded] = useState(false);
  const cart = useCart();

  if (!pack) {
    return (
      <div className="py-20">
        <EmptyState
          note="oops, a stray peel"
          title="This pack isn't on the shelf."
          body="The link may be from an older drop — we keep the catalog small, so packs come and go. The current drop is one page over."
          actionLabel="see the current drop"
          actionHref="/"
        />
      </div>
    );
  }

  const v = variant ?? defaultVariant(pack);
  const price = variantPrice(pack, v);

  return (
    <>
      <Link
        href="/"
        className="mt-7 inline-block whitespace-nowrap rounded-full bg-cream/30 px-4 py-1.5 text-sm font-bold text-cream no-underline hover:bg-cream hover:text-purple hover:no-underline"
      >
        ← back to the drop
      </Link>
      <article className="grid gap-8 py-6 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <div>
          <StickerPlaceholder
            pack={pack}
            className={`mx-auto w-full rounded-card bg-cream shadow-pop transition-all [&]:bg-cream ${
              v.size === 'A5' ? 'aspect-[210/148] max-w-xl' : 'aspect-[148/105] max-w-md'
            }`}
          />
          {/* True-scale principle — the visual proof of "what you see ships" */}
          <p className="mt-4 text-center text-[15px] font-semibold text-lavender">
            <span className="badge-tilt mr-2 inline-block rounded-full bg-sun px-3 py-0.5 text-[13px] font-bold text-ink">
              true size
            </span>
            one {v.size} sheet is {v.size === 'A6' ? '148 × 105 mm' : '210 × 148 mm'}
          </p>
        </div>

        <div className="flex flex-col gap-5 rounded-card bg-cream p-8 shadow-pop">
          <header className="flex flex-col items-start gap-2">
            <ArtistCredit name={pack.artist} size="lg" />
            <h1 className="text-display font-extrabold text-ink">{pack.name}</h1>
            <p className="font-medium leading-relaxed text-ink-soft">{pack.description}</p>
            <p className="mt-1 rounded-full bg-mint/15 px-4 py-1.5 text-sm font-bold text-mint-deep">
              Shown at true size. Finish and pack contents, no surprises.
            </p>
          </header>

          <VariantSelector pack={pack} value={v} onChange={setVariant} />

          <div className="flex flex-wrap items-center gap-4 border-t-[3px] border-dashed border-line pt-4">
            <PriceTag cents={price} size="lg" />
            <span className="text-sm font-semibold text-ink-faint">{variantLabel(v)}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3.5">
            <AddToCartButton
              onAdd={() => {
                cart.add(pack.id, v);
                setAdded(true);
              }}
            />
            {added && (
              <Link
                href="/cart"
                className="whitespace-nowrap rounded-full border-[3px] border-mint px-5 py-2 text-[15px] font-bold text-mint-deep no-underline hover:bg-mint/10 hover:no-underline"
              >
                view cart →
              </Link>
            )}
          </div>

          <section aria-labelledby="contents-heading" className="rounded-2xl bg-sun/20 p-5">
            <h2 id="contents-heading" className="mb-2.5 text-sm font-extrabold uppercase tracking-[0.06em] text-ink">
              in every sheet
            </h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm font-semibold text-ink-soft">
              {pack.contents.map((c) => (
                <li key={c} className="flex items-baseline gap-2">
                  <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-pink" />
                  {c}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </>
  );
}
