'use client';

import {
  Box,
  Divider,
  Link as MuiLink,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { SyntheticEvent, useState } from 'react';

import { useSubmissionDetail } from '@/lib/hooks/useSubmissions';
import { CondensedTab, CondensedTabs } from '@/lib/modules/submissions/components/CondensedTabs';
import { ContactsTabContent } from '@/lib/modules/submission-details/components/ContactsTabContent';
import { DocumentsTabContent } from '@/lib/modules/submission-details/components/DocumentsTabContent';
import {
  NotesDesktopSidebar,
  NotesTabContent,
} from '@/lib/modules/submission-details/components/NotesTabContent';
import { LabeledCounter } from '@/lib/modules/submissions/components/LabeledCounter';
import { OverviewTabContent } from '@/lib/modules/submission-details/components/OverviewTabContent';
import { PriorityIndicator } from '@/lib/modules/submissions/components/PriorityIndicator';
import { SubmissionStatusChip } from '@/lib/modules/submissions/components/SubmissionStatusChip';
import { Truncate } from '@/lib/modules/submissions/components/Truncate';

type DetailTab = 'overview' | 'contacts' | 'documents' | 'notes';

const styles = {
  root: {
    display: 'flex',
    minHeight: 0,
    height: '100dvh',
    maxHeight: '100dvh',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header: {
    borderBottom: 1,
    borderColor: 'divider',
    px: { xs: 2, sm: 3, md: 4 },
    py: { xs: 2, sm: 2.5 },
  },
  headerRow: {
    display: 'flex',
    alignItems: { xs: 'flex-start', sm: 'center' },
    justifyContent: 'space-between',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: 1.5,
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
    maxHeight: '100%',
    overflow: 'hidden',
    pl: { xs: 2, sm: 3, md: 4 },
    pr: 0.5,
    pb: { xs: 2, sm: 3, md: 4 },
    pt: { xs: 1, sm: 1.5, md: 2 },
  },
  mutedDivider: { borderColor: 'grey.200' },
  desktopGrid: {
    display: 'grid',
    flex: 1,
    gap: 3,
    height: '100%',
    minHeight: 0,
    minWidth: 0,
    overflow: 'hidden',
    gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1fr) 360px' },
  },
  desktopMainColumn: { minHeight: 0, height: '100%', overflow: 'hidden' },
  desktopTabPanel: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    flex: 1,
    overflow: 'hidden',
    minWidth: 0,
  },
  tabScrollArea: { flex: 1, minHeight: 0, overflow: 'auto', minWidth: 0 },
} as const;

export default function SubmissionDetailPage() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const params = useParams<{ id: string }>();
  const submissionId = params?.id ?? '';
  const [activeTab, setActiveTab] = useState<DetailTab>('overview');

  const detailQuery = useSubmissionDetail(submissionId);
  const submission = detailQuery.data;

  const handleTabChange = (_event: SyntheticEvent, value: DetailTab) => {
    setActiveTab(value);
  };

  return (
    <Box sx={styles.root}>
      <Box sx={styles.header}>
        <Box sx={styles.headerRow}>
          <Stack spacing={0.5}>
            <Typography variant="h4">Submission detail</Typography>
            {submission ? (
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography variant="h6" component="h1">
                  <Truncate>{submission.company.legalName}</Truncate>
                </Typography>
                <PriorityIndicator priority={submission.priority} />
                <SubmissionStatusChip status={submission.status} />
              </Stack>
            ) : (
              <Typography color="text.secondary">Review the full submission payload.</Typography>
            )}
          </Stack>
          <MuiLink component={Link} href="/submissions" underline="none">
            Back to list
          </MuiLink>
        </Box>
      </Box>

      <Box sx={styles.content}>
        {detailQuery.isLoading ? (
          <Typography color="text.secondary">Loading submission...</Typography>
        ) : detailQuery.isError ? (
          <Typography color="error.main">Failed to load submission. Please try again.</Typography>
        ) : !submission ? (
          <Typography color="text.secondary">Submission not found.</Typography>
        ) : !isDesktop ? (
          <Stack spacing={2} sx={{ flex: 1, minHeight: 0, minWidth: 0, overflow: 'hidden' }}>
            <CondensedTabs value={activeTab} onChange={handleTabChange}>
              <CondensedTab value="overview" label="Overview" />
              <CondensedTab
                value="contacts"
                label={<LabeledCounter label="Contacts" count={submission.contacts.length} />}
              />
              <CondensedTab
                value="documents"
                label={<LabeledCounter label="Documents" count={submission.documents.length} />}
              />
              <CondensedTab
                value="notes"
                label={<LabeledCounter label="Notes" count={submission.notes.length} />}
              />
            </CondensedTabs>
            <Divider sx={styles.mutedDivider} />
            <Box sx={styles.tabScrollArea}>
              {activeTab === 'overview' && <OverviewTabContent submission={submission} />}
              {activeTab === 'contacts' && <ContactsTabContent submission={submission} />}
              {activeTab === 'documents' && <DocumentsTabContent submission={submission} />}
              {activeTab === 'notes' && <NotesTabContent submission={submission} />}
            </Box>
          </Stack>
        ) : (
          <Box sx={styles.desktopGrid}>
            <Stack spacing={2} sx={styles.desktopMainColumn}>
              <CondensedTabs value={activeTab} onChange={handleTabChange}>
                <CondensedTab value="overview" label="Overview" />
                <CondensedTab
                  value="contacts"
                  label={<LabeledCounter label="Contacts" count={submission.contacts.length} />}
                />
                <CondensedTab
                  value="documents"
                  label={<LabeledCounter label="Documents" count={submission.documents.length} />}
                />
              </CondensedTabs>
              <Divider sx={styles.mutedDivider} />
              <Box sx={styles.desktopTabPanel}>
                <Box sx={styles.tabScrollArea}>
                  {activeTab === 'overview' && <OverviewTabContent submission={submission} />}
                  {activeTab === 'contacts' && <ContactsTabContent submission={submission} />}
                  {activeTab === 'documents' && <DocumentsTabContent submission={submission} />}
                </Box>
              </Box>
            </Stack>
            <NotesDesktopSidebar submission={submission} />
          </Box>
        )}
      </Box>
    </Box>
  );
}
