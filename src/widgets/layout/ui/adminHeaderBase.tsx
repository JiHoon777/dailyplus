import { AuthButton } from '@/features/auth'
import { SidebarTrigger } from '@/shared/ui'

export const AdminHeaderBase = () => {
  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4 backdrop-blur-lg">
      <SidebarTrigger className="-ml-1" />
      <AuthButton />
    </header>
  )
}
