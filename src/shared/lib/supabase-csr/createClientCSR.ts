import { createBrowserClient } from '@supabase/ssr'

import { ApiClient } from '@/shared/api'
import { DPEnvs } from '@/shared/config'

const createClientCSR = () => {
  return createBrowserClient(DPEnvs.SUPABASE_URL, DPEnvs.SUPABASE_ANON_KEY)
}

const createApiClientCSR = () => new ApiClient(createClientCSR())
export const ApiClientCSR = createApiClientCSR()
