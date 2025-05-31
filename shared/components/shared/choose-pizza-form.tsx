import { cn } from '@/shared/lib/utils'
import React from 'react'
import { ProductImage } from './product-image'
import { Title } from './title'
import { Button } from '../ui'
import { GroupVariants } from './group-variants'
import { mapPizzaType, PizzaSize, pizzaSizes, PizzaType, pizzaTypes } from '@/shared/constants/pizza'
import { Ingredient, ProductItem } from '@prisma/client'
import { IngredientCard } from './ingredient-card'
import { useSet } from 'react-use'
import { calcTotalPizzaPrice } from '@/shared/lib'

interface Props {
  imageUrl: string
  name: string
  ingredients: Ingredient[]
  items: ProductItem[]
  onClickAddCart?: VoidFunction
  className?: string
  fullWidthIngredients?: boolean
}

export const ChoosePizzaForm: React.FC<Props> = ({
  name, imageUrl, ingredients, items, onClickAddCart, className, fullWidthIngredients
}) => {
  const [size, setSize] = React.useState<PizzaSize>(20)
  const [type, setType] = React.useState<PizzaType>(1)
  const [selectedIngredients, {toggle: addIngredient}] = useSet(new Set<number>([]))

  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`

  const totalPrice = calcTotalPizzaPrice(type, size, items, ingredients, selectedIngredients)

  const handleClickAdd = () => {
    onClickAddCart?.();
    console.log({
      size,
      type,
      ingredients: selectedIngredients
    })
  }


  return (
    <div className={cn('flex flex-col md:flex-row gap-6 md:gap-10', className)}>
      <div className="flex-shrink-0 md:w-[500px] w-full flex justify-center">
        <ProductImage imageUrl={imageUrl} size={size} />
      </div>

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-[#f7f6f5] p-6 rounded-2xl">
        <div className="mb-4">
          <Title text={name} size="md" className="font-extrabold mb-1" />
          <p className="text-gray-400">{textDetails}</p>
        </div>

        <div className="flex flex-col gap-4 mb-4">
          <GroupVariants
            items={pizzaSizes}
            selectedValue={String(size)}
            onClick={v => setSize(Number(v) as PizzaSize)}
          />
          <GroupVariants
            items={pizzaTypes}
            selectedValue={String(type)}
            onClick={v => setType(Number(v) as PizzaType)}
          />
        </div>

        <div className={cn(
            fullWidthIngredients ? 'w-full' : 'w-[400px]',
            'bg-gray-50 p-4 rounded-lg mb-4 overflow-x-auto scrollbar'
          )}
        >
          <div className="grid grid-flow-col auto-cols-[7rem] grid-rows-2 gap-3 w-max min-w-full">
            {ingredients.map(ing => (
              <IngredientCard
                key={ing.id}
                name={ing.name}
                price={ing.price}
                imageUrl={ing.imageUrl}
                active={selectedIngredients.has(ing.id)}
                onClick={() => addIngredient(ing.id)}
              />
            ))}
          </div>
        </div>

        <Button className="h-[55px] text-base rounded-[18px] w-full"
        onClick={handleClickAdd}>
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  )
}
