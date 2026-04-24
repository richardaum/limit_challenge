'use client';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Card, CardContent, IconButton, Stack, Tooltip, Typography } from '@mui/material';

import type { SubmissionDetail } from '@/lib/types';

type ContactsTabContentProps = {
  submission: SubmissionDetail;
};

const styles = {
  list: { spacing: 1.5 },
  cardContent: { '&:last-child': { pb: 2 } },
  iconButton: { p: 0.25, color: 'grey.500', '&:hover': { color: 'grey.600' } },
} as const;

function renderFallback(value: string | null | undefined) {
  return value && value.trim().length > 0 ? value : '-';
}

export function ContactsTabContent({ submission }: ContactsTabContentProps) {
  if (submission.contacts.length === 0) {
    return <Typography color="text.secondary">No contacts recorded.</Typography>;
  }

  return (
    <Stack spacing={styles.list.spacing}>
      {submission.contacts.map((contact) => (
        <Card key={contact.id} variant="outlined">
          <CardContent sx={styles.cardContent}>
            <Stack spacing={0.5}>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <Typography component="span">{contact.name}</Typography>
                {contact.email && contact.email.trim().length > 0 && (
                  <Tooltip title={contact.email} arrow>
                    <IconButton
                      component="a"
                      href={`mailto:${contact.email}`}
                      size="small"
                      aria-label={`Email de ${contact.name}`}
                      sx={styles.iconButton}
                    >
                      <EmailOutlinedIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                )}
                {contact.phone && contact.phone.trim().length > 0 && (
                  <Tooltip title={contact.phone} arrow>
                    <IconButton
                      component="a"
                      href={`tel:${contact.phone}`}
                      size="small"
                      aria-label={`Telefone de ${contact.name}`}
                      sx={styles.iconButton}
                    >
                      <PhoneOutlinedIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                )}
              </Stack>
              <Typography variant="body2" color="text.secondary">
                {renderFallback(contact.role)}
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
}
