import type { IServerListRequest } from '.'
import type { Database } from 'database.types'

//==============================================================================
// * Quotes Entity
//==============================================================================

export type IQuotes = Database['public']['Tables']['quotes']['Row']

/**
 * * CRUD Inputs
 */
export type IQuotesCreationInput = Pick<
  IQuotes,
  'original_text' | 'korean_text' | 'quote_person_id'
>
export type IQuotesListableInput = IServerListRequest<{
  orderBy?: 'created_at'
  quotePeopleName?: string
}>
export type IQuotesUpdateInput = Partial<IQuotesCreationInput>
export type IQuotesDeletionInput = Pick<IQuotes, 'id'>

//==============================================================================
// * Quote People Entity
//==============================================================================

export type IQuotePeople = Database['public']['Tables']['quote_people']['Row']

/**
 * * CRUD Inputs
 */
export type IQuotePeopleCreationInput = Pick<
  IQuotePeople,
  'name' | 'description'
>
export type IQuotePeopleListableInput = IServerListRequest<{
  orderBy?: 'created_at'
}>
export type IQuotePeopleUpdateInput = IQuotePeopleCreationInput
export type IQuotePeopleDeletionInput = Pick<IQuotePeople, 'id'>

//==============================================================================
// * AI Stories Entity
//==============================================================================

export type IAiStories = Database['public']['Tables']['ai_stories']['Row']

/**
 * * CRUD Inputs
 */
export type IAiStoriesCreationInput = Pick<
  IAiStories,
  'title' | 'content' | 'model_version' | 'prompt' | 'user_id'
>
export type IAiStoriesListableInput = IServerListRequest<{
  orderBy?: 'created_at'
  user_id?: string
}>
export type IAiStoriesUpdateInput = Partial<IAiStoriesCreationInput>
export type IAiStoriesDeletionInput = Pick<IAiStories, 'id'>

//==============================================================================
// * Quote AI Interpretations Entity
//==============================================================================

export type IQuoteAiInterpretations =
  Database['public']['Tables']['quote_ai_interpretations']['Row']

/**
 * * CRUD Inputs
 */
export type IQuoteAiInterpretationsCreationInput = Pick<
  IQuoteAiInterpretations,
  'content' | 'model_version' | 'quote_id' | 'prompt' | 'user_id'
>
export type IQuoteAiInterpretationsListableInput = IServerListRequest<{
  orderBy?: 'created_at'
  quote_id?: number
}>
export type IQuoteAiInterpretationsUpdateInput =
  Partial<IQuoteAiInterpretationsCreationInput>
export type IQuoteAiInterpretationsDeletionInput = Pick<
  IQuoteAiInterpretations,
  'id'
>
