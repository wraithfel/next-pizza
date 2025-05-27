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
          'w-full sm:w-[90vw] max-w-[1060px]',
          'max-h-[90vh] overflow-y-auto',
          'p-6 sm:p-8 rounded-2xl',
          className,
        )}
      >
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        <ChoosePizzaForm
          imageUrl={product.imageUrl}
          name={product.name}
          ingredients={[]}
        />
      </DialogContent>
    </Dialog>
  )
}