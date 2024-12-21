import type { IListableParams } from '.'
import type { Database } from 'database.types'

//==============================================================================
// * User Entity
//==============================================================================

export type IUser = Database['public']['Tables']['users']['Row']

//==============================================================================
// * Articles Entity
//==============================================================================

export type IArticle = Database['public']['Tables']['articles']['Row']

/**
 * * Articles CRUD Input
 */
export type IArticleCreationInput = Pick<
  IArticle,
  | 'title'
  | 'summary'
  | 'published_at'
  | 'reference_name'
  | 'reference_url'
  | 'type'
  | 'unique_id'
>
export type IArticleListableInput = IListableParams<{
  orderBy?: 'created_at' | 'published_at'
  type?: ArticleType
}>
export type IArticleUpdateInput = Partial<IArticleCreationInput>
export type IArticleDeletionInput = Pick<IArticle, 'id'>

export type ArticleType = Database['public']['Enums']['article_type']

//==============================================================================
// * Quotes Entity
//==============================================================================

export type IQuote = Database['public']['Tables']['quotes']['Row']

/**
 * * CRUD Inputs
 */
export type IQuoteCreationInput = Pick<
  IQuote,
  'original_text' | 'korean_text' | 'quote_person_id'
>
export type IQuoteListableInput = IListableParams<{
  orderBy?: 'created_at'
}>
export type IQuoteUpdateInput = Partial<IQuoteCreationInput>
export type IQuoteDeletionInput = Pick<IQuote, 'id'>

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

export type IQuoteAiStory =
  Database['public']['Tables']['quote_ai_stories']['Row']

/**
 * * CRUD Inputs
 */
export type IQuoteAiStoryCreationInput = Pick<
  IQuoteAiStory,
  'title' | 'content' | 'model_version' | 'quote_id'
>
export type IQuoteAiStoryListableInput = IListableParams<{
  orderBy?: 'created_at'
}>
export type IQuoteAiStoryUpdateInput = Partial<IQuoteAiStoryCreationInput>
export type IQuoteAiStoryDeletionInput = Pick<IQuoteAiStory, 'id'>

//==============================================================================
// * Quote AI Interpretations Entity
//==============================================================================

export type IQuoteAiInterpretation =
  Database['public']['Tables']['quote_ai_interpretations']['Row']

/**
 * * CRUD Inputs
 */
export type IQuoteAiInterpretationCreationInput = Pick<
  IQuoteAiInterpretation,
  'content' | 'model_version' | 'quote_id'
>
export type IQuoteAiInterpretationListableInput = IListableParams<{
  orderBy?: 'created_at'
}>
export type IQuoteAiInterpretationUpdateInput =
  Partial<IQuoteAiInterpretationCreationInput>
export type IQuoteAiInterpretationDeletionInput = Pick<
  IQuoteAiInterpretation,
  'id'
>
