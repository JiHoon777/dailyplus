'use client'

import type { AuthError, AuthResponse } from '@supabase/supabase-js'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { userQueryKeys } from '@/entities/user/api/consts'
import { handleSupabaseRes } from '@/shared/lib/supabase-common'
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
      const res = await apiClient.loginWithEmail(input.email, input.password)

      return handleSupabaseRes(res)
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

      return handleSupabaseRes({ data: null, error })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const apiClient = createApiClientCSR()

  return useMutation<null, AuthError, void>({
    mutationFn: async () => {
      const { error } = await apiClient.logout()

      return handleSupabaseRes({ data: null, error })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: userQueryKeys.session(),
      })
    },
  })
}
