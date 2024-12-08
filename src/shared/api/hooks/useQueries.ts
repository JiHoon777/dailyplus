import type { IUser } from '@/shared/types/entity.types'

import { useQuery } from '@tanstack/react-query'

import { createApiClientCSR } from '@/shared/lib/supabase-csr'

export const queryKeys = {
  adminArticles: (page: number) => ['admin', 'articles', page] as const,
  getAuthUser: () => ['auth', 'session'] as const,
  getMe: () => ['users', 'me'] as const,
}

export const useGetAuthUser = () => {
  const apiClient = createApiClientCSR()

  return useQuery({
    queryFn: async () => {
      const { data, error } = await apiClient.getAuthUser()

      if (error) {
        throw error
      }

      return data.user
    },
    queryKey: queryKeys.getAuthUser(),
  })
}

export const useGetMe = (authUserid: undefined | string) => {
  const apiClient = createApiClientCSR()

  return useQuery<IUser | null>({
    enabled: !!authUserid,
    queryFn: async () => {
      if (!authUserid) return null

      const { data, error } = await apiClient.getUserEntity(authUserid)

      if (error) {
        throw error
      }

      return data
    },
    queryKey: queryKeys.getMe(),
  })
}

export const useGetArticles = (page: number) => {
  const apiClient = createApiClientCSR()

  return useQuery({
    gcTime: 0,
    queryFn: async () => {
      const { data, error } = await apiClient.admin.getArticles({ page })

      if (error) {
        throw error
      }

      return data
    },
    queryKey: queryKeys.adminArticles(page),
    staleTime: 0, // Remove data from cache immediately when unused
  })
}
