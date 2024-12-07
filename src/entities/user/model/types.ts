export interface User {
  id: string
  name: string | null
  email: string
  created_at: string
  updated_at: string
}

export interface UserState {
  user: User | null
}
