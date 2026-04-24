'use client';

import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

type TruncateProps = {
  children: ReactNode;
  lines?: number;
};

const SINGLE_LINE_TRUNCATE_SX: SxProps<Theme> = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};

const MULTI_LINE_TRUNCATE_BASE_SX: SxProps<Theme> = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
};

export function Truncate({ children, lines = 1 }: TruncateProps) {
  const sx: SxProps<Theme> =
    lines > 1
      ? { ...MULTI_LINE_TRUNCATE_BASE_SX, WebkitLineClamp: lines }
      : SINGLE_LINE_TRUNCATE_SX;

  return (
    <Box component="span" sx={sx}>
      {children}
    </Box>
  );
}
