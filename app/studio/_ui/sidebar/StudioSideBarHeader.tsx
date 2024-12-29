import Link from 'next/link'

import { cn } from '@/shared/lib/utils'
import {
  DPLogoText,
  SidebarHeader,
  SidebarTrigger,
  useSidebar,
} from '@/shared/ui'

export const StudioSidebarHeader = () => {
  const { open, toggleSidebar } = useSidebar()
  return (
    <SidebarHeader>
      <div className="flex items-center justify-between px-2">
        <Link
          href={'/studio'}
          className={cn(!open && 'fixed left-4 top-2')}
          onMouseOver={() => !open && toggleSidebar()}
        >
          <DPLogoText />
        </Link>
        <SidebarTrigger />
      </div>
    </SidebarHeader>
  )
}
