import type {
  ArticlesType,
  ExtractMethodParameters,
  ExtractMethodReturn,
  SupportedLanguagesType,
} from '@/shared/types'

export type IApiClientAiBase = {
  getArticles(input: {
    type: ArticlesType
    language: SupportedLanguagesType
  }): Promise<string | null>

  getQuoteInterpretation(input: {
    quoteText: string
    customPrompt?: string
  }): Promise<string | null>
}

export type IApiClientAiBaseResponse<TMethod extends keyof IApiClientAiBase> =
  ExtractMethodReturn<IApiClientAiBase, TMethod>

export type IApiClientAiBaseParams<TMethod extends keyof IApiClientAiBase> =
  ExtractMethodParameters<IApiClientAiBase, TMethod>
