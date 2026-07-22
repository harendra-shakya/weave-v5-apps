'use client';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { advanceOrder, canCancel, getOrder } from '@/lib/orders';
import type { Order } from '@/lib/types';
import { formatDate } from '@/lib/format';
import { FulfillmentStatus } from '@/components/FulfillmentStatus';
import { EmptyState } from '@/components/EmptyState';

export default function StatusPage({ params }: { params: Promise<{ orderId: string }> }) {
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
          body="The link may be mistyped or expired. Orders live in this browser for the demo."
          actionLabel="see the current drop"
          actionHref="/"
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl py-14">
      <div className="rounded-card bg-cream px-9 py-8 shadow-pop">
        <p className="text-sm font-semibold text-ink-faint">
          Order {order.id} · placed {formatDate(order.placedAt)}
        </p>
        <h1 className="mt-1 text-display font-extrabold text-ink">where your pack is</h1>

        <div className="mt-9">
          <FulfillmentStatus status={order.status} />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t-[3px] border-dashed border-line pt-5">
          {order.status !== 'cancelled' && order.status !== 'delivered' && (
            <button
              type="button"
              onClick={() => setOrder({ ...advanceOrder(order.id)! })}
              className="whitespace-nowrap rounded-full border-[3px] border-line bg-cream-bright px-5 py-2 text-sm font-bold text-ink-soft hover:border-purple/50 hover:text-ink"
            >
              advance status (demo)
            </button>
          )}
          {canCancel(order) && (
            <Link
              href={`/orders/${order.id}/cancel`}
              className="whitespace-nowrap text-sm font-bold text-pink no-underline hover:text-pink-deep"
            >
              need to cancel? no hard feelings.
            </Link>
          )}
          {order.status === 'shipped' && (
            <p className="text-sm font-semibold text-ink-soft">
              Shipped orders can&rsquo;t be cancelled — but if anything arrives wrong, we&rsquo;ll
              make it right.
            </p>
          )}
          <Link href="/" className="ml-auto whitespace-nowrap text-sm">
            back to the drop
          </Link>
        </div>
      </div>
    </div>
  );
}
