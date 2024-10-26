import { StoreApi, UseBoundStore, StateCreator } from 'zustand'

/**
 * Props for the context provider component.
 * @template T - The type of the state managed by the store
 */
export type ContextProviderProps<T> = {
  /** React children to be wrapped by the provider */
  children: React.ReactNode
  /** Optional unique identifier for the context instance. Defaults to 'default' */
  id?: string
  /** Initial state creator function for the Zustand store */
  initialState: StateCreator<T>
}

/**
 * Internal type representing the value stored in the context.
 * @template T - The type of the state managed by the store
 */
export type ContextValue<T> = {
  /** Zustand store instance */
  store: UseBoundStore<StoreApi<T>>
  /** Unique identifier for this context instance */
  id: string
  /** Reference to parent context if nested, null otherwise */
  parentContext: ContextInstance<T> | null
}

/**
 * Internal type representing a context instance.
 * @template T - The type of the state managed by the store
 */
export type ContextInstance<T> = {
  /** The context value containing the store and metadata */
  value: ContextValue<T>
  /** Unique identifier for this context instance */
  id: string
}

/**
 * Type for selector functions that extract values from the store state.
 * @template T - The type of the complete store state
 * @template U - The type of the selected value
 */
export type SelectorType<T, U> = (state: T) => U
