import { PriorityIndicator } from './PriorityIndicator';
import { render } from '@testing-library/react';
import type { SubmissionPriority } from '@/lib/types';

describe('PriorityIndicator', () => {
  const priorities: SubmissionPriority[] = ['high', 'medium', 'low'];

  it('renders icon for each priority level', () => {
    priorities.forEach((priority) => {
      const { container } = render(<PriorityIndicator priority={priority} />);

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('renders icon element for high priority', () => {
    const { container } = render(<PriorityIndicator priority="high" />);

    expect(container.firstChild).toBeInTheDocument();
  });
});
