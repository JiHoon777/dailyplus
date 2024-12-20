import { createBrowserClient } from '@supabase/ssr'

import { ApiClient } from '@/shared/api'
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from '@/shared/lib/supabase-config/consts'

const createClientCSR = () => {
  return createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
}

const createApiClientCSR = () => new ApiClient(createClientCSR())
export const ApiClientCSR = createApiClientCSR()
