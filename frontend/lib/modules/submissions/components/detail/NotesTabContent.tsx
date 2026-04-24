'use client';

import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

import type { SubmissionDetail } from '@/lib/types';
import { LabeledCounter } from '@/lib/modules/submissions/components/LabeledCounter';

type NotesTabContentProps = {
  submission: SubmissionDetail;
};

const styles = {
  notesList: { spacing: 1.5 },
  cardContent: { '&:last-child': { pb: 2 } },
  noteBody: { mt: 0.75 },
  noteDate: { mt: 1, display: 'block' },
  sidebar: {
    minHeight: 0,
    height: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
    borderLeft: { lg: '1px solid' },
    borderLeftColor: { lg: 'grey.300' },
    pl: { lg: 3 },
    display: 'flex',
    flexDirection: 'column',
  },
  notesCounter: { mb: 1.5 },
  notesScrollArea: { minHeight: 0, flex: 1, overflowY: 'auto', pr: 1.5 },
} as const;

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
    <Stack spacing={styles.notesList.spacing}>
      {submission.notes.map((note) => (
        <Card key={note.id} variant="outlined">
          <CardContent sx={styles.cardContent}>
            <Typography variant="body2" color="text.secondary">
              {note.authorName}
            </Typography>
            <Typography variant="body2" sx={styles.noteBody}>
              {note.body}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={styles.noteDate}>
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
    <Box sx={styles.sidebar}>
      <LabeledCounter
        label={
          <Typography component="span" variant="subtitle1">
            Notes
          </Typography>
        }
        count={submission.notes.length}
        sx={styles.notesCounter}
      />
      <Box sx={styles.notesScrollArea}>
        <NotesTabContent submission={submission} />
      </Box>
    </Box>
  );
}
