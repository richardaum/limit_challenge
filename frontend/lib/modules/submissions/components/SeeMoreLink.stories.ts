import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { fn } from 'storybook/test';

import { SeeMoreLink } from './SeeMoreLink';

const meta = {
  component: SeeMoreLink,
  title: 'Components/SeeMoreLink',
} satisfies Meta<typeof SeeMoreLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    loading: false,
    onClick: fn(),
  },
};

export const Loading: Story = {
  args: {
    loading: true,
    onClick: fn(),
  },
};
