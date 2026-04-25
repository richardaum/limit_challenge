import { SubmissionStatusChip } from './SubmissionStatusChip';
import { render, screen } from '@testing-library/react';
import type { SubmissionStatus } from '@/lib/types';

describe('SubmissionStatusChip', () => {
  const statuses: SubmissionStatus[] = ['new', 'in_review', 'closed', 'lost'];

  it('renders chip for each status', () => {
    statuses.forEach((status) => {
      const { container } = render(<SubmissionStatusChip status={status} />);

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('converts status to title case in label', () => {
    render(<SubmissionStatusChip status="in_review" />);

    expect(screen.getByText('In Review')).toBeInTheDocument();
  });

  it('renders new status as New', () => {
    render(<SubmissionStatusChip status="new" />);

    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders closed status as Closed', () => {
    render(<SubmissionStatusChip status="closed" />);

    expect(screen.getByText('Closed')).toBeInTheDocument();
  });

  it('renders lost status as Lost', () => {
    render(<SubmissionStatusChip status="lost" />);

    expect(screen.getByText('Lost')).toBeInTheDocument();
  });
});
