import type { Metadata } from 'next'
import { CollectionShelf } from '@/components/CollectionShelf'

export const metadata: Metadata = { title: 'Your Vitrine' }

export default function CollectionPage() {
  return (
    <section className="mx-auto max-w-shop px-6 pb-24 pt-12 sm:px-8">
      <h1 className="mb-2.5 text-5xl font-black">Your Vitrine</h1>
      <CollectionShelf />
    </section>
  )
}
