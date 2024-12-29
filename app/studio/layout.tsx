'use client'

import { redirect } from 'next/navigation'

import { useDPStore } from '@/shared/store'
import { SidebarInset } from '@/shared/ui'

import { StudioSidebar } from './_ui'

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const me = useDPStore((state) => state.auth.me)

  if (!me) {
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
