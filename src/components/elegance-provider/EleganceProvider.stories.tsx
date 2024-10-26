import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import EleganceProvider from './EleganceProvider'
import { Button } from '..'

const meta = {
  title: 'Core/EleganceProvider',
  component: EleganceProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof EleganceProvider>

export default meta
type Story = StoryObj<typeof meta>

export const NestedProviders: Story = {
  args: {
    children: (
      <>
        <Button>Global</Button>
        <br />
        <EleganceProvider theme={{ defaultProps: { Button: { variant: 'outline' } } }}>
          <Button>Nested</Button>
        </EleganceProvider>
      </>
    ),
  },
}

export const NestedWithTargetIdProviders: Story = {
  args: {
    children: (
      <>
        <Button>Global</Button>
        <br />
        <EleganceProvider
          id='nested'
          theme={{ defaultProps: { Button: { variant: 'outline' } } }}
        >
          <Button targetId='nested'>Nested</Button>
          <br />
          <Button>Connected to Global</Button>
        </EleganceProvider>
      </>
    ),
  },
}
