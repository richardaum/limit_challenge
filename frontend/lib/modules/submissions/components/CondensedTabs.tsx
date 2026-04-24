'use client';

import { Tab, Tabs } from '@mui/material';
import type { TabProps, TabsProps } from '@mui/material';

const styles = {
  tabs: {
    minHeight: 34,
    '& .MuiTabs-indicator': { height: 2 },
  },
  tab: {
    minHeight: 34,
    minWidth: 0,
    px: 1.25,
    py: 0.5,
  },
} as const;

export function CondensedTabs({ sx, variant = 'scrollable', ...props }: TabsProps) {
  return <Tabs variant={variant} sx={{ ...styles.tabs, ...sx }} {...props} />;
}

export function CondensedTab({ sx, ...props }: TabProps) {
  return <Tab sx={{ ...styles.tab, ...sx }} {...props} />;
}
