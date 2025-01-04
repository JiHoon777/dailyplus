import { redirect } from 'next/navigation'

import { ApiClient } from '@/shared/api'

export default async function SignoutPage() {
  await ApiClient.auth.signout()

  redirect('/auth/signin')
}
