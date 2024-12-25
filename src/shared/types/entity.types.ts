import type { IListableParams } from '.'
import type { Database } from 'database.types'

//==============================================================================
// * User Entity
//==============================================================================

export type IUsers = Database['public']['Tables']['users']['Row']

//==============================================================================
// * Articles Entity
//==============================================================================

export type IArticles = Database['public']['Tables']['articles']['Row']

/**
 * * Articles CRUD Input
 */
export type IArticlesCreationInput = Pick<
  IArticles,
  | 'title'
  | 'summary'
  | 'published_at'
  | 'reference_name'
  | 'reference_url'
  | 'type'
  | 'unique_id'
>
export type IArticlesListableInput = IListableParams<{
  orderBy?: 'created_at' | 'published_at'
  type?: ArticlesType
}>
export type IArticlesUpdateInput = Partial<IArticlesCreationInput>
export type IArticlesDeletionInput = Pick<IArticles, 'id'>

export type ArticlesType = Database['public']['Enums']['article_type']

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
export type IQuotesListableInput = IListableParams<{
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
export type IQuotePeopleListableInput = IListableParams<{
  orderBy?: 'created_at'
}>
export type IQuotePeopleUpdateInput = IQuotePeopleCreationInput
export type IQuotePeopleDeletionInput = Pick<IQuotePeople, 'id'>

//==============================================================================
// * Quote AI Stories Entity
//==============================================================================

export type IQuoteAiStories =
  Database['public']['Tables']['quote_ai_stories']['Row']

/**
 * * CRUD Inputs
 */
export type IQuoteAiStoriesCreationInput = Pick<
  IQuoteAiStories,
  'title' | 'content' | 'model_version' | 'quote_id'
>
export type IQuoteAiStoriesListableInput = IListableParams<{
  orderBy?: 'created_at'
}>
export type IQuoteAiStoriesUpdateInput = Partial<IQuoteAiStoriesCreationInput>
export type IQuoteAiStoriesDeletionInput = Pick<IQuoteAiStories, 'id'>

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
  'content' | 'model_version' | 'quote_id' | 'prompt'
>
export type IQuoteAiInterpretationsListableInput = IListableParams<{
  orderBy?: 'created_at'
  quote_id?: number
}>
export type IQuoteAiInterpretationsUpdateInput =
  Partial<IQuoteAiInterpretationsCreationInput>
export type IQuoteAiInterpretationsDeletionInput = Pick<
  IQuoteAiInterpretations,
  'id'
>
