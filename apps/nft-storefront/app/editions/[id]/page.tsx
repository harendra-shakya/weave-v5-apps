import { EditionDetail } from '@/components/EditionDetail'

export default async function EditionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <section className="mx-auto max-w-shop px-6 pb-24 pt-8 sm:px-8">
      <EditionDetail id={id} />
    </section>
  )
}
