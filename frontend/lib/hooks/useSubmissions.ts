'use client';

import { useMemo } from 'react';
import { QueryKey, useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { apiClient } from '@/lib/api-client';
import {
  PaginatedResponse,
  SubmissionDetail,
  SubmissionListFilters,
  SubmissionListItem,
} from '@/lib/types';

const SUBMISSIONS_QUERY_KEY = 'submissions';

async function fetchSubmissions(filters: SubmissionListFilters, pageUrl?: string | null) {
  const response = pageUrl
    ? await apiClient.get<PaginatedResponse<SubmissionListItem>>(pageUrl)
    : await apiClient.get<PaginatedResponse<SubmissionListItem>>('/submissions/', {
        params: {
          status: filters.status,
          brokerId: filters.brokerId,
          companySearch: filters.companySearch,
        },
      });
  return response.data;
}

async function fetchSubmissionDetail(id: string | number) {
  if (!id) {
    throw new Error('Submission id is required');
  }

  const response = await apiClient.get<SubmissionDetail>(`/submissions/${id}/`);
  return response.data;
}

export function useSubmissionsList(filters: SubmissionListFilters) {
  return useQuery({
    queryKey: [SUBMISSIONS_QUERY_KEY, filters] as QueryKey,
    queryFn: () => fetchSubmissions(filters),
    enabled: true,
  });
}

export function useSubmissionsListInfinite(filters: SubmissionListFilters) {
  return useInfiniteQuery({
    queryKey: [SUBMISSIONS_QUERY_KEY, 'infinite', filters] as QueryKey,
    queryFn: ({ pageParam }) => fetchSubmissions(filters, pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.next ?? undefined,
  });
}

export function useSubmissionDetail(id: string | number) {
  return useQuery({
    queryKey: [SUBMISSIONS_QUERY_KEY, id],
    queryFn: () => fetchSubmissionDetail(id),
    enabled: true,
    staleTime: 60_000,
  });
}

export function useSubmissionQueryKey(filters: SubmissionListFilters) {
  return useMemo(() => [SUBMISSIONS_QUERY_KEY, filters] as QueryKey, [filters]);
}
