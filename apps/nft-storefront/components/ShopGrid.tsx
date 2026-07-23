'use client'
import Link from 'next/link'
import { useMakers } from '@/lib/makers'
import { EditionCard } from './EditionCard'
import { EmptyState } from './EmptyState'
import { primaryButton } from './buttons'

/** The shop: maker stalls first, then the seasonal keepsakes, plus the stall invitation. */
export function ShopGrid() {
  const { allEditions } = useMakers()
  const all = allEditions()

  return (
    <>
      <div className="mb-7 flex flex-wrap items-baseline justify-between gap-4">
        <h2 className="text-xl font-extrabold">This season&apos;s editions</h2>
        <p className="text-[13px] font-bold text-faint">{all.length} little wonders {'·'} summer 2026</p>
      </div>
      {all.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {all.map((edition) => (
            <EditionCard key={edition.id} edition={edition} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="The next editions are being catalogued."
          note="Each one gets numbered and documented by hand — check back soon."
        />
      )}
      <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-card bg-accent-soft px-9 py-8">
        <div>
          <p className="text-[21px] font-black">Make something little?</p>
          <p className="mt-1.5 text-[13.5px] font-semibold text-mid">
            Open your own stall — upload a piece and it joins the shop as a numbered edition.
          </p>
        </div>
        <Link href="/maker" className={primaryButton + ' no-underline'}>
          Open a stall
        </Link>
      </div>
    </>
  )
}
