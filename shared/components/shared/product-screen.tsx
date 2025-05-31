'use client';

import React from 'react';
import { ProductWithRelations } from '@/@types/prisma';
import { Container } from '@/shared/components/shared';
import {
  ChoosePizzaForm,
  ChooseProductForm,
} from '@/shared/components/shared';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/shared/lib/utils';

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export function ProductScreen({ product, className }: Props) {
  const router = useRouter();
  const isPizza = Boolean(product.items[0]?.pizzaType);

  return (
    <Container className={cn('bg-white rounded-2xl p-8 shadow-lg', className)}>
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 text-primary hover:underline"
      >
        <ChevronLeft size={20} />
        Назад
      </button>

      {isPizza ? (
        <ChoosePizzaForm
          name={product.name}
          imageUrl={product.imageUrl}
          ingredients={product.ingredients}
          items={product.items}
          fullWidthIngredients={true}
          onClickAddCart={() => {
            /* можно показать toast 'Добавлено!' */
          }}
        />
      ) : (
        <ChooseProductForm
          name={product.name}
          imageUrl={product.imageUrl}
          ingredients={product.ingredients}
          items={product.items}
          onClickAdd={() => {
            /* … */
          }}
        />
      )}
    </Container>
  );
}
