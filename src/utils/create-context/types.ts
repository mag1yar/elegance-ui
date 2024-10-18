import { ReactNode } from 'react'

export type ProviderProps<T extends object> = {
  name?: string
  children: ReactNode
  initialState?: T
}
