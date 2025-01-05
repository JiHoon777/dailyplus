import { useEffect } from 'react'

export const Debounce = ({
  value,
  delay,
  onDebounce,
}: {
  value: any
  delay: number
  onDebounce: (value: any) => void
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDebounce(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay, onDebounce])

  return null
}
