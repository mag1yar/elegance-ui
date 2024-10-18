import { ReactNode } from 'react'

export type EleganceProviderTheme = {
  fontFamily?: string
}

export type EleganceProviderProps = {
  theme?: EleganceProviderTheme
  children: ReactNode
}

export type EleganceProviderContext = {
  theme: EleganceProviderTheme
}
