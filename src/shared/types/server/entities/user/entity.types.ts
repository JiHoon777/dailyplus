import type { IServerEntityBase } from '../../common'

export type IUser = {
  email: string
  name: string | null
  role: UserRole
  refreshToken: string | null
} & IServerEntityBase

export enum UserRole {
  USER = 5,
  ADMIN = 10,
}
