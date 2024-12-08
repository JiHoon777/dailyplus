import type { AuthError, AuthResponse } from '@supabase/supabase-js'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createApiClientCSR } from '@/shared/lib/supabase-csr'

import { userQueryKeys } from './consts'

export const useMutations = () => {
  const queryClient = useQueryClient()
  const apiClient = createApiClientCSR()

  const signInWithEmail = useMutation<
    AuthResponse['data'],
    AuthError,
    FormData
  >({
    mutationFn: async (formData) => {
      const input = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }
      const { data, error } = await apiClient.loginWithEmail(
        input.email,
        input.password,
      )

      if (error) {
        throw error
      }

      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.session(),
      })
    },
  })

  const signUpWithEmail = useMutation<null, AuthError, FormData>({
    mutationFn: async (formData) => {
      const input = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }
      const { error } = await apiClient.signUpWithEmail(
        input.email,
        input.password,
      )

      if (error) {
        throw error
      }

      return null
    },
  })

  const logout = useMutation({
    mutationFn: async () => {
      const { error } = await apiClient.logout()

      if (error) {
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.session(),
      })
    },
  })

  return { logout, signInWithEmail, signUpWithEmail }
}
