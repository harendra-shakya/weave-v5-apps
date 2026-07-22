'use client';
import Link from 'next/link';
import type { CartLine } from '@/lib/types';
import { getPack, variantLabel, variantPrice } from '@/lib/packs';
import { lineKey, useCart } from '@/lib/cart';
import { formatCents } from '@/lib/format';
import { StickerPlaceholder } from './StickerPlaceholder';

export function CartLineItem({ line }: { line: CartLine }) {
  const { setQty, remove } = useCart();
  const pack = getPack(line.packId);
  if (!pack) return null;
  const key = lineKey(line.packId, line.variant);
  const unit = variantPrice(pack, line.variant);

  return (
    <li className="flex gap-4 border-b-[3px] border-dashed border-line py-5 last:border-b-0 sm:gap-5">
      <Link href={`/packs/${pack.id}`} className="shrink-0 no-underline" aria-hidden tabIndex={-1}>
        <StickerPlaceholder
          pack={pack}
          className="h-20 w-24 overflow-hidden rounded-2xl [&>div]:scale-[0.42] [&>div]:gap-1 [&>div]:p-0"
        />
      </Link>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-xl font-extrabold text-ink">
            <Link href={`/packs/${pack.id}`} className="font-extrabold text-ink no-underline hover:text-pink hover:no-underline">
              {pack.name}
            </Link>
          </h2>
          <span className="font-extrabold text-ink">{formatCents(unit * line.qty)}</span>
        </div>
        <p className="text-[13px] font-bold text-pink">made by {pack.artist}</p>
        <p className="text-sm font-semibold text-ink-soft">{variantLabel(line.variant)}</p>
        <div className="mt-2 flex items-center gap-3.5">
          <div
            className="inline-flex items-center rounded-full bg-purple/10"
            role="group"
            aria-label={`Quantity of ${pack.name}`}
          >
            <button
              type="button"
              onClick={() => setQty(key, line.qty - 1)}
              aria-label="Decrease quantity"
              className="h-9 w-9 rounded-full text-lg font-extrabold text-purple hover:bg-purple/15"
            >
              −
            </button>
            <span aria-live="polite" className="min-w-8 text-center text-[15px] font-extrabold text-ink">
              {line.qty}
            </span>
            <button
              type="button"
              onClick={() => setQty(key, line.qty + 1)}
              aria-label="Increase quantity"
              className="h-9 w-9 rounded-full text-lg font-extrabold text-purple hover:bg-purple/15"
            >
              +
            </button>
          </div>
          <span className="text-xs font-semibold text-ink-faint">{formatCents(unit)} each</span>
          <button
            type="button"
            onClick={() => remove(key)}
            aria-label={`Remove ${pack.name} from cart`}
            className="ml-auto whitespace-nowrap text-sm font-bold text-pink hover:text-pink-deep"
          >
            remove
          </button>
        </div>
      </div>
    </li>
  );
}
