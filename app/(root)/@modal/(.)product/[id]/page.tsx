import { ChooseProductModal } from '@/shared/components/shared/modals'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

export default async function ProductModalPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(params.id) },
    include: {
      items: true,
      ingredients: true,
    },
  })

  if (!product) return notFound()

  return <ChooseProductModal product={product} />
}
