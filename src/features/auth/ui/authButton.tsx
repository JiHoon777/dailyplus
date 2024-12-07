'use client'

import { useUserStore } from '@/entities/user'
import { useOverlay } from '@/shared/lib/overlay'
import { Button } from '@/shared/ui'

import { LoginModal } from './loginModal'
import { UserDropdown } from './userDropdown'

export function AuthButton() {
  const user = useUserStore((state) => state.user)
  const { open } = useOverlay()

  const handleLogin = () => {
    open(({ isOpen, close }) => <LoginModal isOpen={isOpen} onClose={close} />)
  }

  if (user) {
    return <UserDropdown />
  }

  return (
    <Button variant="ghost" onClick={handleLogin}>
      로그인
    </Button>
  )
}
