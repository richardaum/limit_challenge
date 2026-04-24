'use client';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Card, CardContent, IconButton, Stack, Tooltip, Typography } from '@mui/material';

import type { SubmissionDetail } from '@/lib/types';

type OverviewTabContentProps = {
  submission: SubmissionDetail;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function renderFallback(value: string | null | undefined) {
  return value && value.trim().length > 0 ? value : '-';
}

export function OverviewTabContent({ submission }: OverviewTabContentProps) {
  return (
    <Stack spacing={3}>
      <Card variant="outlined">
        <CardContent>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={0}
            useFlexGap
            flexWrap="wrap"
            sx={{ columnGap: 3, rowGap: 2 }}
          >
            <Stack spacing={0.5} sx={{ width: 'fit-content' }}>
              <Typography variant="caption" color="text.secondary">
                Broker
              </Typography>
              <Typography>{submission.broker.name}</Typography>
            </Stack>
            <Stack spacing={0.5} sx={{ width: 'fit-content' }}>
              <Typography variant="caption" color="text.secondary">
                Owner
              </Typography>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography>{submission.owner.fullName}</Typography>
                <Tooltip title={submission.owner.email} arrow>
                  <IconButton
                    size="small"
                    aria-label="Owner email"
                    sx={{
                      p: 0.25,
                      color: 'grey.500',
                      '&:hover': { color: 'grey.600' },
                    }}
                  >
                    <EmailOutlinedIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
            <Stack spacing={0.5} sx={{ width: 'fit-content' }}>
              <Typography variant="caption" color="text.secondary">
                Updated
              </Typography>
              <Typography>{formatDate(submission.updatedAt)}</Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Stack spacing={0.5}>
            <Typography variant="caption" color="text.secondary">
              Summary
            </Typography>
            <Typography>{submission.summary || 'No summary available.'}</Typography>
          </Stack>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardContent>
          <Stack spacing={1.5}>
            <Typography variant="caption" color="text.secondary">
              Company
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2.5} useFlexGap flexWrap="wrap">
              <Stack spacing={0.5} sx={{ width: 'fit-content' }}>
                <Typography variant="caption" color="text.secondary">
                  Industry
                </Typography>
                <Typography>{renderFallback(submission.company.industry)}</Typography>
              </Stack>
              <Stack spacing={0.5} sx={{ width: 'fit-content' }}>
                <Typography variant="caption" color="text.secondary">
                  HQ
                </Typography>
                <Typography>{renderFallback(submission.company.headquartersCity)}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
