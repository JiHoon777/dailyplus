const TOKEN_KEY = 'auth_token'

export const tokenStorage = {
  getToken: () => {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(TOKEN_KEY)
  },

  setToken: (token: string) => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(TOKEN_KEY, token)
  },

  removeToken: () => {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(TOKEN_KEY)
  },
}
