'use client';

import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';
import type { BoxProps } from '@mui/material';
import type { Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

type LabeledCounterProps = {
  label: ReactNode;
  count: number;
} & BoxProps;

type CounterBadgeProps = {
  count: number;
};

const styles = {
  badge: (theme: Theme) => ({
    minWidth: 20,
    height: 20,
    px: 0.75,
    borderRadius: 999,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: theme.typography.caption.fontSize,
    fontWeight: 600,
    lineHeight: 1,
    color: theme.palette.primary.main,
    bgcolor: alpha(theme.palette.primary.main, 0.12),
  }),
  wrapper: { display: 'inline-flex', alignItems: 'center', gap: 0.75, pr: 0.25 },
} as const;

function CounterBadge({ count }: CounterBadgeProps) {
  return (
    <Box component="span" sx={styles.badge}>
      {count}
    </Box>
  );
}

export function LabeledCounter({
  label,
  count,
  component = 'span',
  sx,
  ...props
}: LabeledCounterProps) {
  return (
    <Box component={component} sx={[styles.wrapper, ...(Array.isArray(sx) ? sx : [sx])]} {...props}>
      {label}
      <CounterBadge count={count} />
    </Box>
  );
}
