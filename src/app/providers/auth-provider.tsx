'use client'

import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { useUserStore } from '@/entities/user'
import { createApiClientCSR } from '@/shared/lib/supabase-csr/index'

// Auth 관련 쿼리 키
const authKeys = {
  session: () => ['auth', 'session'] as const,
  user: (authId: string) => ['users', authId] as const,
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useUserStore((state) => state.setUser)
  const apiClient = createApiClientCSR()

  // 1. Auth 세션 정보 가져오기
  const { data: authUser } = useQuery({
    queryFn: async () => {
      const { data, error } = await apiClient.getAuthUser()

      if (error) {
        setUser(null)
        throw error
      }

      return data.user
    },
    queryKey: authKeys.session(),
  })

  // 2. Auth ID로 User 엔티티 가져오기
  const { data: userEntity } = useQuery({
    enabled: !!authUser?.id,
    queryFn: async () => {
      if (!authUser?.id) return null

      const { data, error } = await apiClient.getUserEntity(authUser.id)

      if (error) {
        setUser(null)
        throw error
      }

      return data
    },
    queryKey: authKeys.user(authUser?.id ?? ''),
  })

  console.log('authUser: ', authUser)
  console.log('userEntity: ', userEntity)
  // User 엔티티 정보가 변경될 때마다 store 업데이트
  useEffect(() => {
    setUser(userEntity)
  }, [userEntity, setUser])

  return children
}
