import { redirect } from 'next/navigation'

import { DPLinks } from '@/shared/config'

export default function StudioPage() {
  redirect(DPLinks.studio.new)

  return null
}
