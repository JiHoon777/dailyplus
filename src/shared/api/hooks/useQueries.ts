/* eslint-disable react-hooks/rules-of-hooks */
import type { IUser } from '@/shared/types/entity.types'

import { useQuery } from '@tanstack/react-query'

import { createApiClientCSR } from '@/shared/lib/supabase-csr'

const queryKeys = {
  adminArticles: (page: number) => ['admin', 'articles', page] as const,
  getAuthUser: () => ['auth', 'session'] as const,
  getMe: () => ['users', 'me'] as const,
}

export const useAppQueries = Object.assign(
  {},
  {
    getAuthUser,
    getMe,
    queryKeys,
  },
)

const apiClient = createApiClientCSR()

function getAuthUser() {
  return useQuery({
    queryFn: async () => {
      const { data, error } = await apiClient.auth.getAuthUser()

      if (error) {
        throw error
      }

      return data.user
    },
    queryKey: queryKeys.getAuthUser(),
  })
}

function getMe(authUserid: undefined | string) {
  return useQuery<IUser | null>({
    enabled: !!authUserid,
    queryFn: async () => {
      if (!authUserid) return null

      const { data, error } = await apiClient.auth.getUserEntity(authUserid)

      if (error) {
        throw error
      }

      return data
    },
    queryKey: queryKeys.getMe(),
  })
}
