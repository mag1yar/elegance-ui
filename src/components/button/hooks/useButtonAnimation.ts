import { useAnimate } from 'framer-motion'
import { ButtonAnimation } from '../Button.types'
import { useCallback, useEffect } from 'react'

const getAnimationValues = (animation?: ButtonAnimation | boolean) => {
  if (typeof animation === 'boolean') {
    return {
      hover: animation,
      tap: animation,
    }
  }
  
  return {
    hover: animation?.hover ?? true,
    tap: animation?.tap ?? true,
  }
}

const useButtonAnimation = (
  animation?: ButtonAnimation | boolean,
  options?: { loading?: boolean }
) => {
  const { hover, tap } = getAnimationValues(animation)
  const { loading } = options || {}

  const [scope, animate] = useAnimate()

  const handleHoverStart = useCallback(() => {
    if (!hover || loading) return

    animate(
      scope.current,
      { scale: 1.05, opacity: 0.9 },
      { type: 'spring', stiffness: 400, damping: 17 }
    )
  }, [animate, scope, hover, loading])

  const handleHoverEnd = useCallback(() => {
    if (!hover || loading) return

    animate(
      scope.current,
      { scale: 1, opacity: 1 },
      { type: 'spring', stiffness: 400, damping: 17 }
    )
  }, [animate, scope, hover, loading])

  const handleTapStart = useCallback(() => {
    if (!tap || loading) return

    animate(scope.current, { scale: 0.95 }, { type: 'spring', stiffness: 400, damping: 17 })
  }, [animate, scope, tap, loading])

  const handleTapEnd = useCallback(() => {
    if (!tap || loading) return

    animate(scope.current, { scale: 1 }, { type: 'spring', stiffness: 400, damping: 17 })
  }, [animate, scope, tap, loading])

  useEffect(() => {
    if (loading) {
      const pulseAnimation = async () => {
        await animate(
          scope.current,
          { scale: [1, 1.05, 1] },
          { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
        )
      }
      pulseAnimation()
    } else {
      animate(scope.current, { scale: 1 })
    }
  }, [loading, animate, scope])

  return {
    scope,
    animate,
    handleHoverStart,
    handleHoverEnd,
    handleTapStart,
    handleTapEnd,
  }
}

export default useButtonAnimation
