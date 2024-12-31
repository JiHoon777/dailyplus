import type { IAiStories, IQuotes } from '../types'

type IStudioMergeQuote = {
  type: 'quote'
  data: IQuotes
}

type IStudioMergeAiStory = {
  type: 'ai_story'
  data: IAiStories
}

export type StudioMergeItems = IStudioMergeQuote | IStudioMergeAiStory
