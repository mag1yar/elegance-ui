import { ReactNode } from 'react'
import { ButtonProps } from '../button'

export type ComponentProps = {
  Button: ButtonProps
}

export type ComponentDefaultProps = {
  [K in keyof ComponentProps]?: Partial<ComponentProps[K]>
}

export type EleganceProviderTheme = {
  fontFamily?: string
  scale?: number
  defaultProps?: ComponentDefaultProps
}

export type EleganceProviderProps = {
  theme?: EleganceProviderTheme
  children: ReactNode
  id?: string
}

export type EleganceProviderContext = {
  theme: EleganceProviderTheme
}
