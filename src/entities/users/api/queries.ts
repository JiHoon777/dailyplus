import type { IUser } from '@/shared/model/entity.types'

import { useQuery } from '@tanstack/react-query'

import { userQueryKeys } from '@/entities/users/api/consts'
import { createApiClientCSR } from '@/shared/lib/supabase-csr'

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
    queryKey: userQueryKeys.session(),
  })
}

export const useGetUser = (authUserid: undefined | string) => {
  const apiClient = createApiClientCSR()

  return useQuery<IUser | null>({
    enabled: false,
    queryFn: async () => {
      if (!authUserid) return null

      const { data, error } = await apiClient.getUserEntity(authUserid)

      if (error) {
        throw error
      }

      return data
    },
    queryKey: userQueryKeys.user(authUserid ?? ''),
  })
}
