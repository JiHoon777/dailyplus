/**
 * 모든 API 작업의 진입점이 되는 메인 API 클라이언트
 * 관리자용과 일반 사용자용 작업에 대한 접근을 제공
 */
import type { SupabaseClient } from '@supabase/supabase-js'

import { ApiClientAdmin } from './apiClientAdmin'
import { ApiClientApp } from './apiClientApp'

export class ApiClient {
  readonly admin = new ApiClientAdmin(this)
  readonly app = new ApiClientApp(this)
  
  constructor(private readonly _supabaseClient: SupabaseClient) {}

  get supabaseClient() {
    return this._supabaseClient
  }
}
