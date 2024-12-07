import type { ApiClient } from './apiClient'

/**
 * 일반 사용자용 API 클라이언트로 일반 사용자 작업을 처리
 * 이 클라이언트는 관리자가 아닌 일반적인 작업에 사용되어야 함
 */
export class ApiClientApp {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }
}
