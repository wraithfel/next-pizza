'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { useCartStore } from '@/shared/store';
import { toast } from 'react-hot-toast';

interface Props {
  imageUrl: string;
  name: string;
  items: Array<{ id: number; price: number }>;
  ingredients: any[];
  className?: string;
}

export const ChooseProductForm: React.FC<Props> = ({
  name,
  imageUrl,
  items,
  ingredients,
  className,
}) => {
  const productItem = items[0];
  const productItemId = productItem.id;
  const totalPrice = productItem.price;

  const cartItem = useCartStore((s) =>
    s.items.find((it) => it.productItemId === productItemId)
  );
  const quantity = cartItem?.quantity ?? 0;

  const addCartItem = useCartStore((s) => s.addCartItem);
  const updateQty = useCartStore((s) => s.updateItemQuantity);
  const removeItem = useCartStore((s) => s.removeCartItem);

  const handleAdd = async () => {
    try {
      await addCartItem({
        productItemId,
        quantity: 1,
        ingredientIds: [],
      });
      toast.success('Товар добавлен в корзину');
    } catch {
      toast.error('Не удалось добавить в корзину');
    }
  };

  const handleIncrease = async () => {
    if (cartItem) {
      try {
        await updateQty(cartItem.id, quantity + 1);
      } catch {
        toast.error('Не удалось обновить количество');
      }
    }
  };

  const handleDecrease = async () => {
    if (cartItem) {
      if (quantity > 1) {
        try {
          await updateQty(cartItem.id, quantity - 1);
        } catch {
          toast.error('Не удалось обновить количество');
        }
      } else {
        try {
          await removeItem(cartItem.id);
        } catch {
          toast.error('Не удалось удалить из корзины');
        }
      }
    }
  };

  return (
    <div className={cn('flex flex-row gap-6 items-start', className)}>
      <div className="flex-shrink-0 self-center">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>
      <div
        className={cn(
          'w-full h-[400px]',
          'bg-[#f7f6f5] p-7 rounded-2xl',
          'flex flex-col justify-between'
        )}
      >
        <div>
          <Title text={name} size="md" className="font-extrabold mb-3" />
        </div>
        {quantity > 0 ? (
          <div className="flex items-center gap-4">
            <Button
              className="h-[55px] px-6 text-base rounded-[18px]"
              onClick={handleDecrease}
            >
              –
            </Button>
            <span className="text-xl font-bold">{quantity}</span>
            <Button
              className="h-[55px] px-6 text-base rounded-[18px]"
              onClick={handleIncrease}
            >
              +
            </Button>
            <span className="ml-auto text-lg font-bold">
              {totalPrice * quantity} ₽
            </span>
          </div>
        ) : (
          <Button
            className="h-[55px] px-10 text-base rounded-[18px] w-full"
            onClick={handleAdd}
          >
            Добавить в корзину за {totalPrice} ₽
          </Button>
        )}
      </div>
    </div>
  );
};
