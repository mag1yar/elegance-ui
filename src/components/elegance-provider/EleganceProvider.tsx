import { useMemo } from 'react'
import { defaultTheme } from './config'
import { EleganceProvider as Provider } from './EleganceProvider.context'
import { EleganceProviderProps } from './EleganceProvider.types'
import { createCSSVariables } from './utils'

const EleganceProvider = (props: EleganceProviderProps) => {
  const { theme = defaultTheme, children } = props

  const cssVariables = useMemo(() => createCSSVariables(theme), [theme])

  return (
    <Provider
      initialState={{
        theme,
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
          :root {
            ${cssVariables}
          }
        `,
        }}
      />
      {children}
    </Provider>
  )
}

export default EleganceProvider
