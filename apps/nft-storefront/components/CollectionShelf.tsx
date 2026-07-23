'use client'
import Link from 'next/link'
import { useMakers } from '@/lib/makers'
import { useCollection, type CollectionEntry } from '@/lib/collection'
import { EditionArtwork } from './EditionArtwork'
import { EmptyState } from './EmptyState'

const COUNT_WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight']

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = []
  for (let i = 0; i < items.length; i += size) rows.push(items.slice(i, i + size))
  return rows
}

function ShelfItem({ entry, index, count }: { entry: CollectionEntry; index: number; count: number }) {
  const { move } = useCollection()
  const { findEdition } = useMakers()
  const edition = findEdition(entry.editionId)
  if (!edition) return null
  const arrow =
    'h-8 w-8 cursor-pointer rounded-full border-0 bg-sand text-base font-extrabold leading-none text-ink transition-colors hover:bg-sand-deep disabled:cursor-default disabled:opacity-35'
  return (
    <div className="flex w-[196px] flex-col text-center">
      <div className="rounded-[22px] p-3.5" style={{ background: edition.cardBg }}>
        <EditionArtwork edition={edition} className="rounded-2xl" />
      </div>
      <p className="mt-3 text-base font-extrabold leading-tight">{edition.title}</p>
      <p className="mt-1 text-xs font-extrabold" style={{ color: edition.accentColor }}>
        no. {entry.number} of {edition.editionSize}
      </p>
      <p className="mt-1 text-[11.5px] font-semibold text-faint">
        {entry.label !== 'Just me' ? 'For ' + entry.label + ' · ' : ''}since {entry.acquiredAt}
      </p>
      <div className="mt-2.5 flex items-center justify-center gap-2">
        <button type="button" onClick={() => move(index, -1)} disabled={index === 0} aria-label={'Move ' + edition.title + ' left'} className={arrow}>
          &lsaquo;
        </button>
        <button type="button" onClick={() => move(index, 1)} disabled={index === count - 1} aria-label={'Move ' + edition.title + ' right'} className={arrow}>
          &rsaquo;
        </button>
        <Link href={'/editions/' + edition.id} className="px-1.5 text-xs font-extrabold no-underline">
          Peek
        </Link>
        <Link href={'/collection/return/' + edition.id} className="px-1.5 text-xs font-extrabold text-faint no-underline hover:text-mid">
          Send back
        </Link>
      </div>
    </div>
  )
}

/** "Your Vitrine" — visible, arrangeable, personal. */
export function CollectionShelf() {
  const { entries } = useCollection()

  if (entries.length === 0) {
    return (
      <EmptyState
        showShelf
        title="Your Vitrine is empty — find your first edition."
        cta={{ href: '/', label: 'Browse the shop' }}
      />
    )
  }

  const countWord = COUNT_WORDS[Math.min(entries.length, COUNT_WORDS.length - 1)]
  return (
    <div>
      <p className="text-[15px] font-bold text-muted">
        {entries.length === 1 ? 'One edition, sitting pretty.' : countWord + ' editions, arranged just so.'}
      </p>
      <p className="mb-10 mt-1.5 text-[12.5px] font-semibold text-faint">
        Nudge things left or right until it feels just right.
      </p>
      <div className="flex flex-col gap-12">
        {chunk(entries, 4).map((row, r) => (
          <div key={r}>
            <div className="flex flex-wrap items-end gap-9 px-3.5 pb-6">
              {row.map((entry, i) => (
                <ShelfItem key={entry.editionId} entry={entry} index={r * 4 + i} count={entries.length} />
              ))}
            </div>
            <div className="h-3 rounded-full bg-sand-deep shadow-[0_10px_18px_-10px_rgba(74,63,58,0.3)]" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  )
}
