import { createContext as createReactContext, useContext } from 'react'
import { create, StoreApi, UseBoundStore } from 'zustand'
import { ProviderProps } from './types'

type Store<T> = UseBoundStore<StoreApi<T>>

export const createContext = <T extends object>(providerName: string, initialState: T) => {
  const StoreContext = createReactContext<Store<T> | null>(null)
  const NameContext = createReactContext<string | null>(null)

  const useStore = create<T>(() => initialState)

  const Provider = ({ name, children }: ProviderProps) => {
    const parentName = useContext(NameContext)
    const fullName = parentName ? `${providerName}_${name}` : `${providerName}_${name || 'default'}`

    return (
      <NameContext.Provider value={fullName}>
        <StoreContext.Provider value={useStore}>{children}</StoreContext.Provider>
      </NameContext.Provider>
    )
  }

  const useContextSelector = <U,>(selector: (state: T) => U, targetName?: string): U => {
    const store = useContext(StoreContext)
    const contextName = useContext(NameContext)

    if (!store) {
      throw new Error(`No provider found for ${providerName}`)
    }

    if (targetName) {
      const fullTargetName = `${providerName}_${targetName}`

      if (fullTargetName !== contextName) {
        throw new Error(
          `Provider with name "${targetName}" not found in ${providerName} context. Current context name: "${contextName}"`
        )
      }
    }

    return store(selector)
  }

  return [Provider, useContextSelector] as const
}
