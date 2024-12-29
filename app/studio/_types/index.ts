import type { IAiStories, IQuotes } from '@/shared/types'

export type IStudioMergeQuote = {
  type: 'quote'
  data: IQuotes
}

export type IStudioMergeAiStory = {
  type: 'ai_story'
  data: IAiStories
}

export type IStudioMergeItems = IStudioMergeQuote | IStudioMergeAiStory
