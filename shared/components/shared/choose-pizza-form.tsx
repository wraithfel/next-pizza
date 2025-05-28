import { cn } from '@/shared/lib/utils'
import React from 'react'
import { ProductImage } from './product-image'
import { Title } from './title'
import { Button } from '../ui'
import { GroupVariants } from './group-variants'
import { PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants/pizza'
import { Ingredient } from '@prisma/client'

interface Props {
  imageUrl: string
  name: string
  items?: any[]
  ingredients: Ingredient[]
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
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);

  const textDetails = '30 см, традиционное тесто'
  const totalPrice = 350

  return (
    <div className={cn('flex flex-row gap-30', className)}>
      <div className="flex-shrink-0 w-[500px] h-[500px] flex justify-center items-center overflow-visible">
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
          <div className='flex flex-col gap-4 mt-5'>
              <GroupVariants items={pizzaSizes} selectedValue={String(size)} onClick={value => setSize(Number(value) as PizzaSize)} />
              <GroupVariants items={pizzaTypes} selectedValue={String(type)} onClick={value => setType(Number(value) as PizzaType)} />
          </div>

          <div className='grid grid-cols-3 gap-3'>
              
          </div>
        </div>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}