'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export function useFilterParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return {
    getFilterParam: useCallback(
      <TValue extends string>(param: string) => {
        return searchParams.get(param) as TValue | '';
      },
      [searchParams],
    ),

    setFilterParam: useCallback(
      <TValue extends string>(param: string, value: TValue) => {
        const params = new URLSearchParams(searchParams);

        if (value === '') {
          params.delete(param);
        } else {
          params.set(param, value);
        }

        router.push(`${window.location.pathname}?${params.toString()}`);
      },
      [searchParams, router],
    ),
  };
}
