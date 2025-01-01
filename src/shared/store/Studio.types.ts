import type { IAiStories, IQuotes } from '../types'

export enum StudioMergeItemType {
  Quote = 'quote',
  AiStory = 'ai_story',
}

type IStudioMergeQuote = {
  type: StudioMergeItemType.Quote
  data: IQuotes
}

type IStudioMergeAiStory = {
  type: StudioMergeItemType.AiStory
  data: IAiStories
}

export type StudioMergeItems = IStudioMergeQuote | IStudioMergeAiStory
