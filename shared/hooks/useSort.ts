'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import qs from 'qs';

export const useSort = () => {
  const sp = useSearchParams();
  const router = useRouter();

  const currentSort = sp.get('sort') ?? 'popular';

  const setSort = useCallback(
    (value: string) => {
      const params = qs.parse(sp.toString());
      if (value === 'popular') delete params.sort;
      else params.sort = value;
      const query = qs.stringify(params, { arrayFormat: 'comma', skipNulls: true });
      router.push(`?${query}`, { scroll: false });
    },
    [router, sp],
  );

  return { currentSort, setSort };
};
