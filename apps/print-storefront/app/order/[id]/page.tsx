'use client';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import EmptyState from '@/components/EmptyState';
import OrderStatus from '@/components/OrderStatus';
import PriceTag from '@/components/PriceTag';
import { getOrder, markDownloaded, cancelOrder, canCancel } from '@/lib/orders';
import { getPoster } from '@/lib/catalog';
import type { Order } from '@/lib/types';

interface Props { params: Promise<{ id: string }> }

export default function OrderPage({ params }: Props) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [loaded, setLoaded] = useState(false);
  const [downloadedNow, setDownloadedNow] = useState<Set<string>>(new Set());

  useEffect(() => {
    setOrder(getOrder(id));
    setLoaded(true);
  }, [id]);

  if (!loaded) return null;

  if (!order) {
    return (
      <EmptyState
        heading="Order not found"
        body="This order doesn't exist or may belong to a different browser."
        cta={{ label: 'Back to homepage', href: '/' }}
      />
    );
  }

  function handleDownload(posterId: string, format: string) {
    markDownloaded(id, posterId);
    setOrder(getOrder(id));
    setDownloadedNow((prev) => new Set(prev).add(`${posterId}-${format}`));
  }

  function handleCancel() {
    if (!canCancel(order!)) return;
    cancelOrder(id);
    setOrder(getOrder(id));
  }

  return (
    <div className="mx-auto max-w-page px-6 py-12">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2 text-xs text-ink-muted list-none p-0 m-0">
          <li><Link href="/" className="hover:text-sage">Home</Link></li>
          <li aria-hidden="true">·</li>
          <li aria-current="page" className="text-ink-soft">Order</li>
        </ol>
      </nav>

      <div className="max-w-2xl">
        <h1 className="font-display text-display text-ink mb-1">Order confirmed</h1>
        <p className="text-xs text-ink-muted mb-8 font-mono">{order.id}</p>

        <OrderStatus order={order} />

        <div className="mt-8 border border-border rounded-card divide-y divide-border">
          {order.items.map((item) => {
            const poster = getPoster(item.poster_id);
            return (
              <div key={`${item.poster_id}-${item.format}`} className="flex items-center gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-ink truncate">{poster?.title ?? item.poster_id}</p>
                  <p className="label-caption mt-0.5">{item.format} · {item.downloaded ? 'Downloaded' : 'Ready to download'}</p>
                </div>
                {poster && <PriceTag cents={poster.price_cents} />}
                {order.state === 'download_ready' && (
                  <div className="flex flex-col items-end gap-1">
                    <button
                      type="button"
                      onClick={() => handleDownload(item.poster_id, item.format)}
                      className="text-xs text-white bg-sage-deep px-3 py-2 rounded-control hover:bg-sage transition-colors min-h-[44px]"
                    >
                      {item.downloaded ? 'Download again' : 'Download PDF'}
                    </button>
                    {downloadedNow.has(`${item.poster_id}-${item.format}`) && (
                      <p className="text-xs text-sage" role="status" aria-live="polite">
                        ✓ Synthetic download complete
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm font-medium text-ink">Total paid</p>
          <p className="text-sm font-medium text-ink">${(order.total_cents / 100).toFixed(2)}</p>
        </div>

        {canCancel(order) && (
          <div className="mt-8 border-t border-border pt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="text-xs text-ink-muted underline hover:text-ink"
            >
              Cancel order (within 30 min of purchase)
            </button>
          </div>
        )}

        <div className="mt-8 border-t border-border pt-6">
          <Link href="/catalog" className="text-sm text-sage hover:text-sage-deep">
            Continue browsing →
          </Link>
        </div>
      </div>
    </div>
  );
}
