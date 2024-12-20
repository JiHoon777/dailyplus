'use client'

import { useRouter } from 'next/navigation'
import { startTransition } from 'react'

import { Button } from '@/shared/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { refresh } = useRouter()

  console.log(18, error)
  return (
    <div>
      <Button
        onClick={() =>
          startTransition(() => {
            refresh()
            reset()
          })
        }
      >
        새로고침
      </Button>
    </div>
  )
}
