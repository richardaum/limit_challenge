import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Truncate } from './Truncate';

const meta = {
  component: Truncate,
  title: 'Components/Truncate',
} satisfies Meta<typeof Truncate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleLine: Story = {
  args: {
    children: 'Short text',
    lines: 1,
  },
};

export const MultiLine: Story = {
  args: {
    children:
      'This is a very long text that should be truncated when it exceeds the maximum length specified',
    lines: 2,
  },
};

export const ThreeLines: Story = {
  args: {
    children:
      'This is a very long text with even more content that should be truncated when it exceeds the maximum number of lines allowed in this component.',
    lines: 3,
  },
};
