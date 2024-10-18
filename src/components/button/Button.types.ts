import { ButtonHTMLAttributes } from 'react'
import { VariantProps } from 'class-variance-authority'
import { buttonVariants } from './Button.variants'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }
