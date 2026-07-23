'use client'
// "Open your little stall": upload an image, name it, pick an edition size.
// Synthetic demo — no money, no resale. Images are resized client-side to a dataURL.
import { useRef, useState } from 'react'
import Link from 'next/link'
import { useMakers } from '@/lib/makers'
import type { Edition } from '@/lib/editions'
import { primaryButton } from './buttons'

const SIZES = [10, 25, 50]
const PREVIEW_PALETTE: [string, string] = ['#EFE6F8', '#8A6FB8']

function resizeToDataUrl(file: File, maxPx: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('read failed'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('decode failed'))
      img.onload = () => {
        const scale = Math.min(1, maxPx / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

export function MakerForm() {
  const { openStall } = useMakers()
  const fileRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [size, setSize] = useState(25)
  const [image, setImage] = useState('')
  const [opened, setOpened] = useState<Edition | null>(null)

  const canPublish = !!(image && title.trim() && name.trim())
  const need = [
    !name.trim() && 'your name',
    !title.trim() && 'a title',
    !image && 'an artwork',
  ].filter(Boolean) as string[]
  const hint = canPublish
    ? 'Ready when you are — it goes straight into the shop window.'
    : 'Just add ' + (need.length > 1 ? need.slice(0, -1).join(', ') + ' and ' + need[need.length - 1] : need[0]) + ' and you’re set.'

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    try {
      setImage(await resizeToDataUrl(file, 900))
    } catch {
      /* unreadable file — leave the dropzone as-is */
    }
  }

  function onPublish(e: React.FormEvent) {
    e.preventDefault()
    if (!canPublish) return
    const edition = openStall({ artist: name, title, editionSize: size, image })
    setName('')
    setTitle('')
    setSize(25)
    setImage('')
    setOpened(edition)
    window.scrollTo(0, 0)
  }

  if (opened) {
    return (
      <div className="mx-auto max-w-lg py-14 text-center">
        <div className="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-full bg-accent-soft">
          <span className="text-3xl font-black text-accent">&#10003;</span>
        </div>
        <h1 className="mt-6 text-5xl font-black leading-tight">Your stall is open!</h1>
        <p className="mx-auto mt-3.5 max-w-md text-[15px] font-bold leading-relaxed">
          &ldquo;{opened.title}&rdquo; is in the shop window — just {opened.editionSize} will ever exist, made
          by {opened.artist}.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link href={'/editions/' + opened.id} className={primaryButton + ' no-underline'}>
            See it in the shop
          </Link>
          <Link href="/" className="text-sm font-extrabold no-underline">
            Back to the shop &rarr;
          </Link>
        </div>
      </div>
    )
  }

  const chip = (active: boolean) =>
    'cursor-pointer rounded-full border-0 px-5 py-2.5 text-sm font-extrabold transition-all ' +
    (active ? 'bg-accent text-paper' : 'bg-sand text-mid hover:bg-sand-deep')

  return (
    <div className="mt-10 flex flex-wrap items-start gap-10">
      <form onSubmit={onPublish} className="flex min-w-0 flex-[1_1_400px] flex-col gap-5 rounded-card bg-paper p-8">
        <div>
          <label htmlFor="maker-name" className="mb-2 block text-[14.5px] font-extrabold">
            Your maker name
          </label>
          <input
            id="maker-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sam who paints"
            className="w-full rounded-2xl border-2 border-sand-deep bg-cream px-5 py-3 text-[15px] font-bold text-ink focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="work-title" className="mb-2 block text-[14.5px] font-extrabold">
            What&apos;s it called?
          </label>
          <input
            id="work-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Tuesday Cloud"
            className="w-full rounded-2xl border-2 border-sand-deep bg-cream px-5 py-3 text-[15px] font-bold text-ink focus:border-accent focus:outline-none"
          />
        </div>
        <fieldset className="border-0 p-0">
          <legend className="mb-2 block text-[14.5px] font-extrabold">How many should exist?</legend>
          <div className="flex flex-wrap gap-2.5">
            {SIZES.map((s) => (
              <button key={s} type="button" onClick={() => setSize(s)} aria-pressed={size === s} className={chip(size === s)}>
                {s === 10 ? 'just 10' : s}
              </button>
            ))}
          </div>
        </fieldset>
        <div>
          <span className="mb-2 block text-[14.5px] font-extrabold">Your artwork</span>
          <input ref={fileRef} id="art-upload" type="file" accept="image/*" onChange={onFile} className="sr-only" />
          <label
            htmlFor="art-upload"
            role="button"
            tabIndex={0}
            aria-label="Add your artwork image"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                fileRef.current?.click()
              }
            }}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-[20px] border-[3px] border-dashed border-sand-deep p-6 text-center transition-colors hover:border-accent hover:bg-cream"
          >
            {image ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="Your uploaded artwork" className="h-[120px] w-[120px] rounded-[14px] object-cover" />
                <span className="text-[13px] font-extrabold text-accent">Looks lovely — tap to swap it</span>
              </>
            ) : (
              <>
                <span className="text-[15px] font-extrabold text-mid">&#65291; Tap to add your artwork</span>
                <span className="text-xs font-semibold text-faint">Any image works — it gets a cozy square crop</span>
              </>
            )}
          </label>
        </div>
        <div>
          <button type="submit" disabled={!canPublish} className={primaryButton + ' disabled:cursor-default disabled:opacity-40 disabled:hover:scale-100 disabled:hover:bg-accent'}>
            Open my stall
          </button>
          <p className="mt-2.5 text-[12.5px] font-semibold text-faint">{hint}</p>
        </div>
      </form>
      <div className="w-full max-w-[340px] flex-[1_1_280px]">
        <p className="mb-3 text-[13px] font-extrabold uppercase tracking-wide text-faint">How it&apos;ll look in the shop</p>
        <div className="rounded-card p-5 pb-6 text-center" style={{ background: PREVIEW_PALETTE[0] }}>
          <div className="relative aspect-square w-full overflow-hidden rounded-tile bg-paper">
            {image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="Preview of your edition" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-[18%] flex items-center justify-center rounded-[18px] border-[3px] border-dashed border-sand-deep">
                <span className="text-xs font-extrabold text-faint">your art here</span>
              </div>
            )}
          </div>
          <p className="mt-4 text-[19px] font-extrabold leading-tight">{title.trim() || 'Your edition'}</p>
          <p className="mt-1 text-[12.5px] font-bold text-muted">{(name.trim() || 'You') + ' · 2026'}</p>
          <p className="mt-2 text-xs font-extrabold" style={{ color: PREVIEW_PALETTE[1] }}>
            just {size} made {'·'} no. 1 is next
          </p>
          <p className="mt-2.5">
            <span className="rounded-full bg-paper px-3.5 py-1 text-[11px] font-extrabold text-mid">your stall</span>
          </p>
        </div>
      </div>
    </div>
  )
}
