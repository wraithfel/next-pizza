import { useEffect, useState } from 'react';
import { Api } from '@/services/api-client';
import type { Ingredient } from '@prisma/client';

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await Api.ingredients.getAll();
        setIngredients(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { ingredients, loading };
};
