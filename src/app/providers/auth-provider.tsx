'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { DpQueryKeys } from '@/shared/api'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { useStore } from '@/shared/store'
import { ScreenLoading } from '@/shared/ui'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const setAuthUser = useStore((state) => state.auth.setMe)
  const [isLoaded, setIsLoaded] = useState(false)

  // 1. Auth 세션 정보 가져오기
  const {
    data: authUser,
    error: authError,
    isLoading: isAuthLoading,
  } = useQuery({
    queryFn: async () => {
      const { data, error } = await ApiClientCSR.auth.getAuthUser()

      if (error) {
        throw error
      }

      return data
    },
    queryKey: DpQueryKeys.auth.getAuthUser(),
  })

  // 2. Auth ID로 User 엔티티 가져오기
  const { refetch: refetchUser } = useQuery({
    enabled: false,
    queryFn: async () => {
      if (!authUser) {
        return null
      }

      const { data, error } = await ApiClientCSR.auth.getUserEntity(authUser.id)

      if (error) {
        throw error
      }

      return data
    },
    queryKey: DpQueryKeys.auth.getMe(),
  })

  // Auth 상태 변경 감지 및 처리
  useEffect(() => {
    if (isAuthLoading) return

    // 1. 인증 에러가 있는 경우
    if (authError) {
      // AuthSessionMissingError는 정상적인 로그아웃 상태
      if (authError.message === 'Auth session missing!') {
        setAuthUser(null)
        setIsLoaded(true)
        return
      }

      // 다른 인증 에러의 경우 로그아웃 처리
      setAuthUser(null)
      router.push('/auth/logout')
      return
    }

    // 2. 인증된 유저가 없는 경우 (로그아웃 상태)
    if (!authUser) {
      setAuthUser(null)
      setIsLoaded(true)
      return
    }

    // 3. 인증된 유저가 있는 경우
    refetchUser().then(({ data, error }) => {
      if (error) {
        setAuthUser(null)
        router.push('/auth/logout')
        return
      }
      setAuthUser(data ?? null)
      setIsLoaded(true)
    })
  }, [authUser, authError, isAuthLoading, router, setAuthUser, refetchUser])

  if (!isLoaded) {
    return <ScreenLoading />
  }

  return children
}
