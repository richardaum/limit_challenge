import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { SubmissionLayoutSwitcher } from './SubmissionLayoutSwitcher';

const meta = {
  component: SubmissionLayoutSwitcher,
  title: 'Components/SubmissionLayoutSwitcher',
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof SubmissionLayoutSwitcher>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grid: Story = {
  args: {
    value: 'grid',
    onChange: fn(),
  },
};

export const List: Story = {
  args: {
    value: 'list',
    onChange: fn(),
  },
};
