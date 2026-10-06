import { useEffect, useRef } from 'react'

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
  const [, forceUpdate] = require('react').useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    if (typeof IntersectionObserver === 'undefined') {
      inViewRef.current = true
      forceUpdate((v: boolean) => !v)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            inViewRef.current = true
            forceUpdate((v: boolean) => !v)
            if (once) observer.disconnect()
          } else if (!once) {
            inViewRef.current = false
            forceUpdate((v: boolean) => !v)
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
