'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type UseDebouncedStateResult<TValue> = [TValue, TValue, Dispatch<SetStateAction<TValue>>];

export function useDebouncedState<TValue>(
  initialValue: TValue,
  delayMs: number,
): UseDebouncedStateResult<TValue> {
  const [value, setValue] = useState<TValue>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<TValue>(initialValue);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [value, delayMs]);

  return [value, debouncedValue, setValue];
}
