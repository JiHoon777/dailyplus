'use client'

import { LogOut, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useLogout, useUserStore } from '@/entities/user'
import { Button } from '@/shared/ui'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { getUsernameFromEmail } from '@/shared/utils'

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const user = useUserStore((state) => state.user)
  const logout = useLogout()
  const router = useRouter()

  const handleLogout = () => logout.mutate()
  const handleAdmin = () => router.push('/admin/posts')
  if (!user) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" onClick={() => setIsOpen(!isOpen)}>
          {user.name ?? getUsernameFromEmail(user.email)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          <span>로그아웃</span>
        </DropdownMenuItem>
        {user.role === 'admin' && (
          <DropdownMenuItem onClick={handleAdmin}>
            <Settings />
            <span>어드민</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
