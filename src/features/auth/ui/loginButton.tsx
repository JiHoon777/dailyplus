'use client'

import { useState } from 'react'

import { useUserStore } from '@/entities/user'
import { useOverlay } from '@/shared/lib/overlay'
import { Button } from '@/shared/ui'

import { LoginModal } from './loginModal'

export function LoginButton() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated)
  const { open } = useOverlay()

  const handleLogin = () => {
    open(({ isOpen, close }) => <LoginModal isOpen={isOpen} onClose={close} />)
  }

  if (isAuthenticated) {
    return null
  }

  return (
    <>
      <Button variant="outline" onClick={handleLogin}>
        로그인
      </Button>
    </>
  )
}
