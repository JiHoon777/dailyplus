import type { Database } from 'database.types'

type _USER = Database['public']['Tables']['users']['Row']
export interface IUser extends _USER {}

export interface UserState {
  user: IUser | null
}
