import React from 'react'
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
    animation: {
      control: {
        type: 'object',
      },
      description:
        'Animation settings. Can be a boolean or an object with hover and tap properties',
      table: {
        type: {
          summary: 'ButtonAnimation | boolean',
          detail: '{ hover?: boolean; tap?: boolean; } | boolean',
        },
      },
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
        <Settings /> Button
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

// Новые сторис для демонстрации анимации

export const NoAnimation: Story = {
  args: {
    children: 'No Animation',
    variant: 'filled',
    animation: false,
  },
}

export const DefaultAnimation: Story = {
  args: {
    children: 'Default Animation',
    variant: 'filled',
    animation: true,
  },
}

export const HoverOnlyAnimation: Story = {
  args: {
    children: 'Hover Only',
    variant: 'filled',
    animation: { hover: true, tap: false },
  },
}

export const TapOnlyAnimation: Story = {
  args: {
    children: 'Tap Only',
    variant: 'filled',
    animation: { hover: false, tap: true },
  },
}

export const AnimationStates: Story = {
  render: () => (
    <div className='flex gap-4'>
      <Button variant='filled'>Default Animations</Button>
      <Button
        variant='filled'
        animation={false}
      >
        No Animations
      </Button>
      <Button
        variant='filled'
        animation={{ hover: true, tap: false }}
      >
        Hover Only
      </Button>
      <Button
        variant='filled'
        animation={{ hover: false, tap: true }}
      >
        Tap Only
      </Button>
    </div>
  ),
}
