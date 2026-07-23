import { ShopGrid } from '@/components/ShopGrid'

export default function ShopPage() {
  return (
    <>
      <section className="mx-auto max-w-2xl px-6 pb-14 pt-16 text-center sm:px-8">
        <p className="text-[13px] font-extrabold uppercase tracking-wide text-accent">Numbered editions</p>
        <h1 className="mt-3.5 text-5xl font-black leading-[1.04] sm:text-6xl">
          Own the edition.
          <br />
          Skip the wallet.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base font-semibold leading-relaxed text-muted">
          Numbered digital editions with clear provenance and a shelf you&apos;re proud of — no wallet, no
          gas, no speculation.
        </p>
      </section>
      <section className="mx-auto max-w-shop px-6 pb-24 sm:px-8">
        <ShopGrid />
      </section>
    </>
  )
}
