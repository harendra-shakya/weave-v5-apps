import Link from 'next/link'
import type { Edition } from '@/lib/editions'
import { EditionArtwork } from './EditionArtwork'
import { EditionMarkLine } from './EditionMark'

/** A keepsake card: pastel, rounded, centered label. */
export function EditionCard({ edition }: { edition: Edition }) {
  return (
    <Link
      href={'/editions/' + edition.id}
      className="block rounded-card p-5 pb-6 text-center no-underline transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_28px_-14px_rgba(74,63,58,0.28)]"
      style={{ background: edition.cardBg }}
    >
      <EditionArtwork edition={edition} />
      <p className="mt-4 text-[19px] font-extrabold leading-tight text-ink">{edition.title}</p>
      <p className="mt-1 text-[12.5px] font-bold text-muted">
        {edition.artist} {'·'} {edition.year}
      </p>
      <div className="mt-2">
        <EditionMarkLine edition={edition} />
      </div>
      {edition.mine && (
        <p className="mt-2.5">
          <span className="rounded-full bg-paper px-3.5 py-1 text-[11px] font-extrabold text-mid">your stall</span>
        </p>
      )}
    </Link>
  )
}
