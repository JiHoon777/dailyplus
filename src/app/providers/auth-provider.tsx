'use client'
import { useEffect, useState } from 'react'

import { useGetAuthUser, useGetUser, useUserStore } from '@/entities/user'
import { ScreenLoading } from '@/shared/ui'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((state) => state.setUser)
  const [isLoading, setIsLoading] = useState(true)

  // 1. Auth 세션 정보 가져오기
  const {
    data: authUser,
    error: authError,
    isLoading: isAuthLoading,
  } = useGetAuthUser()
  // 2. Auth ID로 User 엔티티 가져오기
  const {
    data: userEntity,
    error: userError,
    isLoading: isUserLoading,
  } = useGetUser(authUser?.id)

  console.group('AuthProvider')
  console.log('authUser: ', authUser)
  console.log('userEntity: ', userEntity)
  console.groupEnd()

  // User 엔티티 정보가 변경될 때마다 store 업데이트
  useEffect(() => {
    if (!isAuthLoading && !isUserLoading) {
      setIsLoading(false)
      setUser(userEntity)
    }
  }, [userEntity, isAuthLoading, isUserLoading, setUser])

  useEffect(() => {
    if (authError || userError) {
      setIsLoading(false)
      setUser(null)
    }
  }, [authError, userError, setUser])

  if (isLoading) {
    return <ScreenLoading /> // 또는 로딩 컴포넌트
  }

  return children
}
