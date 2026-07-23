'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Edition } from '@/lib/editions'
import { useCollection } from '@/lib/collection'
import { FirstPurchaseNotice } from './FirstPurchaseNotice'
import { primaryButton } from './buttons'

export function AddToCollectionButton({ edition }: { edition: Edition }) {
  const router = useRouter()
  const { isOwned, noticeSeen, markNoticeSeen } = useCollection()
  const [noticeOpen, setNoticeOpen] = useState(false)

  const owned = isOwned(edition.id)
  if (owned) {
    return (
      <p className="text-[15px] font-extrabold text-accent">
        In your Vitrine &mdash; no. {owned.number} of {edition.editionSize}
      </p>
    )
  }

  function handleClick() {
    if (!noticeSeen) {
      setNoticeOpen(true)
    } else {
      router.push('/checkout/' + edition.id)
    }
  }

  function handleContinue() {
    markNoticeSeen()
    setNoticeOpen(false)
    router.push('/checkout/' + edition.id)
  }

  return (
    <>
      <FirstPurchaseNotice
        open={noticeOpen}
        onContinue={handleContinue}
        onDismiss={() => setNoticeOpen(false)}
      />
      <button type="button" onClick={handleClick} className={primaryButton}>
        Add to collection
      </button>
    </>
  )
}
