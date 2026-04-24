'use client';

import ViewAgendaOutlinedIcon from '@mui/icons-material/ViewAgendaOutlined';
import ViewModuleOutlinedIcon from '@mui/icons-material/ViewModuleOutlined';
import { Tooltip, ToggleButton, ToggleButtonGroup } from '@mui/material';

export type SubmissionLayout = 'grid' | 'list';

type SubmissionLayoutSwitcherProps = {
  value: SubmissionLayout;
  onChange: (nextView: SubmissionLayout) => void;
};

const LAYOUT_SWITCHER_SX = {
  border: '1px solid',
  borderColor: 'divider',
  '& .MuiToggleButton-root': {
    border: 0,
    color: 'text.secondary',
    px: 1.25,
  },
  '& .MuiToggleButton-root.Mui-selected': {
    bgcolor: 'action.selected',
    color: 'text.primary',
  },
} as const;

export function SubmissionLayoutSwitcher({ value, onChange }: SubmissionLayoutSwitcherProps) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      size="small"
      onChange={(_, nextView: SubmissionLayout | null) => {
        if (!nextView) {
          return;
        }
        onChange(nextView);
      }}
      aria-label="Submissions layout"
      sx={LAYOUT_SWITCHER_SX}
    >
      <Tooltip title="Grid view">
        <ToggleButton value="grid" aria-label="Grid view">
          <ViewModuleOutlinedIcon fontSize="small" />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="List view">
        <ToggleButton value="list" aria-label="List view">
          <ViewAgendaOutlinedIcon fontSize="small" />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
}
