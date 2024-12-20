// Todo: Refactor
// Todo: type 세분화 kr_, en_ ,

import type { GetArticlesByPerplexityInputs } from './types'
import type { PerplexityResponse } from '@/shared/types'

import { ApiClientCSR } from '@/shared/lib/supabase-csr'

import { configureBody } from './configureBody'

export * from './types'

// 영어로 프롬프트를 짜면 해외 사이트에서만 가져오고,
// 한국어로 짜면 한국 사이트에서만 가져옴
// 골고루 못 가져옴
export const getArticlesByPerplexity = async (
  inputs: GetArticlesByPerplexityInputs,
): Promise<PerplexityResponse> => {
  const { type, language, startDate, endDate } = inputs

  const body = configureBody({
    endDate,
    language,
    startDate,
    type,
  })

  const res = await ApiClientCSR.ai.requestToPerplexity(body)

  return res.json()
}
