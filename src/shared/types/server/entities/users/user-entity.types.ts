//==============================================================================
// * User Entity
//==============================================================================

export type IUsers = {
  id: number
  email: string
  name: string | null
  role: UserRole
  createdAt: Date
  updatedAt: Date
  refreshToken: string | null
}

export enum UserRole {
  USER = 5,
  ADMIN = 10,
}
