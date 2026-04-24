'use client';

import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import RemoveIcon from '@mui/icons-material/Remove';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { Tooltip } from '@mui/material';

import type { SubmissionPriority } from '@/lib/types';

type PriorityIndicatorProps = {
  priority: SubmissionPriority;
};

const priorityColorMap: Record<SubmissionPriority, string> = {
  high: '#d32f2f',
  medium: '#ed6c02',
  low: '#2e7d32',
};

const priorityIconMap: Record<SubmissionPriority, typeof PriorityHighIcon> = {
  high: PriorityHighIcon,
  medium: RemoveIcon,
  low: KeyboardDoubleArrowDownIcon,
};

const styles = {
  tooltip: { textTransform: 'capitalize' },
  icon: (color: string) => ({ color }),
} as const;

export function PriorityIndicator({ priority }: PriorityIndicatorProps) {
  const PriorityIcon = priorityIconMap[priority];

  return (
    <Tooltip arrow title={`Priority: ${priority}`} slotProps={{ tooltip: { sx: styles.tooltip } }}>
      <PriorityIcon fontSize="small" sx={styles.icon(priorityColorMap[priority])} />
    </Tooltip>
  );
}
