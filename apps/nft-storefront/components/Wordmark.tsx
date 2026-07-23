import Link from 'next/link'

/** Lowercase "vitrine" wordmark with its little shelf. */
export function Wordmark({ small = false }: { small?: boolean }) {
  return (
    <Link href="/" aria-label="Vitrine — home" className="inline-flex flex-col items-start gap-0.5 no-underline">
      <span className={'font-black leading-none text-accent ' + (small ? 'text-lg' : 'text-2xl')}>vitrine</span>
      {!small && <span className="block h-1 w-11 rounded-full bg-accent-soft" aria-hidden="true" />}
    </Link>
  )
}
