'use client'

import { useState } from 'react'

import { Button, Input, ModalOverlay } from '@/shared/ui'

export function LoginModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose} closeOnClickOutside>
      <div className="p-6">
        <h2 className="mb-4 text-xl font-semibold">로그인</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">이메일</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">비밀번호</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* {login.error && (
            <p className="text-sm text-red-500">
              로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.
            </p>
          )} */}
          {/* <Button type="submit" className="w-full" disabled={login.isPending}> */}
          {/* {login.isPending ? '로그인 중...' : '로그인'} */}
          {/* </Button> */}
        </form>
      </div>
    </ModalOverlay>
  )
}
