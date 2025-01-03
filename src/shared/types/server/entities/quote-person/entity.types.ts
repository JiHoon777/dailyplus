import type { IServerEntityBase } from '@/shared/types'

export type IQuotePerson = {
  name: string
  description: string | null
} & IServerEntityBase
