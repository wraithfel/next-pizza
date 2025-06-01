'use client';

import React, { useEffect } from 'react';
import { useCartStore } from '@/shared/store';
import { CartDrawerItem } from './cart-drawer-item';
import Link from 'next/link';

export const CartContent: React.FC = () => {
  const items = useCartStore((s) => s.items);
  const totalAmount = useCartStore((s) => s.totalAmount);
  const fetchCartItems = useCartStore((s) => s.fetchCartItems);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  if (!items.length) {
    return (
      <div className="py-20 text-center text-gray-500">
        Ваша корзина пуста 🙃
      </div>
    );
  }

  return (
    <div className="pb-10">
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <CartDrawerItem
            key={item.id}
            id={item.id}
            imageUrl={item.imageUrl}
            name={item.name}
            details={
              item.pizzaSize && item.pizzaType
                ? `${item.pizzaSize} см, ${
                    item.pizzaType === 1 ? 'традиционное' : 'тонкое'
                  } тесто`
                : ''
            }
            price={item.price}
            quantity={item.quantity}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <span className="text-lg text-neutral-500">Итого</span>
        <span className="text-2xl font-bold">{totalAmount} ₽</span>
      </div>

      <Link href="/checkout">
        <button className="mt-6 mb-10 w-full h-12 rounded-[18px] bg-primary text-white text-base active:translate-y-[1px]">
          Оформить заказ
        </button>
      </Link>
    </div>
  );
};
