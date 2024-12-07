'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError: (error) => {
              toast.error('error: ' + (error?.message ?? JSON.stringify(error)))
            },
          },
          queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 5000,
          },
        },
      }),
  )

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}
