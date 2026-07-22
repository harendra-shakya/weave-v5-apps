import type { OrderStatus } from '@/lib/types';
import { STATUS_FLOW } from '@/lib/orders';
import { StepTracker } from './StepTracker';

const LABELS: Record<string, string> = {
  ordered: 'Ordered',
  packed: 'Packed',
  shipped: 'Shipped',
  delivered: 'Delivered',
};

const NOTES: Record<string, string> = {
  ordered: 'Your order is on the artist\'s desk.',
  packed: 'Sheets sleeved and tucked into a rigid mailer.',
  shipped: 'In the mail — tracked letter post.',
  delivered: 'On your desk. Happy planning.',
};

/** Ordered → Packed → Shipped → Delivered (locked copy). */
export function FulfillmentStatus({ status }: { status: OrderStatus }) {
  if (status === 'cancelled') {
    return (
      <p className="rounded-2xl border-[3px] border-pink bg-pink/15 px-5 py-3.5 text-[15px] font-bold text-pink-deep">
        This order was cancelled and refunded in full.
      </p>
    );
  }
  return (
    <StepTracker
      ariaLabel="Fulfillment progress"
      current={STATUS_FLOW.indexOf(status)}
      steps={STATUS_FLOW.map((s) => ({ label: LABELS[s], note: NOTES[s] }))}
    />
  );
}
