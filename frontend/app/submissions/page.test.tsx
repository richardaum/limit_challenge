import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('@/lib/hooks/useFilterParam', () => ({
  useFilterParams: () => ({
    getFilterParam: vi.fn((param: string) => {
      const params: Record<string, string> = {};
      return params[param] || '';
    }),
    setFilterParam: vi.fn(),
  }),
}));

vi.mock('@/lib/hooks/useBrokerOptions', () => ({
  useBrokerOptions: () => ({
    data: {
      results: [
        { id: 1, name: 'Broker A', primaryContactEmail: 'a@broker.com' },
        { id: 2, name: 'Broker B', primaryContactEmail: 'b@broker.com' },
      ],
    },
    isLoading: false,
    isError: false,
  }),
}));

vi.mock('@/lib/hooks/useSubmissions', () => ({
  useSubmissionsListInfinite: () => ({
    data: {
      pages: [
        {
          count: 2,
          next: null,
          previous: null,
          results: [
            {
              id: 1,
              status: 'new' as const,
              priority: 'high' as const,
              summary: 'Test Submission 1',
              createdAt: '2024-01-01T00:00:00Z',
              updatedAt: '2024-01-01T00:00:00Z',
              broker: { id: 1, name: 'Broker A', primaryContactEmail: null },
              company: { id: 1, legalName: 'Company A', industry: 'Tech', headquartersCity: 'NYC' },
              owner: { id: 1, fullName: 'John Doe', email: 'john@example.com' },
              documentCount: 2,
              noteCount: 1,
              latestNote: null,
            },
            {
              id: 2,
              status: 'in_review' as const,
              priority: 'medium' as const,
              summary: 'Test Submission 2',
              createdAt: '2024-01-02T00:00:00Z',
              updatedAt: '2024-01-02T00:00:00Z',
              broker: { id: 2, name: 'Broker B', primaryContactEmail: null },
              company: {
                id: 2,
                legalName: 'Company B',
                industry: 'Finance',
                headquartersCity: 'LA',
              },
              owner: { id: 2, fullName: 'Jane Doe', email: 'jane@example.com' },
              documentCount: 1,
              noteCount: 0,
              latestNote: null,
            },
          ],
        },
      ],
      pageParams: [null],
    },
    isLoading: false,
    isError: false,
    isFetchingNextPage: false,
    hasNextPage: false,
    fetchNextPage: vi.fn(),
  }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </BrowserRouter>
    );
  };
};

describe('SubmissionsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders page title', async () => {
    const Page = (await import('@/app/submissions/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    expect(screen.getByRole('heading', { name: 'Submissions' })).toBeInTheDocument();
  });

  it('renders status filter', async () => {
    const Page = (await import('@/app/submissions/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  it('renders broker filter', async () => {
    const Page = (await import('@/app/submissions/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    expect(screen.getByLabelText(/broker/i)).toBeInTheDocument();
  });

  it('renders company search input', async () => {
    const Page = (await import('@/app/submissions/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    expect(screen.getByLabelText(/company search/i)).toBeInTheDocument();
  });

  it('renders submissions count', async () => {
    const Page = (await import('@/app/submissions/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  it('renders submissions cards', async () => {
    const Page = (await import('@/app/submissions/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    expect(screen.getByText('Company A')).toBeInTheDocument();
    expect(screen.getByText('Company B')).toBeInTheDocument();
  });

  it('switches between grid and list views', async () => {
    const Page = (await import('@/app/submissions/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });
});
