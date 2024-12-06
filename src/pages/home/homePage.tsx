'use client'

import { PageBase } from '@/shared/ui/appLayout/pageBase'

import { quickStartItems } from './constants/quickStartItems'
import { HomeGreeting } from './ui/homeGreeting'
import { QuickStart } from './ui/quickStart'

export const HomePage = () => {
  return (
    <PageBase className={'gap-6'}>
      <HomeGreeting />
      <QuickStart items={quickStartItems} />
    </PageBase>
  )
}
