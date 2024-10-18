// import styles from './Button.module.css'

import { forwardRef } from 'react'
import { ButtonProps } from './Button.types'
import clsx from 'clsx'
import { buttonVariants } from './Button.variants'
import { Slot } from '@radix-ui/react-slot'

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const { asChild, className, variant, size, ...rest } = props

  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      {...rest}
      ref={ref}
      className={clsx(buttonVariants({ className, variant, size }))}
    />
  )
})

Button.displayName = '@mag1yar/elegance-ui/Button'

export default Button
