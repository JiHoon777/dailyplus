import type { IAiStory, IServerListRequest } from '@/shared/types'

export type IAiStoryCreateRequest = {
  prompt?: string | null
  userId?: number | null
} & Pick<IAiStory, 'title' | 'content' | 'modelVersion'>

export type IAiStoryListRequest = IServerListRequest<{
  userId?: number
}>

export type IAiStoryUpdateRequest = Partial<IAiStoryCreateRequest>

export type IAiStoryDeleteRequest = Pick<IAiStory, 'id'>
