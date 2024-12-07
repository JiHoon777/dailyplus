'use client'

import type { AuthError, AuthResponse } from '@supabase/supabase-js'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { userQueryKeys } from '@/entities/user/api/consts'
import { createApiClientCSR } from '@/shared/lib/supabase-csr/index'

export const useSignInWithEmail = () => {
  const queryClient = useQueryClient()
  const apiClient = createApiClientCSR()

  return useMutation<AuthResponse['data'], AuthError, FormData>({
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
}

export const useSignUpWithEmail = () => {
  const apiClient = createApiClientCSR()

  return useMutation<null, AuthError, FormData>({
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
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const apiClient = createApiClientCSR()

  return useMutation<null, AuthError, void>({
    mutationFn: async () => {
      const { error } = await apiClient.logout()

      if (error) {
        throw error
      }

      return null
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.session(),
      })
    },
  })
}
