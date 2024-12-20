'use client'

import type { AuthError, AuthResponse } from '@supabase/supabase-js'
import type { FormEvent } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DpQueryKeys } from '@/shared/api'
import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { Button, Input, Label, ModalOverlay, Spinner } from '@/shared/ui'

export function LoginModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const queryClient = useQueryClient()
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
      const { data, error } = await ApiClientCSR.auth.loginWithEmail(
        input.email,
        input.password,
      )

      if (error) {
        throw error
      }

      return data
    },
  })

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    signInWithEmail.mutate(formData, {
      onSuccess: () => {
        onClose()
        queryClient.invalidateQueries({
          queryKey: DpQueryKeys.auth.getAuthUser(),
        })
      },
    })
  }

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose} closeOnClickOutside>
      <form
        onSubmit={handleSubmit}
        className="flex min-w-[400px] flex-col gap-4 p-6"
      >
        <h2 className="mb-4 text-xl font-semibold">로그인</h2>
        <div className="grid gap-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-left">
              이메일
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-left">
              비밀번호
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              className="col-span-3"
              required
            />
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button type="submit" disabled={signInWithEmail.isPending}>
            {signInWithEmail.isPending ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span>처리중...</span>
              </div>
            ) : (
              '로그인'
            )}
          </Button>
        </div>
      </form>
    </ModalOverlay>
  )
}

// function signUpWithEmail() {
//   return useMutation<null, AuthError, FormData>({
//     mutationFn: async (formData) => {
//       const input = {
//         email: formData.get('email') as string,
//         password: formData.get('password') as string,
//       }
//       const { error } = await ApiClientCSR.auth.signUpWithEmail(
//         input.email,
//         input.password,
//       )

//       if (error) {
//         throw error
//       }

//       return null
//     },
//   })
// }
