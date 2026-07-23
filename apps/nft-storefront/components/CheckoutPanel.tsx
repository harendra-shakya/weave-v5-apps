'use client'
// Chainless checkout: "one last look" then it joins Your Vitrine.
// No payment provider, no chain, no wallet — confirming records local ownership.
import { useState } from 'react'
import Link from 'next/link'
import { useMakers } from '@/lib/makers'
import { useCollection } from '@/lib/collection'
import { EditionArtwork } from './EditionArtwork'
import { EmptyState } from './EmptyState'
import { primaryButton, softButton } from './buttons'

export function CheckoutPanel({
  id,
  simulateFailure = false,
}: {
  id: string
  simulateFailure?: boolean
}) {
  const { findEdition } = useMakers()
  const { add, isOwned } = useCollection()
  const [label, setLabel] = useState('')
  const [phase, setPhase] = useState<'form' | 'done' | 'error'>('form')
  const edition = findEdition(id)

  if (!edition) {
    return (
      <EmptyState
        showShelf
        title="Hmm, that one's not in the shop."
        cta={{ href: '/', label: 'Browse the shop' }}
      />
    )
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (simulateFailure) {
      setPhase('error')
      return
    }
    if (!isOwned(edition!.id)) add(edition!, label)
    setPhase('done')
  }

  if (phase === 'done') {
    const entry = isOwned(edition.id)
    return (
      <div className="py-14 text-center">
        <div className="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-full bg-accent-soft">
          <span className="text-3xl font-black text-accent">&#10003;</span>
        </div>
        <h1 className="mt-6 text-5xl font-black sm:text-6xl">It&apos;s yours.</h1>
        <p className="mt-3.5 text-base font-bold">Added to your Vitrine.</p>
        <p className="mt-2.5 text-[13px] font-semibold text-muted">
          &ldquo;{edition.title}&rdquo; — no. {entry?.number ?? edition.nextNumber} of {edition.editionSize},
          with a little label that says &ldquo;{entry?.label ?? 'Just me'}&rdquo;.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/collection" className={primaryButton + ' no-underline'}>
            See your Vitrine
          </Link>
          <Link href="/" className="text-sm font-extrabold no-underline">
            Keep browsing &rarr;
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <p className="text-[13px] font-extrabold uppercase tracking-wide text-accent">Almost yours</p>
      <h1 className="mt-2 text-4xl font-black leading-tight sm:text-[44px]">One last look.</h1>
      <div className="mt-7 flex items-center gap-5 rounded-card p-5" style={{ background: edition.cardBg }}>
        <div className="w-[92px] shrink-0">
          <EditionArtwork edition={edition} className="rounded-[18px]" />
        </div>
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="text-[19px] font-extrabold leading-tight">{edition.title}</p>
          <p className="text-[12.5px] font-bold text-mid">
            {edition.artist} {'·'} {edition.year}
          </p>
          <p className="mt-0.5 text-[13px] font-extrabold" style={{ color: edition.accentColor }}>
            no. {edition.nextNumber} of {edition.editionSize}
          </p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="mt-8">
        <label htmlFor="collector-name" className="mb-2 block text-[14.5px] font-extrabold">
          Who&apos;s it for?
        </label>
        <input
          id="collector-name"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Just me"
          className="w-full rounded-2xl border-2 border-sand-deep bg-paper px-5 py-3.5 text-[15px] font-bold text-ink focus:border-accent focus:outline-none"
        />
        <p className="mt-2 text-[12.5px] font-semibold text-faint">
          Optional — it&apos;s what the little label in your Vitrine will say.
        </p>
        {phase === 'error' && (
          <div role="alert" className="mt-6 rounded-[18px] bg-[#FCE8D8] px-5 py-4">
            <p className="text-[14.5px] font-extrabold">Oops — the shop hiccupped.</p>
            <p className="mt-1.5 text-[13px] font-semibold leading-relaxed text-mid">
              Nothing was added, and your edition is still waiting. Give it another go in a moment.
            </p>
          </div>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button type="submit" className={primaryButton}>
            Add to collection
          </button>
          <Link href={'/editions/' + edition.id} className={softButton + ' no-underline'}>
            Wait, go back
          </Link>
        </div>
      </form>
    </>
  )
}
