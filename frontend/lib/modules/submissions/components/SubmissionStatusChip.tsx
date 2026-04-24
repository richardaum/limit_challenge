'use client';

import { Chip } from '@mui/material';

import type { SubmissionStatus } from '@/lib/types';

type SubmissionStatusChipProps = {
  status: SubmissionStatus;
};

const colorMap: Record<SubmissionStatus, { text: string; background: string; border: string }> = {
  new: { text: '#1e5aa6', background: '#eef5ff', border: '#dbe9ff' },
  in_review: { text: '#8a5a00', background: '#fff8e8', border: '#f5e8c6' },
  closed: { text: '#1f6b38', background: '#edf8f1', border: '#d9efe2' },
  lost: { text: '#8f2f2f', background: '#fdf0f0', border: '#f5dada' },
};

const styles = {
  chip: (text: string, backgroundColor: string) => ({
    color: text,
    backgroundColor,
    border: 'none',
    borderRadius: 1,
  }),
} as const;

function toTitleCase(value: string) {
  return value
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function SubmissionStatusChip({ status }: SubmissionStatusChipProps) {
  const tone = colorMap[status];

  return (
    <Chip size="small" label={toTitleCase(status)} sx={styles.chip(tone.text, tone.background)} />
  );
}
