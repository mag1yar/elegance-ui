import clsx from 'clsx'
import {
  CreateStylesConfig,
  CreateStylesProps,
  ExtractVariantValues,
  PropertyConfig,
  StyleResult,
} from './createStyles.types'
import { CSSProperties, useMemo } from 'react'

export function createStyles<Props extends Record<string, any>>(
  base: string,
  config: CreateStylesConfig<Props>
) {
  const computeStyles = (props: Partial<CreateStylesProps<Props>>): StyleResult => {
    const classNames: string[] = [base, props.className || '']
    let dynamicStyles: CSSProperties = { ...props.style }

    ;(Object.entries(config) as Array<[keyof Props, PropertyConfig<Props[keyof Props]>]>).forEach(
      ([key, propertyConfig]) => {
        const value = props[key]
        const valueToProcess = value === undefined ? propertyConfig.defaultValue : value

        if (valueToProcess !== undefined && valueToProcess !== null) {
          if (
            propertyConfig.variants &&
            typeof valueToProcess === 'string' &&
            valueToProcess in propertyConfig.variants
          ) {
            const variantClass =
              propertyConfig.variants[valueToProcess as ExtractVariantValues<typeof valueToProcess>]
            classNames.push(variantClass)
          } else if (propertyConfig.transform) {
            const result = propertyConfig.transform(valueToProcess as Props[typeof key])
            classNames.push(result.className || '')
            if (result.style) {
              dynamicStyles = { ...dynamicStyles, ...result.style }
            }
          }
        }
      }
    )

    return {
      className: clsx(...classNames),
      style: Object.keys(dynamicStyles).length > 0 ? dynamicStyles : undefined,
    }
  }

  const useStyles = (props: Partial<CreateStylesProps<Props>>): StyleResult => {
    return useMemo(
      () => computeStyles(props),
      [props.className, props.style, ...Object.keys(config).map((key) => props[key as keyof Props])]
    )
  }

  return useStyles
}
