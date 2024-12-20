// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { type CookieOptions, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

import { ApiClient } from '@/shared/api'
import {
  PUBLIC_SUPABASE_ANON_KEY,
  PUBLIC_SUPABASE_URL,
} from '@/shared/lib/supabase-config/consts'

async function createClientSSR() {
  const cookieStore = await cookies()

  return createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // setAll 메서드가 서버 컴포넌트에서 호출되었습니다.
          // 미들웨어에서 사용자 세션을 새로고침하는 경우 이 오류는 무시해도 됩니다.
        }
      },
    },
  })
}

export const createApiClientSSR = async () =>
  new ApiClient(await createClientSSR())
export const ApiClientSSR = createApiClientSSR()
