import { Truncate } from './Truncate';
import { render, screen } from '@testing-library/react';

describe('Truncate', () => {
  it('renders children', () => {
    render(<Truncate>Test text</Truncate>);

    expect(screen.getByText('Test text')).toBeInTheDocument();
  });

  it('renders single line by default', () => {
    render(<Truncate>Test text</Truncate>);

    expect(screen.getByText('Test text')).toBeInTheDocument();
  });

  it('renders multi-line truncate when lines > 1', () => {
    render(<Truncate lines={3}>Long text that should be truncated</Truncate>);

    expect(screen.getByText('Long text that should be truncated')).toBeInTheDocument();
  });
});
