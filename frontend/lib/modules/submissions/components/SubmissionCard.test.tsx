import { SubmissionCard } from './SubmissionCard';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import type { SubmissionListItem } from '@/lib/types';

const mockSubmission: SubmissionListItem = {
  id: 1,
  status: 'new',
  priority: 'high',
  summary: 'Test submission summary',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  broker: { id: 1, name: 'Broker A', primaryContactEmail: null },
  company: { id: 1, legalName: 'Test Company', industry: 'Tech', headquartersCity: 'NYC' },
  owner: { id: 1, fullName: 'John Doe', email: 'john@example.com' },
  documentCount: 2,
  noteCount: 1,
  latestNote: null,
};

describe('SubmissionCard', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders company name', () => {
    renderWithRouter(<SubmissionCard submission={mockSubmission} />);

    expect(screen.getByText('Test Company')).toBeInTheDocument();
  });

  it('renders broker name', () => {
    renderWithRouter(<SubmissionCard submission={mockSubmission} />);

    expect(screen.getByText('Broker: Broker A')).toBeInTheDocument();
  });

  it('renders summary', () => {
    renderWithRouter(<SubmissionCard submission={mockSubmission} />);

    expect(screen.getByText('Test submission summary')).toBeInTheDocument();
  });

  it('renders priority indicator', () => {
    const { container } = renderWithRouter(<SubmissionCard submission={mockSubmission} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders status chip', () => {
    renderWithRouter(<SubmissionCard submission={mockSubmission} />);

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders link to submission detail', () => {
    renderWithRouter(<SubmissionCard submission={mockSubmission} />);

    const link = screen.getByRole('link', { name: /test company/i });
    expect(link).toHaveAttribute('href', '/submissions/1');
  });

  it('renders card variant outlined', () => {
    const { container } = renderWithRouter(<SubmissionCard submission={mockSubmission} />);

    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom submission data', () => {
    const customSubmission: SubmissionListItem = {
      ...mockSubmission,
      id: 42,
      company: { ...mockSubmission.company, legalName: 'Custom Company' },
    };

    renderWithRouter(<SubmissionCard submission={customSubmission} />);

    expect(screen.getByText('Custom Company')).toBeInTheDocument();
  });

  it('renders default summary when empty', () => {
    const submissionNoSummary = {
      ...mockSubmission,
      summary: '',
    };

    renderWithRouter(<SubmissionCard submission={submissionNoSummary} />);

    expect(screen.getByText('No summary available.')).toBeInTheDocument();
  });
});
