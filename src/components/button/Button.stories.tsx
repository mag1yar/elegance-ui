import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Settings } from 'lucide-react'

import { Button } from './'

const meta = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: {
        type: 'select',
      },
      options: ['filled', 'outline', 'text'],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'filled',
    disabled: false,
  },
}

export const WithIcons: Story = {
  args: {
    children: (
      <>
        <Settings size={18} /> Button
      </>
    ),
    variant: 'filled',
    disabled: false,
  },
}

export const AsChild: Story = {
  args: {
    children: <a href='#link'>Link</a>,
    asChild: true,
    variant: 'filled',
    disabled: false,
  },
}

export const Disabled: Story = {
  args: {
    children: 'Button',
    variant: 'filled',
    disabled: true,
  },
}
