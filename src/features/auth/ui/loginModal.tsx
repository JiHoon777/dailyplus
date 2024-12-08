'use client'

import type { FormEvent } from 'react'

import { useQueryClient } from '@tanstack/react-query'

import { queryKeys, useMutations } from '@/shared/api'
import { useOverlay } from '@/shared/lib/overlay'
import { Button, Input, Label, ModalOverlay, Spinner } from '@/shared/ui'

export function LoginModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const queryClient = useQueryClient()
  const { signInWithEmail } = useMutations()
  const { close } = useOverlay()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    signInWithEmail.mutate(formData, {
      onSuccess: () => {
        close()
        queryClient.invalidateQueries({
          queryKey: queryKeys.getAuthUser(),
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
          <Button type="submit" disabled={signIn.isPending}>
            {signIn.isPending ? (
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
