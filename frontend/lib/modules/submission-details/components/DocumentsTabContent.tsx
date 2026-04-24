'use client';

import { Card, CardContent, Link as MuiExternalLink, Stack, Typography } from '@mui/material';

import type { SubmissionDetail } from '@/lib/types';

type DocumentsTabContentProps = {
  submission: SubmissionDetail;
};

const styles = {
  list: { spacing: 1.5 },
  cardContent: { '&:last-child': { pb: 2 } },
} as const;

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function DocumentsTabContent({ submission }: DocumentsTabContentProps) {
  return submission.documents.length === 0 ? (
    <Typography color="text.secondary">No documents uploaded.</Typography>
  ) : (
    <Stack spacing={styles.list.spacing}>
      {submission.documents.map((document) => (
        <Card key={document.id} variant="outlined">
          <CardContent sx={styles.cardContent}>
            <Stack spacing={0.5}>
              <MuiExternalLink href={document.fileUrl} target="_blank" rel="noreferrer">
                {document.title}
              </MuiExternalLink>
              <Typography variant="body2" color="text.secondary">
                {document.docType} - uploaded {formatDate(document.uploadedAt)}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
