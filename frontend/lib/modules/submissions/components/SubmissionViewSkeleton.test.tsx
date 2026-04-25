import { render } from '@testing-library/react';
import { SubmissionViewSkeleton } from './SubmissionViewSkeleton';

describe('SubmissionViewSkeleton', () => {
  it('renders default count of skeletons', () => {
    render(<SubmissionViewSkeleton />);

    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('renders custom count of skeletons', () => {
    render(<SubmissionViewSkeleton count={3} />);

    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(10);
  });

  it('renders list view skeletons', () => {
    render(<SubmissionViewSkeleton view="list" count={2} />);

    const skeletons = document.querySelectorAll('.MuiSkeleton-root');
    expect(skeletons.length).toBeGreaterThan(0);
  });
});
