'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { type FormEvent, useEffect } from 'react'

import { ApiClient, type IApiClientAuthResponse } from '@/shared/api'
import { DPLinks } from '@/shared/config'
import { useStore } from '@/shared/store'
import { Button, DPLogoText, Input, Label, Spinner } from '@/shared/ui'

export default function SignInPage() {
  const router = useRouter()
  const me = useStore('auth', (state) => state.me)
  const setMe = useStore('auth').getState().setMe

  useEffect(() => {
    if (me) {
      router.push(DPLinks.app.home())
    }
  }, [me, router])

  const signin = useMutation<IApiClientAuthResponse<'signin'>, Error, FormData>(
    {
      mutationFn: async (formData) => {
        const input = {
          email: formData.get('email') as string,
          password: formData.get('password') as string,
        }
        const res = await ApiClient.auth.signin(input.email, input.password)

        return res
      },
    },
  )

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    signin.mutate(formData, {
      onSuccess: (res) => setMe(res),
    })
  }

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-10">
      <DPLogoText />
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-[400px] flex-col gap-4"
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
              autoComplete="current-password"
              id="password"
              name="password"
              type="password"
              className="col-span-3"
              required
            />
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button type="submit" disabled={signin.isPending}>
            {signin.isPending ? (
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
    </div>
  )
}
