'use client';

import {
  Box,
  Card,
  CardContent,
  Container,
  Divider,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';

import { useBrokerOptions } from '@/lib/hooks/useBrokerOptions';
import { useDebouncedState } from '@/lib/hooks/useDebouncedState';
import { useFilterParams } from '@/lib/hooks/useFilterParam';
import {
  SubmissionLayout,
  SubmissionLayoutSwitcher,
} from '@/lib/modules/submissions/components/SubmissionLayoutSwitcher';
import { SubmissionViewSkeleton } from '@/lib/modules/submissions/components/SubmissionViewSkeleton';
import { useSubmissionsList } from '@/lib/hooks/useSubmissions';
import { SubmissionView } from '@/lib/modules/submissions/components/SubmissionView';
import { SubmissionStatus } from '@/lib/types';
import { SubmissionStatusChip } from '@/lib/modules/submissions/components/SubmissionStatusChip';

const STATUS_OPTIONS: { label: string; value: SubmissionStatus | '' }[] = [
  { label: 'All statuses', value: '' },
  { label: 'New', value: 'new' },
  { label: 'In Review', value: 'in_review' },
  { label: 'Closed', value: 'closed' },
  { label: 'Lost', value: 'lost' },
];

export default function SubmissionsPage() {
  const { getFilterParam, setFilterParam } = useFilterParams();

  const status = getFilterParam<SubmissionStatus>('status') ?? '';
  const brokerId = getFilterParam<string>('brokerId') ?? '';
  const companySearch = getFilterParam<string>('companySearch') ?? '';

  const [view, setView] = useState<SubmissionLayout>('grid');
  const [companySearchInput, debouncedCompanySearch, setCompanySearchInput] = useDebouncedState(
    companySearch,
    300,
  );

  const filters = useMemo(
    () => ({
      status: status || undefined,
      brokerId: brokerId || undefined,
      companySearch: debouncedCompanySearch || undefined,
    }),
    [status, brokerId, debouncedCompanySearch],
  );

  const submissionsQuery = useSubmissionsList(filters);
  const brokerQuery = useBrokerOptions();

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Stack spacing={4}>
        <Box>
          <Typography variant="h4" component="h1">
            Submissions
          </Typography>
          <Typography color="text.secondary">
            Filters update the query parameters and drive backend filtering. Hook these inputs to
            your API calls when you implement the actual data fetching.
          </Typography>
        </Box>

        <Card variant="outlined">
          <CardContent>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                select
                label="Status"
                value={status}
                onChange={(event) => setFilterParam('status', event.target.value)}
                fullWidth
              >
                {STATUS_OPTIONS.map((option) => (
                  <MenuItem key={option.value || 'all'} value={option.value}>
                    {option.value ? <SubmissionStatusChip status={option.value} /> : option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                label={
                  brokerQuery.isLoading
                    ? 'Loading brokers...'
                    : brokerQuery.isError
                      ? 'Failed to load brokers'
                      : 'Broker'
                }
                value={brokerId}
                onChange={(event) => setFilterParam('brokerId', event.target.value)}
                disabled={brokerQuery.isLoading || brokerQuery.isError}
                fullWidth
              >
                <MenuItem value="">All brokers</MenuItem>
                {brokerQuery.data?.results?.map((broker) => (
                  <MenuItem key={broker.id} value={String(broker.id)}>
                    {broker.name}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Company search"
                value={companySearchInput}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  setCompanySearchInput(nextValue);
                  setFilterParam('companySearch', nextValue);
                }}
                fullWidth
              />
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                justifyContent="space-between"
                alignItems={{ xs: 'stretch', sm: 'center' }}
              >
                <Typography variant="h6">Submissions</Typography>
                <SubmissionLayoutSwitcher value={view} onChange={setView} />
              </Stack>
              {/* <Typography color="text.secondary">
                Hook `submissionsQuery` to render rows, totals, and pagination states. The query is
                disabled by default so no network calls fire until you enable it.
              </Typography> */}
              <Divider />
              {/* <Box>
                <pre style={{ margin: 0, fontSize: 14 }}>
                  {JSON.stringify({ filters, queryKey: submissionsQuery.data }, null, 2)}
                </pre>
              </Box> */}
              {submissionsQuery.isLoading ? (
                <SubmissionViewSkeleton view={view} />
              ) : submissionsQuery.isError ? (
                <Typography color="error.main">
                  Failed to load submissions. Please try again.
                </Typography>
              ) : submissionsQuery.data ? (
                <SubmissionView submissions={submissionsQuery.data.results} view={view} />
              ) : (
                <Typography color="text.secondary">No submissions found.</Typography>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
