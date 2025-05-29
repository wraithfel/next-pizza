import { cn } from '@/shared/lib/utils';
import React from 'react';
import { CartItemProps } from './cart-item-details/cart-items-details-types';

import * as CartItem from './cart-item-details'


interface Props extends CartItemProps {
    className ?: string;
}

export const CartDrawerItem: React.FC<Props> = ({ id,
    imageUrl,
    name,
    price,
    quantity,
    className }) => {
    return (
        <div className={cn('flex bg-white p-5 gap-6', className)}>
            <CartItem.Image src={imageUrl} />
            <div className='flex-1'>
                { /*<CartItem.Info /> */}
            </div>

        </div>
    )
}