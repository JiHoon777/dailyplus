import { SidebarTrigger } from '@/shared/ui'

export const MoStudioSidebarHeader = () => {
  return (
    <header className="sticky top-0 z-10 flex shrink-0 flex-col gap-2 border-b px-4 py-2 backdrop-blur-lg md:hidden">
      <SidebarTrigger />
    </header>
  )
}
