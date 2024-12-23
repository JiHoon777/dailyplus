import type { ApiClient } from './ApiClient'

export class ApiClientAuth {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  async getAuthUser() {
    const { data, error } = await this.supabaseClient.auth.getUser()

    return { data: data.user, error }
  }

  getUserEntity(authId: string) {
    return this.supabaseClient
      .from('users')
      .select('*')
      .eq('id', authId)
      .single()
  }

  signUpWithEmail(email: string, password: string) {
    return this.supabaseClient.auth.signUp({
      email,
      options: {
        emailRedirectTo: location.origin,
      },
      password,
    })
  }

  loginWithEmail(email: string, password: string) {
    return this.supabaseClient.auth.signInWithPassword({
      email,
      password,
    })
  }

  logout() {
    return this.supabaseClient.auth.signOut()
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
