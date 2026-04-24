import { Box } from '@mui/material';

import type { SubmissionListItem } from '@/lib/types';
import { SubmissionCard } from './SubmissionCard';

type SubmissionGridProps = {
  submissions: SubmissionListItem[];
};

export function SubmissionGrid({ submissions }: SubmissionGridProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: '1fr',
          md: 'repeat(2, minmax(0, 1fr))',
          lg: 'repeat(3, minmax(0, 1fr))',
        },
      }}
    >
      {submissions.map((submission) => (
        <SubmissionCard key={submission.id} submission={submission} />
      ))}
    </Box>
  );
}
