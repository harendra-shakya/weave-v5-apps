'use client';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { getOrder } from '@/lib/orders';
import type { Order } from '@/lib/types';
import { formatCents } from '@/lib/format';
import { variantLabel } from '@/lib/packs';
import { EmptyState } from '@/components/EmptyState';

export default function ConfirmationPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  useEffect(() => setOrder(getOrder(orderId) ?? null), [orderId]);

  if (order === undefined) return null; // hydrating
  if (order === null) {
    return (
      <div className="py-20">
        <EmptyState
          note="a stray mark"
          title="We can't find that order."
          body="The link may be mistyped or from another device. Orders live in this browser for the demo."
          actionLabel="see the current drop"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl py-16 text-center sm:py-20">
      <p className="badge-tilt inline-block rounded-full bg-sun px-5 py-1.5 font-extrabold text-ink shadow-sun">
        all set!
      </p>
      <h1 className="text-pop mt-5 text-display-lg font-extrabold">Your pack is on the way.</h1>
      <p className="mt-4 font-semibold leading-relaxed text-lavender">
        Order <span className="text-sun">{order.id}</span> is confirmed and a receipt is off to{' '}
        <span className="text-sun">{order.email}</span>. What you saw is what ships.
      </p>

      <div className="mt-9 rounded-card bg-cream p-7 text-left shadow-pop">
        <ul className="flex list-none flex-col gap-3 text-sm">
          {order.lines.map((l) => (
            <li key={`${l.packId}-${variantLabel(l.variant)}`} className="flex justify-between gap-4">
              <span>
                <span className="font-extrabold text-ink">{l.packName}</span>
                <span className="block text-xs font-semibold text-ink-soft">
                  {variantLabel(l.variant)} · ×{l.qty} · by {l.artist}
                </span>
              </span>
              <span className="font-extrabold text-ink">{formatCents(l.unitCents * l.qty)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-4 flex justify-between border-t-[3px] border-dashed border-line pt-4 text-lg">
          <dt className="font-extrabold text-ink">Total</dt>
          <dd className="font-extrabold text-ink">{formatCents(order.totalCents)}</dd>
        </dl>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href={`/orders/${order.id}/status`}
          className="inline-flex min-h-12 items-center whitespace-nowrap rounded-full bg-mint px-8 text-lg font-extrabold text-cream no-underline shadow-mint transition active:translate-y-[3px] active:shadow-mint-sm hover:no-underline"
        >
          follow your pack
        </Link>
        <Link
          href="/"
          className="whitespace-nowrap rounded-full bg-cream/30 px-4 py-1.5 text-sm font-bold text-cream no-underline hover:bg-cream hover:text-purple hover:no-underline"
        >
          back to the drop
        </Link>
      </div>
    </div>
  );
}
