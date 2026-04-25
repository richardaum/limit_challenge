import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SubmissionStatusChip } from './SubmissionStatusChip';

const meta = {
  component: SubmissionStatusChip,
  title: 'Components/SubmissionStatusChip',
} satisfies Meta<typeof SubmissionStatusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const New: Story = {
  args: {
    status: 'new',
  },
};

export const InReview: Story = {
  args: {
    status: 'in_review',
  },
};

export const Closed: Story = {
  args: {
    status: 'closed',
  },
};

export const Lost: Story = {
  args: {
    status: 'lost',
  },
};
