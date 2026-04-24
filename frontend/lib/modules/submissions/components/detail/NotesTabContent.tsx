'use client';

import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import type { SubmissionDetail } from '@/lib/types';
import { LabeledCounter } from '@/lib/modules/submissions/components/LabeledCounter';

type NotesTabContentProps = {
  submission: SubmissionDetail;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function NotesTabContent({ submission }: NotesTabContentProps) {
  if (submission.notes.length === 0) {
    return <Typography color="text.secondary">No notes yet.</Typography>;
  }

  return (
    <Stack spacing={1.5}>
      {submission.notes.map((note) => (
        <Card key={note.id} variant="outlined">
          <CardContent sx={{ '&:last-child': { pb: 2 } }}>
            <Typography variant="body2" color="text.secondary">
              {note.authorName}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.75 }}>
              {note.body}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {formatDate(note.createdAt)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}

export function NotesDesktopSidebar({ submission }: NotesTabContentProps) {
  return (
    <Box
      sx={{
        minHeight: 0,
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        borderLeft: { lg: '1px solid' },
        borderLeftColor: { lg: 'grey.300' },
        pl: { lg: 3 },
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <LabeledCounter
        label={
          <Typography component="span" variant="subtitle1">
            Notes
          </Typography>
        }
        count={submission.notes.length}
        sx={{ mb: 1.5 }}
      />
      <Box sx={{ minHeight: 0, flex: 1, overflowY: 'auto', pr: 1.5 }}>
        <NotesTabContent submission={submission} />
      </Box>
    </Box>
  );
}
