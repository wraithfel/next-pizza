'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/shared/components/shared';
import { CartContent } from '@/shared/components/shared/cart-content';
import { useCartStore } from '@/shared/store';
import { ChevronLeft } from 'lucide-react';

export default function CartPage() {
  const router = useRouter();
  const fetchCartItems = useCartStore((s) => s.fetchCartItems);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <Container className="mt-10 pb-10">
      <button
        onClick={() => router.push('/')}
        className="mb-6 inline-flex items-center gap-2 text-primary hover:underline"
      >
        <ChevronLeft size={20} />
        Назад
      </button>

      <h1 className="text-2xl font-bold mb-6">Корзина</h1>
      <CartContent />
    </Container>
  );
}
