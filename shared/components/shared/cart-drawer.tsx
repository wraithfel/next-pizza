'use client'

import React from 'react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { Ingredient } from '@prisma/client';
import { useCartStore } from '@/shared/store';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';


interface Props {
    className ?: string;
}

const items: Ingredient[] = [
  {
    id: 1,
    name: 'Сырный бортик',
    price: 179,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
    createdAt: new Date('2025-05-30T12:00:00Z'),
    updatedAt: new Date('2025-05-30T12:00:00Z'),
  },
  {
    id: 2,
    name: 'Сливочная моцарелла',
    price: 79,
    imageUrl: 'https://cdn.dodostatic.net/static/Img/Ingredients/cdea869ef287426386ed634e6099a5ba.png',
    createdAt: new Date('2025-05-30T12:05:00Z'),
    updatedAt: new Date('2025-05-30T12:05:00Z'),
  },
];

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
    const [totalAmount, fetchCartItems, items] = useCartStore(state => [state.totalAmount, state.fetchCartItems, state.items]);

    React.useEffect(() => {
        fetchCartItems();
    }, []);

    return (
        <Sheet>
            <SheetTrigger asChild>
                {children}
            </SheetTrigger>
            <SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
                <SheetHeader>
                    <SheetTitle>
                        В корзине <span className='font-bold'>3 товара</span>
                    </SheetTitle>
                </SheetHeader>

            <div className='overflow-auto flex-1'>
                {items.map((item) => (
                    <CartDrawerItem
                    key={item.id}
                    id={item.id}
                    imageUrl={item.imageUrl}
                    details={item.pizzaSize && item.pizzaType ? getCartItemDetails(item.pizzaSize as PizzaSize, item.pizzaType as PizzaType, item.ingredients)
                        : ''
                    }
                    name={item.name}
                    price={item.price}
                    quantity={item.quantity} />
                ))}
            </div>


                <SheetFooter className='bg-white p-8'>
                    <div className='w-full'>
                        <div className='flex mb-4'>
                            <span className='flex flex-1 text-lg text-neutral-500'>
                                Итого
                                <div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
                            </span>
                            <span className='font-bold text-lg'>{totalAmount} ₽</span>
                        </div>

                        <Link href="/cart">
                            <Button
                            type="submit"
                            className='w-full h-12 text-base'>
                                Оформить заказ
                                <ArrowRight className='w-5 ml-2' />
                            </Button>
                        </Link>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}