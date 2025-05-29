'use client'

import { Dialog, DialogContent, DialogTitle } from '@/shared/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { ChooseProductForm } from '../choose-product-form'
import { cn } from '@/shared/lib/utils'
import { ProductWithRelations } from '@/@types/prisma'
import { ChoosePizzaForm } from '../choose-pizza-form'

interface Props {
  product: ProductWithRelations
  className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter()
  const isPizzaForm = Boolean(product.items[0].pizzaType);

  if (!product) return null

  return (
    <Dialog open onOpenChange={() => router.back()}>
        <DialogContent
          className={cn(
            'w-full sm:w-[90vw] max-w-[1060px]',
            'max-h-[90vh] overflow-y-auto',
            'p-6 sm:p-8 rounded-2xl overflow-hidden',
            className,
          )}>
        <DialogTitle className="sr-only">{product.name}</DialogTitle>
        {isPizzaForm ? (
          <ChoosePizzaForm imageUrl={product.imageUrl}
          name={product.name}
          ingredients={product.ingredients} 
          items={product.items}
          />
        ): 
        <ChooseProductForm
          imageUrl={product.imageUrl}
          name={product.name}
          ingredients={[]}
        />
      }
      </DialogContent>
    </Dialog>
  )
}