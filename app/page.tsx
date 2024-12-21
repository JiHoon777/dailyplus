import { redirect } from 'next/navigation'

import { DPLinks } from '@/shared/config'

export default async function Home() {
  redirect(DPLinks.app.home())

  return <></>
}
