import Link from 'next/link'
import { Wordmark } from './Wordmark'
import { FooterNonclaim } from './FooterNonclaim'

export function PageFooter() {
  return (
    <footer className="bg-warm">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-6 px-6 pb-1 pt-8 sm:px-8">
        <Wordmark small />
        <nav aria-label="Footer" className="flex flex-wrap gap-5">
          <Link href="/" className="text-[13px] font-extrabold text-muted no-underline hover:text-ink">The shop</Link>
          <Link href="/collection" className="text-[13px] font-extrabold text-muted no-underline hover:text-ink">My Vitrine</Link>
          <Link href="/about" className="text-[13px] font-extrabold text-muted no-underline hover:text-ink">Our story</Link>
          <Link href="/maker" className="text-[13px] font-extrabold text-muted no-underline hover:text-ink">Open a stall</Link>
        </nav>
      </div>
      <div className="mt-3">
        <FooterNonclaim />
      </div>
    </footer>
  )
}
