import Link from 'next/link'
import { primaryButton } from '@/components/buttons'

export default function NotFound() {
  return (
    <section className="mx-auto max-w-lg px-6 pb-28 pt-24 text-center sm:px-8">
      <div className="mx-auto flex h-[90px] w-[120px] items-center justify-center rounded-[18px] border-[3px] border-dashed border-sand-deep">
        <span className="text-2xl font-black text-faint">?</span>
      </div>
      <h1 className="mt-7 text-4xl font-black leading-tight">Hmm, that one&apos;s not in the shop.</h1>
      <p className="mx-auto mt-3.5 max-w-sm text-sm font-semibold leading-relaxed text-muted">
        It might have found a home already, or the link got a little scrambled. The shop&apos;s right this way.
      </p>
      <Link href="/" className={primaryButton + ' mt-7 no-underline'}>
        Browse the shop
      </Link>
    </section>
  )
}
