'use client'

import { useMutation } from '@tanstack/react-query'

import { createApiClientCSR } from '@/shared/lib/supabase-csr/index'

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

export const useLogout = () => {}

// export const useLogout = () => {
//   const queryClient = useQueryClient()
//   const clearUser = useUserStore((state) => state.clearUser)

//   return useMutation({
//     mutationFn: async () => {
//       const { error } = await supabase.auth.signOut()
//       if (error) throw error
//     },
//     onSuccess: () => {
//       clearUser()
//       queryClient.setQueryData(authKeys.currentUser(), null)
//     },
//   })
// }
