import { useCallback } from 'react'

/**
 * A hook for merging multiple React refs into a single ref callback function.
 *
 * @template T - The type of the element that the refs are referring to.
 * @param {...(React.Ref<T> | undefined)} refs - The list of refs to be merged.
 * @returns {React.RefCallback<T>} A ref callback function that updates all provided refs.
 *
 * @example
 * function MyComponent() {
 *   const ref1 = useRef(null);
 *   const ref2 = useRef(null);
 *   const mergedRef = useMergeRefs(ref1, ref2);
 *
 *   return <div ref={mergedRef}>Hello, world!</div>;
 * }
 */
export function useMergeRefs<T = any>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return useCallback((value) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref != null) {
        ;(ref as React.MutableRefObject<T | null>).current = value
      }
    })
  }, refs)
}
