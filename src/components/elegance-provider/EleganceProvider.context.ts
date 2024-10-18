import { createContext } from '../../utils'
import { EleganceProviderContext } from './EleganceProvider.types'

export const [EleganceProvider, useEleganceContext] =
  createContext<EleganceProviderContext>('EleganceProvider')
