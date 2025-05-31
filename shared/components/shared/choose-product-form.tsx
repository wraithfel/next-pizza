'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { useCartStore } from '@/shared/store';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [isProcessing, setIsProcessing] = React.useState(false);

  const productItem = items[0];
  const productItemId = productItem.id;
  const totalPrice = productItem.price;

  const cartItem = useCartStore((s) =>
    s.items.find((it) => it.productItemId === productItemId)
  );
  const quantity = cartItem?.quantity ?? 0;

  const loading = useCartStore((s) => s.loading);
  const addCartItem = useCartStore((s) => s.addCartItem);
  const updateQty = useCartStore((s) => s.updateItemQuantity);
  const removeItem = useCartStore((s) => s.removeCartItem);

  const handleAdd = async () => {
    if (loading || isProcessing) return;
    setIsProcessing(true);
    try {
      await addCartItem({
        productItemId,
        quantity: 1,
        ingredientIds: [],
      });
      toast.success('Товар добавлен в корзину');
      router.back();
    } catch {
      toast.error('Не удалось добавить в корзину');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleIncrease = async () => {
    if (!cartItem || loading || isProcessing) return;
    setIsProcessing(true);
    try {
      await updateQty(cartItem.id, quantity + 1);
    } catch {
      toast.error('Не удалось обновить количество');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecrease = async () => {
    if (!cartItem || loading || isProcessing) return;
    setIsProcessing(true);
    try {
      if (quantity > 1) {
        await updateQty(cartItem.id, quantity - 1);
      } else {
        await removeItem(cartItem.id);
        router.back();
      }
    } catch {
      toast.error('Не удалось обновить корзину');
    } finally {
      setIsProcessing(false);
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
              disabled={loading || isProcessing}
            >
              –
            </Button>
            <span className="text-xl font-bold">{quantity}</span>
            <Button
              className="h-[55px] px-6 text-base rounded-[18px]"
              onClick={handleIncrease}
              disabled={loading || isProcessing}
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
            disabled={loading || isProcessing}
          >
            Добавить в корзину за {totalPrice} ₽
          </Button>
        )}
      </div>
    </div>
  );
};
