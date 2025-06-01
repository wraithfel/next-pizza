'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import { useEffect, useState } from 'react';
import qs from 'qs';
import { useIngredients } from './useIngredients';

type Price = { priceFrom?: number; priceTo?: number };

export const useFilters = () => {
  const router = useRouter();
  const sp = useSearchParams();

  const initSizes       = sp.get('sizes')?.split(',')       ?? [];
  const initTypes       = sp.get('pizzaTypes')?.split(',')  ?? [];
  const initIngredients = sp.get('ingredients')?.split(',') ?? [];

  const initPrice: Price = {
    priceFrom: sp.get('priceFrom') ? Number(sp.get('priceFrom')) : undefined,
    priceTo:   sp.get('priceTo')   ? Number(sp.get('priceTo'))   : undefined,
  };

  const [sizes,       { toggle: toggleSize, reset: resetSizes }] = useSet<string>(new Set(initSizes));
  const [types,       { toggle: toggleType, reset: resetTypes }] = useSet<string>(new Set(initTypes));
  const [selectedIng, { toggle: toggleIng,  reset: resetIng  }] = useSet<string>(new Set(initIngredients));
  const [price, setPrice] = useState<Price>(initPrice);

  const { ingredients, loading } = useIngredients();

  useEffect(() => {
    const queryObj: Record<string, unknown> = {
      ...price,
      sizes:       Array.from(sizes),
      pizzaTypes:  Array.from(types),
      ingredients: Array.from(selectedIng),
    };

    const currentSort = sp.get('sort');
    if (currentSort) queryObj.sort = currentSort;

    const query = qs.stringify(queryObj, { arrayFormat: 'comma', skipNulls: true });
    router.push(`?${query}`, { scroll: false });
  }, [sizes, types, selectedIng, price, router, sp]);

  return {
    ingredients,
    loading,
    sizes,
    types,
    selectedIng,
    price,
    toggleSize,
    toggleType,
    toggleIng,
    setPrice,
    resetAll() {
      resetSizes();
      resetTypes();
      resetIng();
      setPrice({});
    },
  };
};
