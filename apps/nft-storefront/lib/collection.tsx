'use client'
// Local ownership fixture: "Your Vitrine" is client-local state persisted to
// localStorage — a synthetic collection, never a wallet, chain, or account.

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { Edition } from './editions'

export interface CollectionEntry {
  editionId: string
  /** The number issued to this collector, e.g. 7 for "no. 7 of 50". */
  number: number
  /** The little label on the shelf ("Just me" by default). */
  label: string
  acquiredAt: string
}

interface CollectionState {
  entries: CollectionEntry[]
  noticeSeen: boolean
}

interface CollectionContextValue extends CollectionState {
  isOwned: (editionId: string) => CollectionEntry | undefined
  add: (edition: Edition, label: string) => CollectionEntry
  remove: (editionId: string) => void
  move: (index: number, direction: -1 | 1) => void
  markNoticeSeen: () => void
}

const STORAGE_KEY = 'vitrine-keepsake-collection.v1'
const CollectionContext = createContext<CollectionContextValue | null>(null)

function load(): CollectionState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CollectionState>
      return { entries: Array.isArray(parsed.entries) ? parsed.entries : [], noticeSeen: !!parsed.noticeSeen }
    }
  } catch {
    /* fall through to empty fixture */
  }
  return { entries: [], noticeSeen: false }
}

export function CollectionProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CollectionState>({ entries: [], noticeSeen: false })

  useEffect(() => {
    setState(load())
  }, [])

  const update = useCallback((next: CollectionState) => {
    setState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {
      /* storage unavailable — keep in-memory fixture */
    }
  }, [])

  const isOwned = useCallback(
    (editionId: string) => state.entries.find((e) => e.editionId === editionId),
    [state.entries]
  )

  const add = useCallback(
    (edition: Edition, label: string) => {
      const entry: CollectionEntry = {
        editionId: edition.id,
        number: edition.nextNumber,
        label: label.trim() || 'Just me',
        acquiredAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      }
      update({ ...state, entries: [...state.entries, entry] })
      return entry
    },
    [state, update]
  )

  const remove = useCallback(
    (editionId: string) => {
      const entries = state.entries.filter((e) => e.editionId !== editionId)
      update({ entries, noticeSeen: entries.length === 0 ? false : state.noticeSeen })
    },
    [state, update]
  )

  const move = useCallback(
    (index: number, direction: -1 | 1) => {
      const target = index + direction
      if (target < 0 || target >= state.entries.length) return
      const entries = [...state.entries]
      ;[entries[index], entries[target]] = [entries[target], entries[index]]
      update({ ...state, entries })
    },
    [state, update]
  )

  const markNoticeSeen = useCallback(() => update({ ...state, noticeSeen: true }), [state, update])

  return (
    <CollectionContext.Provider value={{ ...state, isOwned, add, remove, move, markNoticeSeen }}>
      {children}
    </CollectionContext.Provider>
  )
}

export function useCollection(): CollectionContextValue {
  const ctx = useContext(CollectionContext)
  if (!ctx) throw new Error('useCollection must be used inside <CollectionProvider>')
  return ctx
}
