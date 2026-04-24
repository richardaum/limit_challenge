import { Box } from '@mui/material';

import type { SubmissionListItem } from '@/lib/types';
import { SubmissionCard } from './SubmissionCard';

type SubmissionViewProps = {
  submissions: SubmissionListItem[];
  view?: 'grid' | 'list';
};

export function SubmissionView({ submissions, view = 'grid' }: SubmissionViewProps) {
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
      {submissions.map((submission) => (
        <SubmissionCard key={submission.id} submission={submission} />
      ))}
    </Box>
  );
}
