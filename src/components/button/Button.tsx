import { forwardRef } from 'react'
import { ButtonProps } from './Button.types'
import clsx from 'clsx'
import { buttonVariants } from './Button.variants'
import { Slot } from '@radix-ui/react-slot'
import { useMergeRefs } from '../../hooks'
import { useButtonAnimation } from './hooks'

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    asChild,
    className,
    variant,
    animation,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    ...rest
  } = props

  const Comp = asChild ? Slot : 'button'

  const { scope, handleHoverStart, handleHoverEnd, handleTapStart, handleTapEnd } =
    useButtonAnimation(animation)

  const mergedRef = useMergeRefs(ref, scope)

  return (
    <Comp
      {...rest}
      ref={mergedRef}
      className={clsx(buttonVariants({ className, variant }))}
      onMouseEnter={(e) => {
        handleHoverStart()
        onMouseEnter?.(e)
      }}
      onMouseLeave={(e) => {
        handleHoverEnd()
        onMouseLeave?.(e)
      }}
      onMouseDown={(e) => {
        handleTapStart()
        onMouseDown?.(e)
      }}
      onMouseUp={(e) => {
        handleTapEnd()
        onMouseUp?.(e)
      }}
    />
  )
})

Button.displayName = '@mag1yar/elegance-ui/Button'

export default Button
