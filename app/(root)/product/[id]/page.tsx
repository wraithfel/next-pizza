import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'
import { ProductScreen } from '@/shared/components/shared'

export default async function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(params.id) },
    include: {
      items: true,
      ingredients: true,
      category: true,
    },
  })

  if (!product) return notFound()

  return (
    <div className="min-h-screen bg-[#F7F6F5] py-10">
      <ProductScreen product={product} />
    </div>
  )
}
