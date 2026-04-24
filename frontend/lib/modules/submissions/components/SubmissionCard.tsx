'use client';

import Link from 'next/link';

import { Card, CardContent, Divider, Link as MuiLink, Stack, Typography } from '@mui/material';

import type { SubmissionListItem } from '@/lib/types';
import { PriorityIndicator } from './PriorityIndicator';
import { SubmissionStatusChip } from './SubmissionStatusChip';
import { Truncate } from './Truncate';

type SubmissionCardProps = {
  submission: SubmissionListItem;
};

export function SubmissionCard({ submission }: SubmissionCardProps) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Stack>
          <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={0.75} alignItems="center">
              <MuiLink
                component={Link}
                href={`/submissions/${submission.id}`}
                underline="hover"
                color="inherit"
              >
                <Typography variant="body1">
                  <Truncate>{submission.company.legalName}</Truncate>
                </Typography>
              </MuiLink>
              <PriorityIndicator priority={submission.priority} />
            </Stack>
            <SubmissionStatusChip status={submission.status} />
          </Stack>

          <Typography variant="caption" color="text.secondary">
            <Truncate>Broker: {submission.broker.name}</Truncate>
          </Typography>

          <Divider sx={{ my: 1, borderColor: 'grey.200' }} />

          <Typography variant="body2">
            <Truncate lines={2}>{submission.summary || 'No summary available.'}</Truncate>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
