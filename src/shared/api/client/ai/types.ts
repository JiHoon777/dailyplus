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
  }): Promise<string>

  getQuoteInterpretation(input: {
    quoteText: string
    customPrompt?: string
  }): Promise<string>
}

export type IApiClientAiBaseResponse<TMethod extends keyof IApiClientAiBase> =
  ExtractMethodReturn<IApiClientAiBase, TMethod>

export type IApiClientAiBaseParams<TMethod extends keyof IApiClientAiBase> =
  ExtractMethodParameters<IApiClientAiBase, TMethod>
