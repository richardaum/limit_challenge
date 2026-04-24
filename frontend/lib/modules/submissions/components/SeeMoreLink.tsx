'use client';

import { Box, Link as MuiLink } from '@mui/material';

type SeeMoreLinkProps = {
  loading: boolean;
  onClick: () => void;
};

const styles = {
  container: { display: 'flex', justifyContent: 'center' },
  link: { cursor: 'pointer' },
  disabled: { cursor: 'default', pointerEvents: 'none', color: 'text.disabled' },
} as const;

export function SeeMoreLink({ loading, onClick }: SeeMoreLinkProps) {
  return (
    <Box sx={styles.container}>
      <MuiLink
        component="button"
        type="button"
        onClick={onClick}
        underline="hover"
        sx={[styles.link, loading && styles.disabled]}
        aria-disabled={loading}
      >
        {loading ? 'Loading...' : 'See more'}
      </MuiLink>
    </Box>
  );
}
