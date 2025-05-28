import { useEffect, useState } from 'react';
import { Api } from '@/shared/services/api-client';
import type { Category } from '@prisma/client';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await Api.categories.getAll();
        setCategories(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { categories, loading };
};
