import React from '@storybook/react'
import type { Preview } from '@storybook/react'
import { EleganceProvider } from '../src/components'
import 'non.geist'
import '../src/global.css'

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
          fontFamily: 'Geist Variable',
        }}
      >
        <Story />
      </EleganceProvider>
    ),
  ],
}

export default preview
