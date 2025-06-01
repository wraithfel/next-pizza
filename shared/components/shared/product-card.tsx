'use client';

import Link from 'next/link';
import { Plus } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { useCartStore } from '@/shared/store';
import { Title } from './title';
import { Button } from '../ui';
import { CountButton } from './count-button';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  productItemId: number;
  className?: string;
  details?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  productItemId,
  className,
  details
}) => {
  const cartItem = useCartStore((s) =>
    s.items.find((it) => it.productItemId === productItemId)
  );
  const addItem = useCartStore((s) => s.addCartItem);
  const updateQty = useCartStore((s) => s.updateItemQuantity);
  const removeItem = useCartStore((s) => s.removeCartItem);
  const loading = useCartStore((s) => s.loading);

  const [isProcessing, setIsProcessing] = useState(false);

  const handleAdd = async () => {
    if (cartItem || loading || isProcessing) return;
    setIsProcessing(true);
    try {
      await addItem({ productItemId, quantity: 1, ingredientIds: [] });
      toast.success('Товар добавлен в корзину');
    } catch {
      toast.error('Не удалось добавить в корзину');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCount = async (type: 'plus' | 'minus') => {
    if (!cartItem || loading || isProcessing) return;
    setIsProcessing(true);
    try {
      if (type === 'plus') {
        await updateQty(cartItem.id, cartItem.quantity + 1);
      } else if (cartItem.quantity > 1) {
        await updateQty(cartItem.id, cartItem.quantity - 1);
      } else {
        await removeItem(cartItem.id);
      }
    } catch {
      toast.error('Не удалось обновить количество');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col h-full bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg',
        className
      )}
    >
      <Link
        href={`/product/${id}`}
        className="flex justify-center items-center bg-secondary p-6 h-[260px]"
      >
        {imageUrl && (
          <img
            className="w-[215px] h-[215px] object-cover"
            src={imageUrl}
            alt={name}
          />
        )}
      </Link>

      <div className="p-4 flex flex-col flex-1">
        <Title text={name} size="sm" className="mb-1 font-bold" />
         {details && (
          <p className="text-sm text-gray-400 flex-1">{details}</p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="text-[20px]">
            от <b>{price} ₽</b>
          </span>

          {cartItem ? (
            <CountButton
              value={cartItem.quantity}
              onClick={handleCount}
              className={isProcessing ? 'opacity-50 pointer-events-none' : ''}
            />
          ) : (
            <Button
              variant="secondary"
              onClick={handleAdd}
              disabled={loading || isProcessing}
            >
              <Plus className="w-4 h-4 mr-1" />
              Добавить
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
