import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Providers from './providers';
import HomePage from './page';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe('HomePage', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders the title', () => {
    render(
      <BrowserRouter>
        <Providers>
          <HomePage />
        </Providers>
      </BrowserRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'Submission Tracker Challenge' }),
    ).toBeInTheDocument();
  });

  it('renders the button', () => {
    render(
      <BrowserRouter>
        <Providers>
          <HomePage />
        </Providers>
      </BrowserRouter>,
    );

    expect(screen.getAllByRole('button', { name: 'Go to Submissions' })[0]).toBeInTheDocument();
  });

  it('navigates to /submissions when button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <Providers>
          <HomePage />
        </Providers>
      </BrowserRouter>,
    );

    await user.click(screen.getAllByRole('button', { name: 'Go to Submissions' })[0]);

    expect(mockPush).toHaveBeenCalledWith('/submissions');
  });
});
