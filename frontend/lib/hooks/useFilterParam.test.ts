import { useFilterParams } from './useFilterParam';
import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import { useSearchParams, useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(() => ({
    get: vi.fn((param: string) => {
      const mockParams: Record<string, string> = {
        status: 'new',
        brokerId: '1',
        companySearch: 'test',
      };
      return mockParams[param] || null;
    }),
  })),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
  })),
}));

describe('useFilterParams', () => {
  it('returns getFilterParam function', () => {
    const { result } = renderHook(() => useFilterParams());

    expect(typeof result.current.getFilterParam).toBe('function');
  });

  it('returns setFilterParam function', () => {
    const { result } = renderHook(() => useFilterParams());

    expect(typeof result.current.setFilterParam).toBe('function');
  });

  it('gets filter param from searchParams', () => {
    const { result } = renderHook(() => useFilterParams());

    const status = result.current.getFilterParam<string>('status');
    expect(status).toBe('new');
  });

  it('returns empty string for missing param', () => {
    const { result } = renderHook(() => useFilterParams());

    const missing = result.current.getFilterParam<string>('missing');
    expect(missing).toBeFalsy();
  });

  it('deletes param when value is empty string', async () => {
    const mockPush = vi.fn();
    const mockGet = vi.fn((param: string) => {
      const mockParams: Record<string, string> = {
        status: 'new',
      };
      return mockParams[param] || null;
    });

    vi.mocked(useSearchParams).mockReturnValue({
      get: mockGet,
      toString: () => 'status=new',
    } as never);
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as never);

    const { result } = renderHook(() => useFilterParams());
    result.current.setFilterParam('status', '');

    expect(mockPush).toHaveBeenCalled();
  });

  it('sets param when value is not empty', async () => {
    const mockPush = vi.fn();
    const mockGet = vi.fn((param: string) => {
      const mockParams: Record<string, string> = {
        status: 'new',
      };
      return mockParams[param] || null;
    });

    vi.mocked(useSearchParams).mockReturnValue({
      get: mockGet,
      toString: () => 'status=new',
    } as never);
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
    } as never);

    const { result } = renderHook(() => useFilterParams());
    result.current.setFilterParam('status', 'approved');

    expect(mockPush).toHaveBeenCalled();
  });
});
