'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Product } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { ChoosePizzaForm } from '../choose-pizza-form'
import { cn } from '@/lib/utils'

interface Props {
  product: Product
  className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter()
  if (!product) return null

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          'flex flex-col p-0',
          'w-[90vw] max-w-[1060px]',
          'h-[170vh] max-h-[170vh]',
          className
        )}
      >
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <ChoosePizzaForm
          imageUrl={product.imageUrl}
          name={product.name}
          ingredients={[]}
          className="flex-1"
        />
      </DialogContent>
    </Dialog>
  )
}
