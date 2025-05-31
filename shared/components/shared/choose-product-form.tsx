'use client';

import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { useCartStore } from '@/shared/store'            
import { toast } from 'react-hot-toast'                  

interface Props {
  imageUrl: string
  name: string
  items: Array<{ id: number; price: number }>
  ingredients: any[]
  className?: string
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  items,
  ingredients,
  className,
}) => {
  const productItem = items[0]
  const productItemId = productItem.id
  const totalPrice = productItem.price

  const addCartItem = useCartStore(state => state.addCartItem)

  const handleClick = async () => {
    try {
      await addCartItem({
        productItemId,
        quantity: 1,
        ingredientIds: [],
      })
      toast.success('Товар добавлен в корзину')      
    } catch (err) {
      console.error(err)
      toast.error('Не удалось добавить в корзину')
    }
  }

  return (
    <div className={cn('flex flex-row gap-6 items-start', className)}>
      <div className="flex-shrink-0 self-center">
        <img
          src={imageUrl}
          alt={name}
          className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'
        />
      </div>

      <div
        className={cn(
          'w-full h-[400px]',
          'bg-[#f7f6f5] p-7 rounded-2xl',
          'flex flex-col justify-between',
        )}
      >
        <div>
          <Title text={name} size="md" className="font-extrabold mb-3" />
        </div>

        <Button
          className="h-[55px] px-10 text-base rounded-[18px] w-full"
          onClick={handleClick}
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
