'use client';
import { useEffect, useState } from 'react';

/** The CTA label "Add pack" is locked brand copy — do not reword. */
export function AddToCartButton({
  onAdd,
  disabled = false,
}: {
  onAdd: () => void;
  disabled?: boolean;
}) {
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 2600);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        onAdd();
        setAdded(true);
      }}
      className="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-full bg-mint px-9 text-lg font-extrabold text-cream shadow-mint transition active:translate-y-[3px] active:shadow-mint-sm disabled:cursor-not-allowed disabled:bg-line disabled:text-ink-faint disabled:shadow-none"
    >
      {added ? 'added to your cart!' : 'Add pack'}
      <span role="status" aria-live="polite" className="sr-only">
        {added ? 'Pack added to your cart' : ''}
      </span>
    </button>
  );
}
