import type { Metadata } from 'next'
import { MakerForm } from '@/components/MakerForm'

export const metadata: Metadata = { title: 'Open a stall' }

export default function MakerPage() {
  return (
    <section className="mx-auto max-w-shop px-6 pb-24 pt-12 sm:px-8">
      <div className="max-w-2xl">
        <p className="text-[13px] font-extrabold uppercase tracking-wide text-accent">Become a maker</p>
        <h1 className="mt-2.5 text-4xl font-black leading-tight sm:text-5xl">Open your little stall.</h1>
        <p className="mt-4 text-[15px] font-semibold leading-relaxed text-muted">
          Upload something you made, give it a name, and it joins the shop as a numbered edition anyone can
          add to their Vitrine. It&apos;s all part of the demo — synthetic editions, no money changes hands,
          ever.
        </p>
      </div>
      <MakerForm />
    </section>
  )
}
