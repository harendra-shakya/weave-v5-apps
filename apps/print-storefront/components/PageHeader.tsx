'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Wordmark from './Wordmark';
import { getCart } from '@/lib/cart';

export default function PageHeader() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function refresh() {
      setCount(getCart().items.length);
    }
    refresh();
    window.addEventListener('storage', refresh);
    window.addEventListener('tableau:cart-updated', refresh);
    return () => {
      window.removeEventListener('storage', refresh);
      window.removeEventListener('tableau:cart-updated', refresh);
    };
  }, []);

  const cartLabel = count === 1 ? '1 item' : `${count} items`;

  return (
    <header className="sticky top-0 z-30 bg-white/surface border-b border-border">
      <div className="mx-auto max-w-page px-6 h-14 flex items-center justify-between">
        <Wordmark />
        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-6 text-sm list-none m-0 p-0">
            <li><Link href="/catalog" className="text-ink-soft hover:text-ink no-underline">Browse</Link></li>
            <li>
              <Link
                href="/cart"
                className="text-ink-soft hover:text-ink no-underline"
                aria-label={`Cart — ${cartLabel}`}
              >
                Cart
                {count > 0 && (
                  <span
                    aria-hidden="true"
                    className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-sage-deep text-white text-[10px] font-medium leading-none"
                  >
                    {count}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
        {/* Live cart count for screen readers */}
        <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {count > 0 ? `Cart: ${cartLabel}` : 'Cart is empty'}
        </div>
      </div>
    </header>
  );
}
