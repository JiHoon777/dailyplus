'use client' // Error boundaries must be Client Components

import type { PostgrestError } from '@supabase/supabase-js'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="w-full rounded-lg border border-red-100 bg-red-50 p-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="text-sm text-red-600">
          데이터를 불러오는 중 문제가 발생했습니다. :
        </p>
        <div>{errorToTexts(error)}</div>
        <button
          onClick={() => reset()}
          className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-600 hover:bg-red-200"
        >
          다시 시도
        </button>
        <Link
          href="/home"
          className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </div>
  )
}

function isPostgrestError(error: Error): error is PostgrestError {
  return 'hint' in error && 'details' in error && 'code' in error
}

function errorToTexts(error: Error) {
  if (isPostgrestError(error)) {
    return (
      <>
        <p>message: {error.message}</p>
        <p>hint: {error.hint}</p>
        <p>details: {error.details}</p>
        <p>code: {error.code}</p>
      </>
    )
  }

  return error.message ?? ''
}
