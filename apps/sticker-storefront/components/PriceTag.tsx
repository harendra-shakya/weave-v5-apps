import { formatCents } from '@/lib/format';

export function PriceTag({
  cents,
  from = false,
  size = 'md',
}: {
  cents: number;
  from?: boolean;
  size?: 'md' | 'lg';
}) {
  return (
    <span className={`font-extrabold text-ink ${size === 'lg' ? 'text-3xl' : 'text-base'}`}>
      {from && <span className="mr-1 text-sm font-semibold text-ink-soft">from</span>}
      {formatCents(cents)}
    </span>
  );
}
