import { CheckoutPanel } from '@/components/CheckoutPanel'

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ outcome?: string }>
}) {
  const { id } = await params
  const { outcome } = await searchParams
  return (
    <section className="mx-auto max-w-xl px-6 pb-24 pt-14 sm:px-8">
      <CheckoutPanel id={id} simulateFailure={outcome === 'fail'} />
    </section>
  )
}
