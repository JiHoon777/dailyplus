/* eslint-disable react-hooks/rules-of-hooks */
import type { AuthError, AuthResponse } from '@supabase/supabase-js'

import { useMutation } from '@tanstack/react-query'

import { createApiClientCSR } from '@/shared/lib/supabase-csr'

export const useAppMutations = Object.assign(
  {},
  {
    logout,
    signInWithEmail,
    signUpWithEmail,
  },
)

function signInWithEmail() {
  return useMutation<AuthResponse['data'], AuthError, FormData>({
    mutationFn: async (formData) => {
      const apiClient = createApiClientCSR()
      const input = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }
      const { data, error } = await apiClient.auth.loginWithEmail(
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

function signUpWithEmail() {
  return useMutation<null, AuthError, FormData>({
    mutationFn: async (formData) => {
      const apiClient = createApiClientCSR()
      const input = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      }
      const { error } = await apiClient.auth.signUpWithEmail(
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

function logout() {
  return useMutation({
    mutationFn: async () => {
      const apiClient = createApiClientCSR()
      const { error } = await apiClient.auth.logout()

      if (error) {
        throw error
      }
    },
  })
}
