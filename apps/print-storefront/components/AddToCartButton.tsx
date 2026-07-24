'use client';
import { useState } from 'react';
import { addToCart } from '@/lib/cart';
import type { Format } from '@/lib/types';

interface AddToCartButtonProps {
  posterId: string;
  format: Format;
  onAdded?: () => void;
}

export default function AddToCartButton({ posterId, format, onAdded }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  function handleClick() {
    addToCart(posterId, format);
    setAdded(true);
    onAdded?.();
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Add ${format} format to collection`}
      className={[
        'w-full min-h-[44px] px-6 py-3 rounded-control font-sans text-sm font-medium transition-colors',
        added
          ? 'bg-sage text-white cursor-default'
          : 'bg-sage-deep text-white hover:bg-sage active:bg-sage-deep',
      ].join(' ')}
    >
      {added ? 'Added to collection' : 'Add to collection'}
    </button>
  );
}
