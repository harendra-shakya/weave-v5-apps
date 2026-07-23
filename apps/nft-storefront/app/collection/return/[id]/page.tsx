import { ReturnPanel } from '@/components/ReturnPanel'

export default async function ReturnPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <section className="mx-auto max-w-xl px-6 pb-28 pt-20 text-center sm:px-8">
      <ReturnPanel id={id} />
    </section>
  )
}
