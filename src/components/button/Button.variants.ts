import styles from './Button.module.css'

import { cva } from 'class-variance-authority'

export const buttonVariants = cva(styles.button, {
  variants: {
    variant: {
      default: '',
    },
    size: {
      default: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})
