'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { ApiClient, DpQueryKeys } from '@/shared/api'
import { useStore } from '@/shared/store'
import { ScreenLoading } from '@/shared/ui'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setMe = useStore('auth', (state) => state.setMe)
  const [isLoaded, setIsLoaded] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryFn: async () => ApiClient.auth.getAuthUser(),
    queryKey: DpQueryKeys.auth.getAuthUser(),
  })

  useEffect(() => {
    if (error) {
      console.log('AuthProvider error: ', error)
    }
    setMe(data ?? null)

    setIsLoaded(true)
  }, [setMe, isLoading, data, error])

  if (!isLoaded) {
    return <ScreenLoading />
  }

  return children
}
