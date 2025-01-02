'use client'

import type { IApiClientAuthResponse } from '@/shared/api'
import type { AuthError } from '@supabase/supabase-js'
import type { FormEvent } from 'react'

import { useMutation } from '@tanstack/react-query'

import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { Button, DPLogoText, Input, Label, Spinner } from '@/shared/ui'

export default function SignInPage() {
  const signup = useMutation<IApiClientAuthResponse<'signup'>, Error, FormData>(
    {
      mutationFn: async (formData) => {
        const input = {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        }
        const res = await ApiClientCSR.auth.signup(input.email, input.password)
        console.log(43, res)

        return res
      },
    },
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    signup.mutate(formData, {
      onSuccess: () => {},
    })
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <DPLogoText />
      <form
        onSubmit={handleSubmit}
        className="flex min-w-[400px] flex-col gap-4"
      >
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
          <Button type="submit" disabled={signup.isPending}>
            {signup.isPending ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span>처리중...</span>
              </div>
            ) : (
              '회원가입'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
