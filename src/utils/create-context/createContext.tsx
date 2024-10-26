import {
  createContext as createReactContext,
  useContext,
  useRef,
  useMemo,
  createElement,
} from 'react'
import { create } from 'zustand'
import { ContextInstance, ContextProviderProps, ContextValue, SelectorType } from './types'

/** Default context instance identifier */
const DEFAULT_ID = 'default'

/**
 * Creates a new context with Zustand store integration.
 *
 * @template State - The type of the state managed by the store
 * @param name - Unique name for the context, used in error messages
 * @returns A tuple containing:
 *  - Provider component for wrapping parts of the app that need access to the store
 *  - useSelector hook for selecting and subscribing to store state
 *
 * @example
 * ```typescript
 * type TodoState = {
 *   todos: string[]
 *   addTodo: (todo: string) => void
 * }
 *
 * const [TodoProvider, useTodoSelector] = createContext<TodoState>('todos')
 *
 * // In your app:
 * function App() {
 *   return (
 *     <TodoProvider initialState={(set) => ({
 *       todos: [],
 *       addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] }))
 *     })}>
 *       <TodoList />
 *     </TodoProvider>
 *   )
 * }
 *
 * function TodoList() {
 *   const todos = useTodoSelector(state => state.todos)
 *   return <ul>{todos.map(todo => <li key={todo}>{todo}</li>)}</ul>
 * }
 * ```
 */
export function createContext<State>(name: string) {
  const Context = createReactContext<ContextInstance<State> | null>(null)
  const errorMessage = `${name} context not found`

  /**
   * Provider component that creates a new context instance with its own store.
   * Can be nested to create multiple store instances identified by their IDs.
   */
  const Provider = ({ children, id = DEFAULT_ID, initialState }: ContextProviderProps<State>) => {
    const parentContext = useContext(Context)

    const store = useMemo(() => create(initialState), [initialState])

    const contextValue = useMemo<ContextValue<State>>(
      () => ({
        store,
        id,
        parentContext: parentContext,
      }),
      [id, parentContext]
    )

    const contextInstance = useMemo<ContextInstance<State>>(
      () => ({
        value: contextValue,
        id,
      }),
      [contextValue, id]
    )

    return createElement(Context.Provider, { value: contextInstance }, children)
  }

  /**
   * Internal hook that retrieves the context instance for a given ID.
   * Traverses up the context hierarchy if necessary.
   *
   * @param targetId - Optional ID of the context instance to retrieve
   * @returns The context value containing the store and metadata
   * @throws Error if context is not found or if target ID doesn't exist
   */
  function useContextStore(targetId?: string) {
    const context = useContext(Context)

    if (!context) {
      throw new Error(errorMessage)
    }

    const id = targetId ?? DEFAULT_ID
    let currentContext: ContextInstance<State> | null = context

    while (currentContext) {
      if (currentContext.id === id) {
        return currentContext.value
      }
      currentContext = currentContext.value.parentContext
    }

    throw new Error(`${name} context with id "${id}" not found`)
  }

  /**
   * Hook for selecting and subscribing to store state.
   *
   * @template SelectorOutput - The type of the selected value
   * @param selector - Function that extracts a value from the store state
   * @param targetId - Optional ID of the context instance to select from
   * @returns The selected value from the store state
   * @throws Error if context is not found or if target ID doesn't exist
   *
   * @example
   * ```typescript
   * // Select a single value
   * const count = useSelector(state => state.count)
   *
   * // Select multiple values
   * const { title, description } = useSelector(state => ({
   *   title: state.title,
   *   description: state.description
   * }))
   *
   * // Select from a specific context instance
   * const count = useSelector(state => state.count, "secondary")
   * ```
   */
  function useSelector<SelectorOutput>(
    selector: SelectorType<State, SelectorOutput>,
    targetId?: string
  ): SelectorOutput {
    const { store } = useContextStore(targetId)
    const selectorRef = useRef(selector)

    useMemo(() => {
      selectorRef.current = selector
    }, [selector])

    return store((state) => selectorRef.current(state))
  }

  return [Provider, useSelector] as const
}
