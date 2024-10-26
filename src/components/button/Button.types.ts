import { ButtonHTMLAttributes } from 'react'
import { VariantProps } from 'class-variance-authority'
import { buttonVariants } from './Button.variants'

export type ButtonAnimation = {
  /** default `true` */
  hover?: boolean
  /** default `true` */
  tap?: boolean
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    animation?: ButtonAnimation | boolean
  }
