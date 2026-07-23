'use client'
// One-time synthetic nonclaim before the first "Add to collection". Placement is locked.
import { useEffect, useRef } from 'react'
import { primaryButton } from './buttons'

export function FirstPurchaseNotice({
  open,
  onContinue,
  onDismiss,
}: {
  open: boolean
  onContinue: () => void
  onDismiss: () => void
}) {
  const continueRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    continueRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onDismiss])

  if (!open) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="A quick note before your first edition"
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6"
      onClick={onDismiss}
    >
      <div
        className="max-w-md rounded-card bg-paper p-8 pb-7 shadow-[0_24px_48px_-20px_rgba(74,63,58,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[13px] font-extrabold uppercase tracking-wide text-accent">Before your first edition</p>
        <p className="mt-3.5 text-[15px] font-bold leading-relaxed">
          A quick note: this is a synthetic collectible. You&apos;re collecting the experience — there&apos;s no
          real ownership, resale, or value.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button ref={continueRef} type="button" onClick={onContinue} className={primaryButton + ' px-7 py-3.5 text-sm'}>
            Got it, continue
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="cursor-pointer border-0 bg-transparent p-0 text-[13.5px] font-extrabold text-muted hover:text-ink"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  )
}
