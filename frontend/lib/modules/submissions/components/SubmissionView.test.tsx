import { SubmissionView } from './SubmissionView';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import type { SubmissionListItem } from '@/lib/types';

const mockSubmissions: SubmissionListItem[] = [
  {
    id: 1,
    status: 'new',
    priority: 'high',
    summary: 'Submission 1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    broker: { id: 1, name: 'Broker A', primaryContactEmail: null },
    company: { id: 1, legalName: 'Company 1', industry: 'Tech', headquartersCity: 'NYC' },
    owner: { id: 1, fullName: 'John Doe', email: 'john@example.com' },
    documentCount: 2,
    noteCount: 1,
    latestNote: null,
  },
  {
    id: 2,
    status: 'in_review',
    priority: 'medium',
    summary: 'Submission 2',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
    broker: { id: 2, name: 'Broker B', primaryContactEmail: null },
    company: { id: 2, legalName: 'Company 2', industry: 'Finance', headquartersCity: 'LA' },
    owner: { id: 2, fullName: 'Jane Doe', email: 'jane@example.com' },
    documentCount: 1,
    noteCount: 0,
    latestNote: null,
  },
];

describe('SubmissionView', () => {
  const renderWithRouter = (component: React.ReactElement) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
  };

  it('renders submissions in grid view by default', () => {
    renderWithRouter(<SubmissionView submissions={mockSubmissions} />);

    expect(screen.getByText('Company 1')).toBeInTheDocument();
    expect(screen.getByText('Company 2')).toBeInTheDocument();
  });

  it('renders submissions in list view', () => {
    renderWithRouter(<SubmissionView submissions={mockSubmissions} view="list" />);

    expect(screen.getByText('Company 1')).toBeInTheDocument();
  });

  it('renders empty array without error', () => {
    renderWithRouter(<SubmissionView submissions={[]} />);

    expect(screen.queryByText('Company 1')).not.toBeInTheDocument();
  });

  it('renders single submission', () => {
    renderWithRouter(<SubmissionView submissions={[mockSubmissions[0]]} />);

    expect(screen.getByText('Company 1')).toBeInTheDocument();
  });
});
