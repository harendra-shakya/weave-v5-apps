'use client';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { cancelOrder, canCancel, getOrder } from '@/lib/orders';
import type { Order } from '@/lib/types';
import { formatCents } from '@/lib/format';
import { EmptyState } from '@/components/EmptyState';

export default function CancelPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const [order, setOrder] = useState<Order | null | undefined>(undefined);
  useEffect(() => setOrder(getOrder(orderId) ?? null), [orderId]);

  if (order === undefined) return null;
  if (order === null) {
    return (
      <div className="py-20">
        <EmptyState
          note="a stray mark"
          title="We can't find that order."
          body="The link may be mistyped or expired."
          actionLabel="see the current drop"
          actionHref="/"
        />
      </div>
    );
  }

  if (order.status === 'cancelled') {
    return (
      <div className="mx-auto max-w-xl py-16 text-center sm:py-20">
        <p className="badge-tilt inline-block rounded-full bg-sun px-5 py-1.5 font-extrabold text-ink shadow-sun">
          done!
        </p>
        <h1 className="text-pop mt-5 text-display font-extrabold">
          Cancelled, and your {formatCents(order.refundedCents ?? order.totalCents)} is on its way
          back.
        </h1>
        <p className="mt-4 font-semibold leading-relaxed text-lavender">
          The full amount returns to your card in 3–5 business days. No fees, no restocking
          charge, no questions. We hope a future drop is a better fit.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center whitespace-nowrap rounded-full bg-mint px-8 text-lg font-extrabold text-cream no-underline shadow-mint transition active:translate-y-[3px] active:shadow-mint-sm hover:no-underline"
        >
          browse the current drop
        </Link>
      </div>
    );
  }

  if (!canCancel(order)) {
    return (
      <div className="py-20">
        <EmptyState
          tone="pink"
          note="almost there"
          title="This one's already in the mail."
          body="Shipped orders can't be cancelled mid-route — but if the pack arrives damaged or isn't what was shown, tell us and we'll refund or replace it."
          actionLabel="back to order status"
          actionHref={`/orders/${order.id}/status`}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl py-16 sm:py-20">
      <div className="rounded-card bg-cream p-9 shadow-pop">
        <h1 className="text-display font-extrabold text-ink">cancel this order?</h1>
        <p className="mt-3.5 font-medium leading-relaxed text-ink-soft">
          Plans change — no hard feelings. Order {order.id} hasn&rsquo;t shipped, so cancelling
          refunds the full{' '}
          <span className="font-extrabold text-ink">{formatCents(order.totalCents)}</span>,
          including shipping. Nothing to return, nothing to explain.
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setOrder({ ...cancelOrder(order.id)! })}
            className="inline-flex min-h-12 items-center whitespace-nowrap rounded-full bg-pink px-8 text-lg font-extrabold text-cream shadow-pink transition active:translate-y-[3px] active:shadow-pink-sm"
          >
            cancel &amp; refund in full
          </button>
          <Link href={`/orders/${order.id}/status`} className="text-[15px]">
            keep my order
          </Link>
        </div>
      </div>
    </div>
  );
}
