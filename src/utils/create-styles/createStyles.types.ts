import { CSSProperties } from 'react'

export type ExtractVariantValues<T> = T extends string | number | null | undefined
  ? Exclude<T, null | undefined>
  : never

export type PropertyConfig<T> = {
  variants?: Record<ExtractVariantValues<T>, string>
  transform?: StyleTransformer<T>
  defaultValue?: T
}

export type StyleResult = {
  className: string
  style?: CSSProperties | Record<string, any>
}

type StyleTransformer<T> = (value: T) => Partial<StyleResult>

export type CreateStylesProps<Props extends Record<string, any>> = Props & {
  className?: string
  style?: CSSProperties
}

export type CreateStylesConfig<Props extends Record<string, any>> = {
  [K in keyof Props]: PropertyConfig<Props[K]>
}
