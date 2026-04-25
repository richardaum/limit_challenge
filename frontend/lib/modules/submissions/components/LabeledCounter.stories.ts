import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { LabeledCounter } from './LabeledCounter';

const meta = {
  component: LabeledCounter,
  title: 'Components/LabeledCounter',
} satisfies Meta<typeof LabeledCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Contacts',
    count: 5,
  },
};

export const Zero: Story = {
  args: {
    label: 'Documents',
    count: 0,
  },
};

export const Many: Story = {
  args: {
    label: 'Notes',
    count: 42,
  },
};
