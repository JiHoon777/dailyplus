import { redirect } from 'next/navigation'

import { createApiClientSSR } from '@/shared/lib/supabase-ssr'

export default async function LogoutPage() {
  const apiClient = await createApiClientSSR()
  await apiClient.auth.logout()
  redirect('/')
}
