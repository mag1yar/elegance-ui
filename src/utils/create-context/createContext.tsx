import { createContext as createReactContext, useContext } from 'react'
import { create, StoreApi, UseBoundStore } from 'zustand'
import { ProviderProps } from './types'

type Store<T> = UseBoundStore<StoreApi<T>>

/**
 * Creates a context with a Zustand store and a selector hook.
 *
 * @template T - The type of the store state.
 * @param {string} providerName - The name of the provider.
 * @returns {[React.FC<ProviderProps<T>>, <U>(selector: (state: T) => U, targetName?: string) => U]} A tuple containing the Provider component and the useContextSelector hook.
 */
export const createContext = <T extends object>(providerName: string) => {
  const StoreContext = createReactContext<Store<T> | null>(null)
  const NameContext = createReactContext<string | null>(null)

  /**
   * Provider component that wraps children with the created contexts.
   *
   * @param {ProviderProps<T>} props The props for the Provider component.
   * @returns {JSX.Element} The Provider component.
   */
  const Provider = ({ name, children, initialState }: ProviderProps<T>) => {
    const parentName = useContext(NameContext)
    const fullName = parentName ? `${providerName}_${name}` : `${providerName}_${name || 'default'}`

    const useStore = create<T>(() => {
      if (initialState === undefined) {
        throw new Error(`initialState must be provided for ${providerName}`)
      }
      return initialState
    })

    return (
      <NameContext.Provider value={fullName}>
        <StoreContext.Provider value={useStore}>{children}</StoreContext.Provider>
      </NameContext.Provider>
    )
  }

  /**
   * Hook to select and use a part of the store state.
   *
   * @template U The type of the selected state.
   * @param {(state: T) => U} selector A function to select a part of the state.
   * @param {string} [targetName] Optional name to target a specific provider.
   * @returns {U} The selected state.
   * @throws {Error} Throws an error if no provider is found or if the target name doesn't match.
   */
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
