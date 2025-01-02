import type { ApiClient } from '../ApiClient'
import type {
  ExtractMethodParameters,
  ExtractMethodReturn,
  IUsers,
} from '@/shared/types'

type IApiClientAuth = typeof ApiClientAuth.prototype

export type IApiClientAuthResponse<TMethod extends keyof IApiClientAuth> =
  ExtractMethodReturn<IApiClientAuth, TMethod>

export type IApiClientAuthParams<TMethod extends keyof IApiClientAuth> =
  ExtractMethodParameters<IApiClientAuth, TMethod>

export class ApiClientAuth {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  get fetch() {
    return this._apiClient.fetch
  }

  getAuthUser(): Promise<IUsers> {
    return this.fetch.get({
      url: 'auth/profile',
    })
  }

  signup(email: string, password: string): Promise<IUsers> {
    return this.fetch.post({
      url: 'auth/signup',
      body: {
        email,
        password,
      },
    })
  }

  signin(email: string, password: string): Promise<IUsers> {
    return this.fetch.post({
      url: 'auth/signin',
      body: {
        email,
        password,
      },
    })
  }

  refreshToken(): Promise<IUsers> {
    return this.fetch.post({
      url: 'auth/refresh-token',
    })
  }

  signout(): Promise<null> {
    return this.fetch.post({
      url: 'auth/signout',
    })
  }
}

//   socialLogin(provider: 'google' | 'github') {
//     return this._supabaseClient.auth.signInWithOAuth({
//       options: {
//         redirectTo: window.location.origin,
//       },
//       provider,
//     })
//   }
