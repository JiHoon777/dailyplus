'use client'
import { OverlayProvider } from '@/shared/lib/overlay'
import { SidebarProvider } from '@/shared/ui/sidebar'

export const UiProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <OverlayProvider>{children}</OverlayProvider>
    </SidebarProvider>
  )
}
