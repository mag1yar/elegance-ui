import { ButtonHTMLAttributes } from 'react'
import { VariantProps } from 'class-variance-authority'
import { buttonVariants } from './Button.variants'
import { UseProps } from '../../hooks/use-props'

export type ButtonAnimation = {
  /** default `true` */
  hover?: boolean
  /** default `true` */
  tap?: boolean
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> &
  UseProps & {
    asChild?: boolean
    animation?: ButtonAnimation | boolean
  }
