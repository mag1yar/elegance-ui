import { ComponentProps, useEleganceContext } from '../../components'

export function useProps<K extends keyof ComponentProps>(
  componentName: K,
  props: ComponentProps[K]
): ComponentProps[K] {
  const defaultProps = useEleganceContext((state) => state.theme.defaultProps, props.targetId)
  const restProps = (defaultProps?.[componentName] || {}) as Partial<ComponentProps[K]>

  return {
    ...restProps,
    ...props,
  }
}
