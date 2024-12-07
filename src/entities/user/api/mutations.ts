'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { createApiClientCSR } from '@/shared/lib/supabase-csr/index'
import { userQueryKeys } from '@/entities/user/api/consts'

export const useSignInWithEmail = () => {
  const queryClient = useQueryClient()
  const apiClient = createApiClientCSR()

  return useMutation<any, any, FormData>({
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

  return useMutation<any, any, FormData>({
    mutationFn: async (formData) => {
      const input = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }
      const { data, error } = await apiClient.signUpWithEmail(
        input.email,
        input.password,
      )

      if (error) {
        throw error
      }

      return data
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const apiClient = createApiClientCSR()

  return useMutation({
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
}
