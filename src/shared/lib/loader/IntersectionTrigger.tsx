import { useEffect, useRef } from 'react'

interface IntersectionTriggerProps {
  onIntersect: () => void
  hasNextPage?: boolean
  isLoading?: boolean
}

export const IntersectionTrigger = ({
  onIntersect,
  hasNextPage = false,
  isLoading = false,
}: IntersectionTriggerProps) => {
  const observerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isLoading) {
          onIntersect()
        }
      },
      { threshold: 0.5 },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => observer.disconnect()
  }, [onIntersect, hasNextPage, isLoading])

  return <div ref={observerRef} />
}
