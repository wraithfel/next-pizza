'use client';

import React, { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { cn } from '@/shared/lib/utils';
import { Title } from './title';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/shared/store/category';

interface Props {
  categoryId: number;
  title: string;
  items: Array<{
    id: number;
    name: string;
    description: string | null;
    imageUrl: string;
    ingredients?: { name: string }[];
    items: { id: number; price: number; pizzaType?: number | null }[];
  }>
  className?: string;
  listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
  categoryId,
  title,
  items,
  className,
  listClassName,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const setActiveCategory = useCategoryStore(s => s.setActiveId);

  const entry = useIntersection(sectionRef as React.RefObject<HTMLElement>, {
    threshold: 0.5,
  });

  useEffect(() => {
    if (!entry?.isIntersecting) return;
    setActiveCategory(categoryId);

    const qs = window.location.search;
    const hash = `#${encodeURIComponent(title)}`;
    if (window.location.hash === hash) return;
    history.replaceState(null, '', `${qs}${hash}`);
  }, [entry?.isIntersecting, categoryId, title, setActiveCategory]);

  return (
    <div id={title} ref={sectionRef} className={className}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div
        className={cn(
          'grid gap-[50px] items-stretch gap-y-12 sm:gap-x-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
          listClassName,
        )}
      >
        {items.map(product => {
          const firstVariant = product.items[0];
          const isPizza = Boolean(firstVariant.pizzaType);
          let details = '';

          if (isPizza && product.ingredients) {
            const line = product.ingredients.map((i) => i.name).join(', ');
            details = line.length > 80 ? line.slice(0, 77) + '…' : line;
          } else {
            details = product.description ?? '';
          }

          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={firstVariant.price}
              productItemId={firstVariant.id}
              details={details}
            />
          );
        })}
      </div>
    </div>
  );
};

