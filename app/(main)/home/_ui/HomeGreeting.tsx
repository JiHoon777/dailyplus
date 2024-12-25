'use client'
import { getUsernameFromEmail } from '@/shared/lib/utils'
import { useDPStore } from '@/shared/store'

import { getGreetingByTime } from '../_lib'

export const HomeGreeting = () => {
  const user = useDPStore((state) => state.auth.me)

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
