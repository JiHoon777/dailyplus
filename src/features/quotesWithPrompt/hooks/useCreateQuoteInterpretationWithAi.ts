import type OpenAI from 'openai'

import { useMutation } from '@tanstack/react-query'

import { ApiClientCSR } from '@/shared/lib/supabase-csr'
import { showToast } from '@/shared/lib/utils'

export const useCreateQuoteInterpretationWithAi = () => {
  return useMutation({
    mutationFn: async (quote: string, customPrompt?: string) => {
      const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        {
          content: `너는 유머러스하면서도 통찰력 있는 명언 해석가야. 💡재치있는 해석: 유머러스한 관점에서 명언 해석 🎯실용적 교훈: 일상생활에서 실천할 수 있는 구체적인 조언 🌟현대적 적용: 현시대에 맞는 실천 방안`,
          role: 'system',
        },
        {
          content: `명언: "${quote}"`,
          role: 'user',
        },
      ]

      if (customPrompt) {
        messages.push({
          content: customPrompt,
          role: 'user',
        })
      }

      const res = await ApiClientCSR.openai.createChatCompletions({
        messages,
        model: 'gpt-4o-mini',
      })

      console.log(19, res)

      return null
    },
    onSuccess() {
      showToast.success('Quote Interpretation created successfully!')
    },
  })
}
