import { useEffect, useRef, useState } from 'react'

interface UseInViewOptions {
  threshold?: number
  once?: boolean
  rootMargin?: string
}

export function useInView<T extends HTMLElement>(
  options: UseInViewOptions = {}
): [React.RefObject<T>, boolean] {
  const { threshold = 0.15, once = true, rootMargin = '0px 0px -60px 0px' } = options
  const ref = useRef<T>(null)
  const inViewRef = useRef(false)
  const [, setTick] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (typeof IntersectionObserver === 'undefined') {
      inViewRef.current = true
      setTick((v) => v + 1)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            inViewRef.current = true
            setTick((v) => v + 1)
            if (once) observer.disconnect()
          } else if (!once) {
            inViewRef.current = false
            setTick((v) => v + 1)
          }
        })
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, once, rootMargin])

  return [ref, inViewRef.current] as [React.RefObject<T>, boolean]
}
