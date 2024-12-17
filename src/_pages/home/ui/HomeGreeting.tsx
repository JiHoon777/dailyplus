'use client'
import { useStore } from '@/shared/store'
import { getUsernameFromEmail } from '@/shared/lib/utils'

import { getGreetingByTime } from '../lib/getGreetingByTime'

export const HomeGreeting = () => {
  const user = useStore((state) => state.auth.me)

  return (
    <div className={'w-full'}>
      <h2 className="mb-3 text-3xl font-bold">
        {user?.name ?? getUsernameFromEmail(user?.email) ?? '유저'}님,
        안녕하세요 👋
      </h2>
      <p className="text-lg font-semibold text-gray-600">
        {getGreetingByTime()}
      </p>
    </div>
  )
}
