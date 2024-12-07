import type { ApiClient } from './apiClient'

/**
 * 관리자 전용 API 클라이언트로 관리자 수준의 작업을 처리
 * 이 클라이언트는 관리자 수준의 작업에만 사용되어야 함
 */
export class ApiClientAdmin {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }
}
