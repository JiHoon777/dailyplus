import { createBrowserClient } from '@supabase/ssr'

import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from './const'

export function createClientCSR() {
  return createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
}
