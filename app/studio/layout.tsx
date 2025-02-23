'use client'

import { redirect } from 'next/navigation'

import { useStore } from '@/shared/store'
import { SidebarInset } from '@/shared/ui'

import { StudioSidebar } from './_ui'

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const canAccess = useStore('auth', (state) => state.hasAiPromptAccess)

  if (!canAccess) {
    redirect('/')
    return null
  }

  return (
    <div className="flex w-full flex-col md:flex-row">
      <StudioSidebar />
      <SidebarInset className="items-center">{children}</SidebarInset>
    </div>
  )
}
