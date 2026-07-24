import { formatPrice } from '@/lib/format';

interface PriceTagProps {
  cents: number;
  originalCents?: number;
  className?: string;
}

export default function PriceTag({ cents, originalCents, className = '' }: PriceTagProps) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="font-sans text-sm font-medium text-ink">{formatPrice(cents)}</span>
      {originalCents && originalCents !== cents && (
        <span className="font-sans text-xs text-ink-muted line-through">{formatPrice(originalCents)}</span>
      )}
    </span>
  );
}
