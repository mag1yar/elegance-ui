import { ButtonHTMLAttributes } from 'react'
import { UseProps } from '../../hooks/use-props'

export type ButtonAnimation = {
  /** default `true` */
  hover?: boolean
  /** default `true` */
  tap?: boolean
}

export type ButtonStyles = {
  variant: 'text' | 'filled' | 'outline' | null | undefined
  size: 'xxs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | (string & {}) | (number & {})
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  Partial<ButtonStyles> &
  UseProps & {
    asChild?: boolean
    animation?: ButtonAnimation | boolean
  }
