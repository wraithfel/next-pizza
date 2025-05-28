import { cn } from '@/shared/lib/utils'
import React from 'react'
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

export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  onClickAdd,
  className,
}) => {
  const textDetails = '30 см, традиционное тесто'
  const totalPrice = 350

  return (
    <div className={cn('flex flex-row gap-30 items-start', className)}>
      <div className="flex-shrink-0 self-center">
        <img
        src={imageUrl}
        alt={name}
        className='relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'/>
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
          <p className="text-gray-400 mb-6">{textDetails}</p>
        </div>

        <Button className="h-[55px] px-10 text-base rounded-[18px] w-full">
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}