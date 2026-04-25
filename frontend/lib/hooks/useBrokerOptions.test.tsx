import { useBrokerOptions } from './useBrokerOptions';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import React from 'react';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(() =>
      Promise.resolve({
        data: {
          count: 2,
          next: null,
          previous: null,
          results: [
            { id: 1, name: 'Broker A', primaryContactEmail: 'a@broker.com' },
            { id: 2, name: 'Broker B', primaryContactEmail: 'b@broker.com' },
          ],
        },
      }),
    ),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
};

describe('useBrokerOptions', () => {
  it('fetches brokers successfully', async () => {
    const { result } = renderHook(() => useBrokerOptions(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.results).toHaveLength(2);
    expect(result.current.data?.results[0].name).toBe('Broker A');
  });

  it('returns isLoading while fetching', () => {
    const { result } = renderHook(() => useBrokerOptions(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('returns error on failure', async () => {
    const { apiClient } = await import('@/lib/api-client');
    vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useBrokerOptions(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
