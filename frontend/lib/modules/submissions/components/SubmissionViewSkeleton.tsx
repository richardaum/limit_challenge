'use client';

import { Box, Card, CardContent, Divider, Skeleton, Stack } from '@mui/material';

type SubmissionViewSkeletonProps = {
  view?: 'grid' | 'list';
  count?: number;
};

function SubmissionCardSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Skeleton variant="text" width="55%" height={28} />
            <Skeleton variant="rounded" width={80} height={24} />
          </Stack>
          <Skeleton variant="text" width="40%" />
          <Divider sx={{ my: 0.5, borderColor: 'grey.200' }} />
          <Stack spacing={0.5}>
            <Skeleton variant="text" width="100%" />
            <Skeleton variant="text" width="85%" />
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function SubmissionViewSkeleton({ view = 'grid', count = 6 }: SubmissionViewSkeletonProps) {
  const isListView = view === 'list';

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          md: isListView ? '1fr' : 'repeat(2, minmax(0, 1fr))',
          lg: isListView ? '1fr' : 'repeat(3, minmax(0, 1fr))',
        },
      }}
    >
      {Array.from({ length: count }, (_, index) => (
        <SubmissionCardSkeleton key={index} />
      ))}
    </Box>
  );
}
