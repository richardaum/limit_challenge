import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState, SyntheticEvent } from 'react';

import { CondensedTabs, CondensedTab } from './CondensedTabs';
import { LabeledCounter } from './LabeledCounter';

const meta = {
  component: CondensedTabs,
  title: 'Components/CondensedTabs',
} satisfies Meta<typeof CondensedTabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('overview');
    const handleChange = (_event: SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
    return (
      <CondensedTabs {...args} value={value} onChange={handleChange}>
        <CondensedTab value="overview" label="Overview" />
        <CondensedTab value="contacts" label="Contacts" />
        <CondensedTab value="documents" label="Documents" />
        <CondensedTab value="notes" label="Notes" />
      </CondensedTabs>
    );
  },
};

export const WithBadges: Story = {
  render: (args) => {
    const [value, setValue] = useState('overview');
    const handleChange = (_event: SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
    return (
      <CondensedTabs {...args} value={value} onChange={handleChange}>
        <CondensedTab value="overview" label="Overview" />
        <CondensedTab value="contacts" label={<LabeledCounter label="Contacts" count={3} />} />
        <CondensedTab value="documents" label={<LabeledCounter label="Documents" count={5} />} />
        <CondensedTab value="notes" label={<LabeledCounter label="Notes" count={12} />} />
      </CondensedTabs>
    );
  },
};
