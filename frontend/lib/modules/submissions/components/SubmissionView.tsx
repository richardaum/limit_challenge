import { Box } from '@mui/material';

import type { SubmissionListItem } from '@/lib/types';
import { SubmissionCard } from './SubmissionCard';

type SubmissionViewProps = {
  submissions: SubmissionListItem[];
  view?: 'grid' | 'list';
};

const styles = {
  grid: {
    display: 'grid',
    gap: 2,
  },
} as const;

export function SubmissionView({ submissions, view = 'grid' }: SubmissionViewProps) {
  const isListView = view === 'list';

  return (
    <Box
      sx={{
        ...styles.grid,
        gridTemplateColumns: {
          xs: '1fr',
          md: isListView ? '1fr' : 'repeat(2, minmax(0, 1fr))',
          lg: isListView ? '1fr' : 'repeat(3, minmax(0, 1fr))',
        },
      }}
    >
      {submissions.map((submission) => (
        <SubmissionCard key={submission.id} submission={submission} />
      ))}
    </Box>
  );
}
