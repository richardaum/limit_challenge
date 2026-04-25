import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { SubmissionViewSkeleton } from './SubmissionViewSkeleton';

const meta = {
  component: SubmissionViewSkeleton,
  title: 'Components/SubmissionViewSkeleton',
} satisfies Meta<typeof SubmissionViewSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grid: Story = {
  args: {
    view: 'grid',
    count: 6,
  },
};

export const List: Story = {
  args: {
    view: 'list',
    count: 4,
  },
};

export const CustomCount: Story = {
  args: {
    view: 'grid',
    count: 3,
  },
};
