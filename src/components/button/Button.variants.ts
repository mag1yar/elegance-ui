import styles from './Button.module.css'

import { cva } from 'class-variance-authority'

export const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      filled: styles.filled,
      outline: styles.outline,
      text: styles.text,
    },
  },
  defaultVariants: {
    variant: 'filled',
  },
})
