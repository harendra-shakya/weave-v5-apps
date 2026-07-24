import type { Order } from '@/lib/types';
import { STATE_COPY } from '@/lib/orders';
import { formatDate } from '@/lib/format';

interface OrderStatusProps {
  order: Order;
}

const STATE_COLOURS: Record<string, string> = {
  placed:         'text-ink-soft',
  download_ready: 'text-sage-deep',
  cancelled:      'text-ink-muted line-through',
};

export default function OrderStatus({ order }: OrderStatusProps) {
  const copy = STATE_COPY[order.state];
  return (
    <div className="border border-border rounded-card p-5 space-y-2">
      <p className={`text-sm font-medium ${STATE_COLOURS[order.state]}`}>{copy.label}</p>
      <p className="text-xs text-ink-muted">{copy.description}</p>
      <p className="label-caption text-ink-faint">Placed {formatDate(order.placed_at)} · Order {order.id}</p>
    </div>
  );
}
