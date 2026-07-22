'use client';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { Wordmark } from './Wordmark';

const pill = 'whitespace-nowrap rounded-full px-4 py-1.5 text-[15px] font-bold no-underline transition-colors hover:no-underline';

export function PageHeader() {
  const { count } = useCart();
  return (
    <header>
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <Link href="/" className="no-underline hover:no-underline" aria-label="Marginalia — home">
          <Wordmark />
        </Link>
        <nav aria-label="Main" className="flex flex-wrap items-center gap-2.5">
          <Link href="/" className={`${pill} bg-cream text-purple hover:bg-sun hover:text-ink`}>
            the drop
          </Link>
          <Link href="/about" className={`${pill} bg-cream/30 text-cream hover:bg-cream hover:text-purple`}>
            why us
          </Link>
          <Link href="/sell" className={`${pill} bg-cream/30 text-cream hover:bg-cream hover:text-purple`}>
            sell with us
          </Link>
          <Link
            href="/cart"
            className={`${pill} bg-sun font-extrabold text-ink shadow-sun transition active:translate-y-0.5 active:shadow-sun-sm`}
            aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
          >
            cart · {count}
          </Link>
        </nav>
      </div>
    </header>
  );
}
