import { SidebarProvider } from '@/shared/ui/sidebar'

export const UiProvider = ({ children }: { children: React.ReactNode }) => {
  return <SidebarProvider>{children}</SidebarProvider>
}
