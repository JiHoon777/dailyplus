import { AuthButton } from '@/features/auth'
import { SidebarTrigger } from '@/shared/ui'

export const AdminHeaderBase = () => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <AuthButton />
    </header>
  )
}
