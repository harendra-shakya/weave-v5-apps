'use client'
// Client-side detail view so maker stalls (local fixtures) resolve too.
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMakers } from '@/lib/makers'
import { useCollection } from '@/lib/collection'
import { EditionArtwork } from './EditionArtwork'
import { DetailsBlock } from './DetailsBlock'
import { AddToCollectionButton } from './AddToCollectionButton'
import { EmptyState } from './EmptyState'
import { softButton } from './buttons'

export function EditionDetail({ id }: { id: string }) {
  const router = useRouter()
  const { findEdition, closeStall } = useMakers()
  const { isOwned, remove } = useCollection()
  const edition = findEdition(id)

  if (!edition) {
    return (
      <EmptyState
        showShelf
        title="Hmm, that one's not in the shop."
        note="It might have found a home already, or the link got a little scrambled."
        cta={{ href: '/', label: 'Browse the shop' }}
      />
    )
  }

  const owned = isOwned(edition.id)
  const number = owned ? owned.number : edition.nextNumber

  return (
    <>
      <Link href="/" className={softButton + ' no-underline'}>
        &larr; Back to the shop
      </Link>
      <div className="mt-7 flex flex-wrap items-start gap-10">
        <div className="min-w-0 flex-[1_1_380px]">
          <div className="rounded-[32px] p-8" style={{ background: edition.cardBg }}>
            <EditionArtwork edition={edition} className="rounded-3xl" />
          </div>
        </div>
        <div className="min-w-0 flex-[1_1_340px]">
          <p className="flex flex-wrap items-baseline gap-2.5">
            <span className="text-6xl font-black leading-none text-accent sm:text-7xl">no. {number}</span>
            <span className="text-xl font-extrabold text-faint sm:text-2xl">of {edition.editionSize}</span>
          </p>
          <h1 className="mt-3.5 text-4xl font-black leading-tight">{edition.title}</h1>
          <p className="mt-2 text-sm font-bold text-muted">
            {edition.artist} {'·'} {edition.year}
          </p>
          <div className="mt-7">
            <DetailsBlock edition={edition} />
          </div>
          <div className="mt-6">
            <AddToCollectionButton edition={edition} />
          </div>
          {edition.mine && (
            <button
              type="button"
              className="mt-5 cursor-pointer border-0 bg-transparent p-0 text-[12.5px] font-extrabold text-faint hover:text-mid"
              onClick={() => {
                closeStall(edition.id)
                if (owned) remove(edition.id)
                router.push('/')
              }}
            >
              Close this stall — take it out of the shop
            </button>
          )}
        </div>
      </div>
    </>
  )
}
