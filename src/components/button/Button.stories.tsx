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
    size: {
      control: 'select',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 24, '24px'],
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

export const Sizes: Story = {
  render: (args) => {
    return (
      <>
        <Button {...args}>Custom</Button>
        <br />
        <Button size='xxs'>xxs</Button>
        <Button size='xs'>xs</Button>
        <Button size='sm'>sm</Button>
        <Button size='md'>md</Button>
        <Button size='lg'>lg</Button>
        <Button size='xl'>xl</Button>
        <Button size='xxl'>xxl</Button>
        <br />
        <Button size='10px'>10px</Button>
        <Button size={10}>10</Button>
        <Button size='20px'>20px</Button>
        <Button size={20}>20</Button>
        <Button size='1rem'>1rem</Button>
      </>
    )
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
