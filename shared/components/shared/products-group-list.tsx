'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { useIntersection } from 'react-use';
import { useSearchParams } from 'next/navigation';
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
    ingredients?: { id: number; name: string }[];
    items: { id: number; price: number; size?: number | null; pizzaType?: number | null }[];
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
  /* ---------- определяем активную категорию при скролле ---------- */
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

  /* --------------------- фильтрация и сортировка ------------------ */
  const sp = useSearchParams();

  const sizesSet  = new Set(sp.get('sizes')?.split(',').filter(Boolean) ?? []);
  const typesSet  = new Set(sp.get('pizzaTypes')?.split(',').filter(Boolean) ?? []);
  const ingSet    = new Set(sp.get('ingredients')?.split(',').filter(Boolean) ?? []);

  const priceFrom = sp.get('priceFrom') ? Number(sp.get('priceFrom')) : 0;
  const priceTo   = sp.get('priceTo')   ? Number(sp.get('priceTo'))   : Number.MAX_SAFE_INTEGER;

  const sort = sp.get('sort') ?? 'popular';

  const products = useMemo(() => {
    /* ---- фильтрация ---- */
    const filtered = items.filter(prod => {
      // диапазон цены (по минимальной вариации)
      const minPrice = Math.min(...prod.items.map(i => i.price));
      if (minPrice < priceFrom || minPrice > priceTo) return false;

      // размеры
      if (sizesSet.size) {
        if (!prod.items.some(i => i.size && sizesSet.has(String(i.size)))) return false;
      }

      // тип теста
      if (typesSet.size) {
        if (!prod.items.some(i => i.pizzaType && typesSet.has(String(i.pizzaType)))) return false;
      }

      // ингредиенты (только для пицц)
      if (ingSet.size) {
        if (!prod.ingredients?.length) return false;
        const prodIngIds = new Set(prod.ingredients.map(g => String(g.id)));
        const allExist = Array.from(ingSet).every(id => prodIngIds.has(id));
        if (!allExist) return false;
      }

      return true;
    });

    /* ---- сортировка ---- */
    const sorted = [...filtered].sort((a, b) => {
      const minA = Math.min(...a.items.map(i => i.price));
      const minB = Math.min(...b.items.map(i => i.price));

      switch (sort) {
        case 'priceAsc':
          return minA - minB;
        case 'priceDesc':
          return minB - minA;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          // popular — оставляем исходный порядок
          return 0;
      }
    });

    return sorted;
  }, [items, sizesSet, typesSet, ingSet, priceFrom, priceTo, sort]);

  /* скрываем раздел, если после фильтрации нет товаров */
  if (!products.length) return null;

  /* --------------------------- рендер ---------------------------- */
  return (
    <div id={title} ref={sectionRef} className={className}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div
        className={cn(
          'grid gap-[50px] items-stretch gap-y-12 sm:gap-x-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3',
          listClassName,
        )}
      >
        {products.map(product => {
          const cheapest = product.items.reduce((m, c) => (c.price < m.price ? c : m), product.items[0]);

          const isPizza = Boolean(cheapest.pizzaType);
          const details = isPizza && product.ingredients
            ? (() => {
                const line = product.ingredients.map(i => i.name).join(', ');
                return line.length > 80 ? line.slice(0, 77) + '…' : line;
              })()
            : product.description ?? '';

          return (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={cheapest.price}
              productItemId={cheapest.id}
              details={details}
            />
          );
        })}
      </div>
    </div>
  );
};
