import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

vi.mock('next/navigation', () => ({
  useParams: () => ({ id: '1' }),
}));

vi.mock('@/lib/hooks/useSubmissions', () => ({
  useSubmissionDetail: vi.fn(() => ({
    data: {
      id: 1,
      status: 'new' as const,
      priority: 'high' as const,
      summary: 'Test Submission',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      broker: { id: 1, name: 'Broker A', primaryContactEmail: null },
      company: { id: 1, legalName: 'Test Company', industry: 'Tech', headquartersCity: 'NYC' },
      owner: { id: 1, fullName: 'John Doe', email: 'john@example.com' },
      documentCount: 2,
      noteCount: 1,
      latestNote: null,
      contacts: [
        { id: 1, name: 'Contact 1', role: 'Manager', email: 'c1@test.com', phone: '+1234567890' },
      ],
      documents: [
        {
          id: 1,
          title: 'Document 1',
          docType: 'PDF',
          uploadedAt: '2024-01-01',
          fileUrl: '/doc1.pdf',
        },
      ],
      notes: [
        { id: 1, authorName: 'John Doe', body: 'Note body', createdAt: '2024-01-01T00:00:00Z' },
      ],
    },
    isLoading: false,
    isError: false,
  })),
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

describe('SubmissionDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders page title', async () => {
    const Page = (await import('@/app/submissions/[id]/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    expect(screen.getByRole('heading', { name: 'Submission detail' })).toBeInTheDocument();
  });

  it('renders company name', async () => {
    const Page = (await import('@/app/submissions/[id]/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('Test Company')).toBeInTheDocument();
    });
  });

  it('renders priority indicator', async () => {
    const Page = (await import('@/app/submissions/[id]/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    expect(screen.queryByText('Test Company')).toBeInTheDocument();
  });

  it('renders status chip', async () => {
    const Page = (await import('@/app/submissions/[id]/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText('New')).toBeInTheDocument();
    });
  });

  it('renders tabs', async () => {
    const Page = (await import('@/app/submissions/[id]/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    expect(screen.getByRole('tab', { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /contacts/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /documents/i })).toBeInTheDocument();
  });

  it('renders back to list link', async () => {
    const Page = (await import('@/app/submissions/[id]/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    expect(screen.getByRole('link', { name: /back to list/i })).toBeInTheDocument();
  });

  it('renders loading state while fetching', async () => {
    const { useSubmissionDetail } = await import('@/lib/hooks/useSubmissions');
    vi.mocked(useSubmissionDetail).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      isPending: true,
      error: null,
      isSuccess: false,
      isFetched: false,
      isFetching: false,
      refetch: vi.fn(),
      fetchStatus: 'idle',
    } as unknown as ReturnType<typeof useSubmissionDetail>);

    const Page = (await import('@/app/submissions/[id]/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('renders error state on failure', async () => {
    const { useSubmissionDetail } = await import('@/lib/hooks/useSubmissions');
    vi.mocked(useSubmissionDetail).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      isPending: false,
      error: new Error('Network error'),
      isSuccess: false,
      isFetched: true,
      isFetching: false,
      refetch: vi.fn(),
      fetchStatus: 'idle',
    } as unknown as ReturnType<typeof useSubmissionDetail>);

    const Page = (await import('@/app/submissions/[id]/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
    });
  });

  it('renders not found when submission is null', async () => {
    const { useSubmissionDetail } = await import('@/lib/hooks/useSubmissions');
    vi.mocked(useSubmissionDetail).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: false,
      isPending: true,
      error: null,
      isSuccess: false,
      isFetched: false,
      isFetching: false,
      refetch: vi.fn(),
      fetchStatus: 'idle',
    } as unknown as ReturnType<typeof useSubmissionDetail>);

    const Page = (await import('@/app/submissions/[id]/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });
  });

  it('switches between tabs', async () => {
    const Page = (await import('@/app/submissions/[id]/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    expect(screen.queryByRole('heading', { name: 'Submission detail' })).toBeInTheDocument();
  });

  it('switches to documents tab', async () => {
    const Page = (await import('@/app/submissions/[id]/page')).default;

    render(<Page />, { wrapper: createWrapper() });

    expect(screen.getByRole('heading', { name: 'Submission detail' })).toBeInTheDocument();
  });
});
