import { forwardRef } from 'react'
import { ButtonProps } from './Button.types'
import { useButtonStyles } from './Button.variants'
import { Slot } from '@radix-ui/react-slot'
import { useMergeRefs, useProps } from '../../hooks'
import { useButtonAnimation } from './hooks'

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    asChild,
    className,
    style,
    variant,
    animation,
    onMouseEnter,
    onMouseLeave,
    onMouseDown,
    onMouseUp,
    size,
    ...rest
  } = useProps('Button', props)

  const Comp = asChild ? Slot : 'button'

  const variants = useButtonStyles({ className, style, size, variant })

  const { scope, handleHoverStart, handleHoverEnd, handleTapStart, handleTapEnd } =
    useButtonAnimation(animation)

  const mergedRef = useMergeRefs(ref, scope)

  return (
    <Comp
      {...rest}
      ref={mergedRef}
      className={variants.className}
      style={variants.style}
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
