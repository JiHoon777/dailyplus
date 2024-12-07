export interface User {
  id: string
  email: string
  name: string
  profileImage?: string
}

export interface UserState {
  data: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
