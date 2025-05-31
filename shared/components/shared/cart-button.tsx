'use client';

import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { CartDrawer } from './cart-drawer';
import { useCartStore } from '@/shared/store';

interface Props {
    className ?: string;
}

export const CartButton: React.FC<Props> = ({ className }) => {
    const totalAmount = useCartStore((state) => state.totalAmount);
    const items       = useCartStore((state) => state.items);

    return (
        <CartDrawer>
         <Button size="default" className={cn("group relative overflow-x-hidden", className)}>
              <b>{totalAmount} ₽</b>
              <span className="h-full w-[1px] bg-white/30 mx-3" />
              <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
                <b>{items.length}{' '}
                    {(() => {
                        const n = items.length % 100;
                        if (n >= 11 && n <= 14) return 'товаров';            //
                        const lastDigit = items.length % 10;
                        if (lastDigit === 1) return 'товар';                  
                        if (lastDigit >= 2 && lastDigit <= 4) return 'товара';
                        return 'товаров';                                    
                    })()}</b>
              </div>
              <ArrowRight className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0" />
            </Button>
        </CartDrawer>
    )
}