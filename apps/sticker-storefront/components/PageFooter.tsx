import Link from 'next/link';

const flink = 'text-sm font-bold text-lavender-deep no-underline hover:text-sun hover:no-underline';

export function PageFooter() {
  return (
    <footer className="bg-purple-deep">
      <div className="mx-auto flex max-w-page flex-wrap justify-between gap-8 px-5 py-10 sm:px-8">
        <div className="max-w-sm">
          <span className="font-display text-2xl font-extrabold text-cream">
            marginalia<span className="text-sun">!</span>
          </span>
          <p className="mt-2.5 text-sm font-medium leading-relaxed text-lavender-deep">
            Small, curated sticker drops from real artists — shown at true size, so you know
            exactly what you&rsquo;re getting before it ships.
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-col items-start gap-2">
          <Link href="/" className={flink}>the current drop</Link>
          <Link href="/about" className={flink}>why marginalia</Link>
          <Link href="/cart" className={flink}>your cart</Link>
          <Link href="/sell" className={flink}>sell with us</Link>
          <Link href="/curator" className={flink}>curator view (demo)</Link>
        </nav>
        <p className="max-w-[240px] text-xs font-medium leading-relaxed text-lavender-deep/70">
          Demo storefront — synthetic checkout and fulfillment. Nothing real ships (yet). Payment
          failure: end the card number in 0002 at checkout.
        </p>
      </div>
    </footer>
  );
}
