'use client'

import { useState } from 'react'

import { useLogout, useUserStore } from '@/entities/user'
import { Badge, Button } from '@/shared/ui'

export function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const user = useUserStore((state) => state.user)
  const logout = useLogout()

  if (!user) {
    return null
  }

  const handleLogout = () => logout.mutate()

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="h-8 w-8 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Badge variant={'outline'}>
          {user.name ?? user.email?.slice(0, 3)}
        </Badge>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="px-4 py-2">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          <div className="border-t border-gray-100">
            <button
              onClick={handleLogout}
              // disabled={logout.isPending}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
