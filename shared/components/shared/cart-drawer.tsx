'use client';

import React from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetOverlay,
  SheetClose,
  SheetPortal,
} from '@/shared/components/ui/sheet';
import { Button } from '../ui';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CartDrawerItem } from './cart-drawer-item';
import { getCartItemDetails } from '@/shared/lib';
import { useCartStore } from '@/shared/store';
import { PizzaSize, PizzaType } from '@/shared/constants/pizza';

export const CartDrawer: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const totalAmount = useCartStore(state => state.totalAmount);
  const fetchCartItems = useCartStore(state => state.fetchCartItems);
  const items = useCartStore(state => state.items);

  React.useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetPortal>
        <SheetOverlay />
        <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
          <SheetHeader>
            <SheetTitle>
              В корзине{' '}
              <span className="font-bold">
                {items.length}{' '}
                {(() => {
                  const n = items.length % 100;
                  if (n >= 11 && n <= 14) return 'товаров';
                  const lastDigit = items.length % 10;
                  if (lastDigit === 1) return 'товар';
                  if (lastDigit >= 2 && lastDigit <= 4) return 'товара';
                  return 'товаров';
                })()}
              </span>
            </SheetTitle>
          </SheetHeader>
          <div className="overflow-auto flex-1">
            {items.map(item => (
              <CartDrawerItem
                key={item.id}
                id={item.id}
                imageUrl={item.imageUrl}
                details={
                  item.pizzaSize && item.pizzaType
                    ? getCartItemDetails(
                        item.pizzaSize as PizzaSize,
                        item.pizzaType as PizzaType,
                        item.ingredients
                      )
                    : ''
                }
                name={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
          <SheetFooter className="bg-white p-8">
            <div className="w-full">
              <div className="flex mb-4">
                <span className="flex flex-1 text-lg text-neutral-500">
                  Итого
                  <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                </span>
                <span className="font-bold text-lg">{totalAmount} ₽</span>
              </div>
              <SheetClose asChild>
                <Link href="/cart">
                  <Button className="w-full h-12 text-base flex justify-center items-center">
                    Оформить заказ
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SheetFooter>
        </SheetContent>
      </SheetPortal>
    </Sheet>
  );
};
