import Link from 'next/link'

import { AuthButton } from '@/features/auth'
import { DPLogoText } from '@/shared/ui'

export const DPHeader = () => {
  return (
    <div className="sticky top-0 z-10 flex w-screen justify-center border-b border-gray-100 bg-white/70 px-6 py-4 backdrop-blur-lg">
      <div className="flex w-full max-w-screen-xl items-center justify-between">
        <Link href={'/'}>
          <DPLogoText />
        </Link>
        <div>
          <AuthButton />
        </div>
      </div>
    </div>
  )
}
