import { useDebouncedState } from './useDebouncedState';
import { act, renderHook } from '@testing-library/react';
import { vi } from 'vitest';

describe('useDebouncedState', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns immediate value and debounced value', () => {
    const { result } = renderHook(() => useDebouncedState('initial', 500));

    expect(result.current[0]).toBe('initial');
    expect(result.current[1]).toBe('initial');
  });

  it('returns setter function', () => {
    const { result } = renderHook(() => useDebouncedState('initial', 500));

    expect(typeof result.current[2]).toBe('function');
  });

  it('updates immediate value immediately', async () => {
    const { result } = renderHook(() => useDebouncedState('initial', 500));

    act(() => {
      result.current[2]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(result.current[1]).toBe('initial');
  });

  it('updates debounced value after delay', async () => {
    const { result } = renderHook(() => useDebouncedState('initial', 500));

    act(() => {
      result.current[2]('updated');
    });

    expect(result.current[1]).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current[1]).toBe('updated');
  });

  it('cancels previous timeout when value changes', async () => {
    const { result } = renderHook(() => useDebouncedState('initial', 500));

    act(() => {
      result.current[2]('first');
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    act(() => {
      result.current[2]('second');
    });

    expect(result.current[1]).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current[1]).toBe('second');
  });

  it('cleans up timeout on unmount', () => {
    const { result, unmount } = renderHook(() => useDebouncedState('initial', 500));

    act(() => {
      result.current[2]('updated');
    });

    expect(() => {
      unmount();
    }).not.toThrow();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current[1]).toBe('initial');
  });
});
