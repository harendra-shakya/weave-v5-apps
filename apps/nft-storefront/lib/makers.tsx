'use client'
// "Become a maker": locally opened stalls. Synthetic editions with an uploaded
// image, persisted to localStorage. Releasing editions — never resale, never prices.

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { editions as staticEditions, type Edition } from './editions'

const STORAGE_KEY = 'vitrine-keepsake-makers.v1'

const PALETTES: Array<[string, string]> = [
  ['#EFE6F8', '#8A6FB8'],
  ['#FCE8D8', '#DE8B5A'],
  ['#DEF0E6', '#5FA284'],
  ['#FBF0D2', '#D9A83C'],
  ['#FADDE4', '#D96C8A'],
  ['#DEEAF6', '#6A93C4'],
]

export interface StallInput {
  artist: string
  title: string
  editionSize: number
  /** dataURL produced by the upload resize step. */
  image: string
}

interface MakersContextValue {
  makerEditions: Edition[]
  openStall: (input: StallInput) => Edition
  closeStall: (id: string) => void
  /** Look up any edition — maker stalls first, then the static catalogue. */
  findEdition: (id: string) => Edition | undefined
  allEditions: () => Edition[]
}

const MakersContext = createContext<MakersContextValue | null>(null)

export function MakersProvider({ children }: { children: React.ReactNode }) {
  const [makerEditions, setMakerEditions] = useState<Edition[]>([])

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setMakerEditions(parsed)
      }
    } catch {
      /* keep empty fixture */
    }
  }, [])

  const persist = useCallback((next: Edition[]) => {
    setMakerEditions(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* dataURLs can exceed quota — stall stays in memory for the session */
    }
  }, [])

  const openStall = useCallback(
    (input: StallInput) => {
      const pal = PALETTES[makerEditions.length % PALETTES.length]
      const edition: Edition = {
        id: 'u' + Date.now(),
        title: input.title.trim(),
        artist: input.artist.trim(),
        year: new Date().getFullYear(),
        editionSize: input.editionSize,
        nextNumber: 1,
        medium: 'Your own creation',
        format: 'Uploaded image',
        catalogueNo: 'KS-U-' + String(makerEditions.length + 1).padStart(3, '0'),
        issued: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }),
        cardBg: pal[0],
        accentColor: pal[1],
        image: input.image,
        mine: true,
      }
      persist([edition, ...makerEditions])
      return edition
    },
    [makerEditions, persist]
  )

  const closeStall = useCallback(
    (id: string) => persist(makerEditions.filter((e) => e.id !== id)),
    [makerEditions, persist]
  )

  const findEdition = useCallback(
    (id: string) => makerEditions.find((e) => e.id === id) ?? staticEditions.find((e) => e.id === id),
    [makerEditions]
  )

  const allEditions = useCallback(() => [...makerEditions, ...staticEditions], [makerEditions])

  return (
    <MakersContext.Provider value={{ makerEditions, openStall, closeStall, findEdition, allEditions }}>
      {children}
    </MakersContext.Provider>
  )
}

export function useMakers(): MakersContextValue {
  const ctx = useContext(MakersContext)
  if (!ctx) throw new Error('useMakers must be used inside <MakersProvider>')
  return ctx
}
