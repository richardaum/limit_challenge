import { LabeledCounter } from './LabeledCounter';
import { render, screen } from '@testing-library/react';

describe('LabeledCounter', () => {
  it('renders label and count', () => {
    render(<LabeledCounter label="Documents" count={5} />);

    expect(screen.getByText('Documents')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('renders with zero count', () => {
    render(<LabeledCounter label="Documents" count={0} />);

    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('renders with large count number', () => {
    render(<LabeledCounter label="Items" count={999} />);

    expect(screen.getByText('999')).toBeInTheDocument();
  });
});
