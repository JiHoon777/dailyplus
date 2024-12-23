import { createServerClient } from '@supabase/ssr'
import { type NextRequest, NextResponse } from 'next/server'

import { DPEnvs } from '@/shared/config'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  createServerClient(DPEnvs.SUPABASE_URL, DPEnvs.SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options: _option }) =>
          request.cookies.set(name, value),
        )
        supabaseResponse = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        )
      },
    },
  })

  // 중요: createServerClient와 supabase.auth.getUser() 사이에 어떤 로직도 작성하지 마세요.
  // 사소한 실수로 인해 사용자가 무작위로 로그아웃되는 문제를 디버깅하기 매우 어려울 수 있습니다.
  // NOTE: Public access is currently allowed for all routes
  // Authentication check is disabled to allow non-authenticated users to view content
  // For protected routes, consider implementing route-specific authentication

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()

  // if (
  //   !user &&
  //   !request.nextUrl.pathname.startsWith('/login') &&
  //   !request.nextUrl.pathname.startsWith('/auth')
  // ) {
  //   // no user, potentially respond by redirecting the user to the login page
  //   const url = request.nextUrl.clone()
  //   url.pathname = '/home'
  //   return NextResponse.redirect(url)
  // }

  // 중요: supabaseResponse 객체를 반드시 있는 그대로 반환해야 합니다.
  // NextResponse.next()로 새로운 응답 객체를 생성하는 경우 다음 사항을 반드시 지켜주세요:
  // 1. 다음과 같이 request를 전달하세요:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. 다음과 같이 쿠키를 복사하세요:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. 쿠키를 제외한 myNewResponse 객체를 필요에 맞게 수정하세요
  // 4. 마지막으로:
  //    return myNewResponse
  // 이를 지키지 않으면 브라우저와 서버가 동기화되지 않아 사용자 세션이 조기에 종료될 수 있습니다!

  return supabaseResponse
}
