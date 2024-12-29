import { AuthButton } from '@/features/auth'
import { SidebarFooter } from '@/shared/ui'

export const StudioSidebarFooter = () => {
  return (
    <SidebarFooter>
      <div className="flex items-center justify-center">
        <AuthButton />
      </div>
    </SidebarFooter>
  )
}
