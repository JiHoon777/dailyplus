'use client'
import { useUserStore } from '@/entities/user'

import { getGreetingByTime } from '../lib/getGreetingByTime'

export const HomeGreeting = () => {
  const user = useUserStore((state) => state.user)

  return (
    <div className={'w-full'}>
      <h2 className="mb-3 text-3xl font-bold">
        {user?.name ?? user?.email?.split('@')[0] ?? '유저'}님, 안녕하세요 👋
      </h2>
      <p className="text-lg font-semibold text-gray-600">
        {getGreetingByTime()}
      </p>
    </div>
  )
}
