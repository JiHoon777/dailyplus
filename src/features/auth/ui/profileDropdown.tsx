'use client'

import Image from 'next/image'
import { useState } from 'react'

import { useUserStore } from '@/entities/user'
import { Button } from '@/shared/ui'

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: user, isAuthenticated } = useUserStore()

  if (!isAuthenticated || !user) {
    return null
  }

  const handleLogout = () => {}

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="h-8 w-8 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        {user.profileImage ? (
          <Image
            src={user.profileImage}
            alt={user.name}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-sm font-medium text-purple-700">
            {user.name[0]}
          </div>
        )}
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
              {/* {logout.isPending ? '로그아웃 중...' : '로그아웃'} */}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
