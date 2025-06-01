/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'
import { ChooseProductModal } from '@/shared/components/shared/modals'

export default async function ProductModalPage({
  params,
}: {
  params: any
}) {
  const product = await prisma.product.findFirst({
    where: { id: Number(params?.id) },
    include: {
      items: true,
      ingredients: true,
    },
  })

  if (!product) return notFound()

  return <ChooseProductModal product={product} />
}
