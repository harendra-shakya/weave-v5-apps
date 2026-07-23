import type { Metadata } from 'next'
import Link from 'next/link'
import { primaryButton } from '@/components/buttons'

export const metadata: Metadata = { title: 'Our story' }

function Card({ bg, big, bigColor, title, children }: { bg: string; big: string; bigColor: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[22px] p-6" style={{ background: bg }}>
      <p className="text-2xl font-black" style={{ color: bigColor }}>{big}</p>
      <h2 className="mt-2.5 text-[15px] font-extrabold">{title}</h2>
      <p className="mt-2 text-[13px] font-semibold leading-relaxed text-mid">{children}</p>
    </div>
  )
}

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-28 pt-16 sm:px-8">
      <p className="text-[13px] font-extrabold uppercase tracking-wide text-accent">Our story</p>
      <h1 className="mt-2.5 text-4xl font-black leading-tight sm:text-5xl">Collecting, made honest.</h1>
      <p className="mt-6 text-lg font-bold leading-relaxed text-mid">
        We wanted the simple joy of owning #7 of 50 from an artist we love. Instead we got seed phrases,
        gas fees, and a feed full of people flipping art like stock. So we built the opposite: numbered
        editions, clear provenance, a shelf you&apos;re proud of — and not a single wallet in sight.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <Card bg="#EFE6F8" big="no. 7" bigColor="#8A6FB8" title="Every one is numbered">
          Your edition knows exactly which one it is, and who made it.
        </Card>
        <Card bg="#FCE8D8" big="zero" bigColor="#DE8B5A" title="Wallets required">
          No seed phrases, no gas, no charts. Collecting shouldn&apos;t feel like homework.
        </Card>
        <Card bg="#DEF0E6" big="yours" bigColor="#5FA284" title="A Vitrine to fuss over">
          Arrange it, rearrange it, show it off. The shelf is the whole point.
        </Card>
      </div>
      <Link href="/" className={primaryButton + ' mt-10 no-underline'}>
        Browse the shop
      </Link>
    </section>
  )
}
