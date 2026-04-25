import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { PriorityIndicator } from './PriorityIndicator';

const meta = {
  component: PriorityIndicator,
  title: 'Components/PriorityIndicator',
} satisfies Meta<typeof PriorityIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const High: Story = {
  args: {
    priority: 'high',
  },
};

export const Medium: Story = {
  args: {
    priority: 'medium',
  },
};

export const Low: Story = {
  args: {
    priority: 'low',
  },
};
