import React from '@storybook/react'
import type { Preview } from '@storybook/react'
import { EleganceProvider } from '../src/components'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <EleganceProvider
        theme={{
          fontFamily: 'Inter',
        }}
      >
        <Story />
      </EleganceProvider>
    ),
  ],
}

export default preview
