'use client'
// Send-back flow — calm, not punitive. Everything is squared away in full.
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useMakers } from '@/lib/makers'
import { useCollection } from '@/lib/collection'
import { primaryButton, softButton } from './buttons'

export function ReturnPanel({ id }: { id: string }) {
  const router = useRouter()
  const { findEdition } = useMakers()
  const { isOwned, remove } = useCollection()
  const [returned, setReturned] = useState(false)
  const edition = findEdition(id)
  const entry = edition ? isOwned(edition.id) : undefined

  if (!edition || (!entry && !returned)) {
    return (
      <>
        <h1 className="text-4xl font-black">That one isn&apos;t in your Vitrine.</h1>
        <div className="mt-8">
          <Link href="/collection" className={primaryButton + ' no-underline'}>
            Back to my Vitrine
          </Link>
        </div>
      </>
    )
  }

  if (returned) {
    return (
      <>
        <h1 className="text-5xl font-black">All squared away.</h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] font-bold leading-relaxed">
          &ldquo;{edition.title}&rdquo; is back in the shop window, and everything&apos;s squared away in full.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className={primaryButton + ' no-underline'}>
            Back to the shop
          </Link>
          <Link href="/collection" className="text-sm font-extrabold no-underline">
            See my Vitrine &rarr;
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <h1 className="text-4xl font-black leading-tight sm:text-[44px]">Send it back?</h1>
      <p className="mx-auto mt-4 max-w-md text-[15px] font-bold leading-relaxed">
        &ldquo;{edition.title}&rdquo; — no. {entry!.number} of {edition.editionSize} — will leave your Vitrine
        and return to the shop.
      </p>
      <p className="mx-auto mt-3 max-w-sm text-[13px] font-semibold leading-relaxed text-muted">
        No hard feelings, ever. Everything gets squared away in full, and you can bring it home again later if
        it&apos;s still around.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button type="button" className={primaryButton} onClick={() => router.push('/collection')}>
          Keep it
        </button>
        <button
          type="button"
          className={softButton}
          onClick={() => {
            remove(edition.id)
            setReturned(true)
          }}
        >
          Send it back
        </button>
      </div>
    </>
  )
}
