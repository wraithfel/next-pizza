'use client';

import React, { useEffect, useRef } from 'react';
import { useIntersection } from 'react-use';
import { cn } from '@/lib/utils';
import { Title } from './title';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/store/category';

interface Props {
  categoryId: number;
  title: string;
  items: Array<{
    id: number;
    name: string;
    imageUrl: string;
    items: { price: number }[];
  }>;
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
  const sectionRef         = useRef<HTMLDivElement | null>(null);
  const setActiveCategory  = useCategoryStore(s => s.setActiveId);


  const entry = useIntersection(sectionRef as React.RefObject<HTMLElement>, { threshold: 0.2 });

  useEffect(() => {
    if (!entry?.isIntersecting) return;

    setActiveCategory(categoryId);

    const qs   = window.location.search;       
    const hash = `#${encodeURIComponent(title)}`;

    if (window.location.hash === hash) return;

    history.replaceState(null, '', `${qs}${hash}`); 
  }, [entry?.isIntersecting, categoryId, title, setActiveCategory]);

  return (
    <div id={title} ref={sectionRef} className={className}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div
        className={cn(
          'grid gap-[50px] gap-y-12 sm:gap-x-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
          listClassName,
        )}
      >
        {items.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.items[0].price}
          />
        ))}
      </div>
    </div>
  );
};
