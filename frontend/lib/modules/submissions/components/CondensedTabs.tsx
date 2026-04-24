'use client';

import { Tab, Tabs } from '@mui/material';
import type { TabProps, TabsProps } from '@mui/material';

const CONDENSED_TABS_SX = {
  minHeight: 34,
  '& .MuiTabs-indicator': { height: 2 },
};

const CONDENSED_TAB_SX = {
  minHeight: 34,
  minWidth: 0,
  px: 1.25,
  py: 0.5,
};

export function CondensedTabs({ sx, variant = 'scrollable', ...props }: TabsProps) {
  return <Tabs variant={variant} sx={{ ...CONDENSED_TABS_SX, ...sx }} {...props} />;
}

export function CondensedTab({ sx, ...props }: TabProps) {
  return <Tab sx={{ ...CONDENSED_TAB_SX, ...sx }} {...props} />;
}
