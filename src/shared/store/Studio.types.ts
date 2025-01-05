import type { IAiStory, IQuote } from '../types'

type IStudioMergeQuote = {
  type: 'quote'
  data: IQuote
}

type IStudioMergeAiStory = {
  type: 'ai_story'
  data: IAiStory
}

export type StudioMergeItems = IStudioMergeQuote | IStudioMergeAiStory
