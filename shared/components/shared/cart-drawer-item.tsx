import { cn } from '@/shared/lib/utils';
import React from 'react';
import { CartItemProps } from './cart-item-details/cart-items-details-types';
import * as CartItem from './cart-item-details';
import { CountButton } from './count-button';
import { Trash2Icon } from 'lucide-react';
import { useCartStore } from '@/shared/store';

interface Props extends CartItemProps {
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  id,
  imageUrl,
  name,
  price,
  quantity,
  details,
  className,
}) => {
  const updateQty = useCartStore((s) => s.updateItemQuantity);
  const removeItem = useCartStore((s) => s.removeCartItem);

  const handleCount = (type: 'plus' | 'minus') => {
    const newQty = type === 'plus' ? quantity + 1 : quantity - 1;
    if (newQty > 0) {
      updateQty(id, newQty);
    } else {
      removeItem(id);
    }
  };

  const handleRemove = () => {
    removeItem(id);
  };

  return (
    <div className={cn('flex bg-white p-5 gap-6', className)}>
      <CartItem.Image src={imageUrl} />
      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton onClick={handleCount} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
              onClick={handleRemove}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
