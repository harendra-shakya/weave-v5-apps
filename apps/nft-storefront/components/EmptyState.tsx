import Link from 'next/link'
import { primaryButton } from './buttons'

/** Calm empty/edge state, optionally with the bare-shelf motif. */
export function EmptyState({
  title,
  note,
  cta,
  showShelf = false,
}: {
  title: string
  note?: string
  cta?: { href: string; label: string }
  showShelf?: boolean
}) {
  return (
    <div className="flex flex-col items-center px-6 py-16 text-center">
      {showShelf && (
        <div className="flex flex-col items-center">
          <div className="flex h-[110px] w-[150px] items-center justify-center rounded-[18px] border-[3px] border-dashed border-sand-deep">
            <span className="text-xs font-extrabold text-faint">saved for you</span>
          </div>
          <div className="mt-3.5 h-3 w-[210px] rounded-full bg-sand-deep shadow-[0_10px_18px_-10px_rgba(74,63,58,0.3)]" aria-hidden="true" />
        </div>
      )}
      <p className={'max-w-sm text-2xl font-extrabold leading-snug ' + (showShelf ? 'mt-9' : '')}>{title}</p>
      {note && <p className="mt-3 max-w-sm text-sm font-semibold text-muted">{note}</p>}
      {cta && (
        <Link href={cta.href} className={primaryButton + ' mt-7 no-underline'}>
          {cta.label}
        </Link>
      )}
    </div>
  )
}
