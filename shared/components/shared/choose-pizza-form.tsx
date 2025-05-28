import { cn } from '@/shared/lib/utils'
import React from 'react'
import { ProductImage } from './product-image'
import { Title } from './title'
import { Button } from '../ui'

interface Props {
  imageUrl: string
  name: string
  items?: any[]
  ingredients: any[]
  onClickAdd?: VoidFunction
  className?: string
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name,
  items,
  imageUrl,
  ingredients,
  onClickAdd,
  className,
}) => {
  const textDetails = '30 см, традиционное тесто'
  const totalPrice = 350
  const size = 30

  return (
    <div className={cn('flex flex-row gap-30 items-center', className)}>
      <div className="flex-shrink-0">
        <ProductImage imageUrl={imageUrl} size={size}/>
      </div>

      <div
        className={cn(
          'w-full h-[500px]',
          'bg-[#f7f6f5] p-7 rounded-2xl',
          'flex flex-col justify-between',
        )}
      >
        <div>
          <Title text={name} size="md" className="font-extrabold mb-3" />
          <p className="text-gray-400 mb-6">{textDetails}</p>
          {/* TODO: здесь появятся варианты размера/теста */}
        </div>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}