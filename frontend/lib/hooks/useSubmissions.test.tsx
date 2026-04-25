import { useSubmissionsList, useSubmissionDetail, useSubmissionQueryKey } from './useSubmissions';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import React from 'react';

vi.mock('@/lib/api-client', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

const mockSubmissionList = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: 1,
      status: 'new' as const,
      priority: 'high' as const,
      summary: 'Test Submission',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      broker: { id: 1, name: 'Broker A', primaryContactEmail: null },
      company: { id: 1, legalName: 'Company A', industry: 'Tech', headquartersCity: 'NYC' },
      owner: { id: 1, fullName: 'John Doe', email: 'john@example.com' },
      documentCount: 2,
      noteCount: 1,
      latestNote: null,
    },
  ],
};

const mockSubmissionDetail = {
  ...mockSubmissionList.results[0],
  contacts: [],
  documents: [],
  notes: [],
};

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

describe('useSubmissionsList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches submissions list with filters', async () => {
    const { apiClient } = await import('@/lib/api-client');
    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockSubmissionList });

    const { result } = renderHook(() => useSubmissionsList({ status: 'new' }), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.results).toHaveLength(1);
    expect(result.current.data?.results[0].summary).toBe('Test Submission');
  });

  it('returns isLoading while fetching', () => {
    const { result } = renderHook(() => useSubmissionsList({}), { wrapper: createWrapper() });

    expect(result.current.isLoading).toBe(true);
  });

  it('returns error on failure', async () => {
    const { apiClient } = await import('@/lib/api-client');
    vi.mocked(apiClient.get).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useSubmissionsList({}), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe('useSubmissionDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches submission detail by id', async () => {
    const { apiClient } = await import('@/lib/api-client');
    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: mockSubmissionDetail });

    const { result } = renderHook(() => useSubmissionDetail(1), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.id).toBe(1);
    expect(result.current.data?.summary).toBe('Test Submission');
  });

  it('throws error when id is empty', async () => {
    const { result } = renderHook(() => useSubmissionDetail(''), { wrapper: createWrapper() });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});

describe('useSubmissionQueryKey', () => {
  it('returns query key with filters', () => {
    const filters = { status: 'new' as const, brokerId: '1', companySearch: 'test' };
    const { result } = renderHook(() => useSubmissionQueryKey(filters));

    expect(result.current).toEqual(['submissions', filters]);
  });
});
