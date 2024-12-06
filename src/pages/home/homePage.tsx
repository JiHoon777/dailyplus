'use client'

import { quickStartItems } from './constants/quickStartItems'
import { HomeGreeting } from './ui/HomeGreeting'
import { HomeHeader } from './ui/HomeHeader'
import { QuickStart } from './ui/QuickStart'

export const HomePage = () => {
  return (
    <div className="h-screen w-screen overflow-y-auto bg-background">
      <HomeHeader />
      <div className="mx-auto max-w-screen-xl space-y-10 p-7">
        <HomeGreeting />
        <QuickStart items={quickStartItems} />
      </div>
    </div>
  )
}
