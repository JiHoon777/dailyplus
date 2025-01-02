import { redirect } from 'next/navigation'

import { createApiClientSSR } from '@/shared/lib/supabase-ssr'

export default async function SignoutPage() {
  const apiClient = await createApiClientSSR()
  await apiClient.auth.signout()

  redirect('/auth/signin')
}
