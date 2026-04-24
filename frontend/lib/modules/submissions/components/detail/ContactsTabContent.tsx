'use client';

import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import { Card, CardContent, IconButton, Stack, Tooltip, Typography } from '@mui/material';

import type { SubmissionDetail } from '@/lib/types';

type ContactsTabContentProps = {
  submission: SubmissionDetail;
};

function renderFallback(value: string | null | undefined) {
  return value && value.trim().length > 0 ? value : '-';
}

export function ContactsTabContent({ submission }: ContactsTabContentProps) {
  return (
    submission.contacts.length === 0 ? (
      <Typography color="text.secondary">No contacts recorded.</Typography>
    ) : (
      <Stack spacing={1.5}>
        {submission.contacts.map((contact) => (
          <Card key={contact.id} variant="outlined">
            <CardContent sx={{ '&:last-child': { pb: 2 } }}>
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
                        sx={{
                          p: 0.25,
                          color: 'grey.500',
                          '&:hover': { color: 'grey.600' },
                        }}
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
                        sx={{
                          p: 0.25,
                          color: 'grey.500',
                          '&:hover': { color: 'grey.600' },
                        }}
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
    )
  );
}
