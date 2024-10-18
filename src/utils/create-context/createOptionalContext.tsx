import { createContext as createReactContext, useContext } from 'react'
import { create, StoreApi, UseBoundStore } from 'zustand'
import { ProviderProps } from './types'

type Store<T> = UseBoundStore<StoreApi<T>>

/**
 * Creates an optional context with a Zustand store and a selector hook.
 *
 * @template T The type of the store state.
 * @param {string} providerName The name of the provider.
 * @param {T} defaultState The default state of the store.
 * @returns {[React.FC<ProviderProps<T>>, <U>(selector: (state: T) => U, targetName?: string) => U | undefined]} A tuple containing the Provider component and the useOptionalContextSelector hook.
 */
export const createOptionalContext = <T extends object>(providerName: string, defaultState: T) => {
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

    const useStore = create<T>(() => initialState || defaultState)

    return (
      <NameContext.Provider value={fullName}>
        <StoreContext.Provider value={useStore}>{children}</StoreContext.Provider>
      </NameContext.Provider>
    )
  }

  /**
   * Hook to optionally select and use a part of the store state.
   *
   * @template U The type of the selected state.
   * @param {(state: T) => U} selector A function to select a part of the state.
   * @param {string} [targetName] Optional name to target a specific provider.
   * @returns {U | undefined} The selected state or undefined if no provider is found or if the target name doesn't match.
   */
  const useOptionalContextSelector = <U,>(
    selector: (state: T) => U,
    targetName?: string
  ): U | undefined => {
    const store = useContext(StoreContext)
    const contextName = useContext(NameContext)

    if (!store) {
      return undefined
    }

    if (targetName) {
      const fullTargetName = `${providerName}_${targetName}`

      if (fullTargetName !== contextName) {
        return undefined
      }
    }

    return store(selector)
  }

  return [Provider, useOptionalContextSelector] as const
}
