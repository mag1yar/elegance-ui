import { createStyles, toCssUnit } from '../../utils'
import styles from './Button.module.css'
import { ButtonStyles } from './Button.types'

export const useButtonStyles = createStyles<ButtonStyles>(styles.button, {
  variant: {
    variants: {
      filled: styles.variant_filled,
      outline: styles.variant_outline,
      text: styles.variant_text,
    },
    defaultValue: 'filled',
  },
  size: {
    variants: {
      xxs: styles.size_xxs,
      xs: styles.size_xs,
      sm: styles.size_sm,
      md: styles.size_md,
      lg: styles.size_lg,
      xl: styles.size_xl,
      xxl: styles.size_xxl,
    },
    defaultValue: 'xs',
    transform: (value: string | number) => {
      const unit = toCssUnit(value)

      return {
        style: {
          '--button-padding-x': unit,
          '--button-padding-y': `calc(${unit} / 2)`,
          '--button-font-size': `calc(12px + (${unit} - 8px) / 4 * 2)`,
          '--button-icon-size': `calc(1rem + (${unit} - 8px) / 1.65)`,
        },
      }
    },
  },
})
