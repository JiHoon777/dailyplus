/**
 * 모든 API 작업의 진입점이 되는 메인 API 클라이언트
 * 관리자용과 일반 사용자용 작업에 대한 접근을 제공
 */
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from 'database.types'

import { ApiClientAdmin } from './apiClientAdmin'
import { ApiClientApp } from './apiClientApp'

export class ApiClient {
  readonly admin = new ApiClientAdmin(this)
  readonly app = new ApiClientApp(this)

  constructor(readonly _supabaseClient: SupabaseClient<Database>) {}

  get supabaseClient() {
    return this._supabaseClient
  }

  getAuthUser() {
    return this._supabaseClient.auth.getUser()
  }

  getUserEntity(authId: string) {
    return this._supabaseClient
      .from('users')
      .select('*')
      .eq('id', authId)
      .single()
  }

  signUpWithEmail(email: string, password: string) {
    return this._supabaseClient.auth.signUp({
      email,
      options: {
        emailRedirectTo: location.origin,
      },
      password,
    })
  }

  loginWithEmail(email: string, password: string) {
    return this._supabaseClient.auth.signInWithPassword({
      email,
      password,
    })
  }

  logout() {
    return this._supabaseClient.auth.signOut()
  }
  //   socialLogin(provider: 'google' | 'github') {
  //     return this._supabaseClient.auth.signInWithOAuth({
  //       options: {
  //         redirectTo: window.location.origin,
  //       },
  //       provider,
  //     })
  //   }
}
