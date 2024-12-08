'use client'
import { createApiClientCSR } from '@/shared/lib/supabase-csr'
import { ArticleType, IArticle } from '@/shared/types'
import { Button, Label, ModalOverlay } from '@/shared/ui'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'
import { useState } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

// 날짜 형식 검증 및 정제를 위한 유틸리티 함수
const sanitizePublishedDate = (
  date: string | null | undefined,
): string | null => {
  if (!date) return null

  // YYYY-MM-DD 형식 검증
  const dateRegex = /^\d{4}(-\d{2}(-\d{2})?)?$/
  if (dateRegex.test(date)) {
    return date
  }

  // 년도만 있는 경우 처리 (예: "2023년")
  const yearMatch = date.match(/\d{4}/)
  if (yearMatch) {
    return `${yearMatch[0]}-01-01` // 년도만 반환
  }

  return null
}

const ArticleSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  published_at: z
    .string()
    .nullable()
    .transform((val) => sanitizePublishedDate(val)),
  reference_name: z.string().min(1),
  reference_url: z.string().url(),
})

const extractJsonFromText = (text: string): string => {
  // JSON 블록 찾기
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (jsonMatch) {
    return jsonMatch[1].trim()
  }

  // JSON 블록이 없으면 전체 텍스트에서 [] 블록 찾기
  const arrayMatch = text.match(/\[\s*{[\s\S]*}\s*\]/)
  if (arrayMatch) {
    return arrayMatch[0].trim()
  }

  return text.trim()
}

// Todo: Form Type Check, like zod, Refactor
export const CreateArticleWithAiModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [articleType, setArticleType] = useState<ArticleType>('trend')
  const handleCreate = async () => {
    const api = createApiClientCSR()
    setIsLoading(true)
    try {
      const res = await api.admin.getArticlesByPerplexity(articleType)
      const answer = res.choices?.[0]?.message?.content ?? null

      if (answer) {
        const jsonString = extractJsonFromText(answer)
        const parsedData = JSON.parse(jsonString)

        if (!Array.isArray(parsedData)) {
          console.error('Data is not an array', parsedData)
          return []
        }

        const validatedArticles = parsedData.reduce<
          Pick<
            IArticle,
            | 'title'
            | 'summary'
            | 'published_at'
            | 'reference_name'
            | 'reference_url'
          >[]
        >((acc, item) => {
          try {
            const validatedItem = ArticleSchema.parse(item)
            acc.push(validatedItem)
          } catch (error) {
            console.error('Validation error for item:', item, error)
          }
          return acc
        }, [])

        const { error } = await api.admin.createBulkArticles(
          validatedArticles.map((item) => ({
            ...item,
            type: articleType,
            unique_id: `${item.title}-${item.reference_url}`,
          })),
        )

        if (error) {
          throw error
        }
        toast('Successfully created articles')
      }
    } catch (ex) {
      console.log(ex)
      toast(JSON.stringify(ex))
    } finally {
      setIsLoading(false)
    }
  }

  const articleTypes: ArticleType[] = [
    'trend',
    'it',
    'ai',
    'front-end',
    'back-end',
    'korea-news',
    'world-news',
  ]

  return (
    <ModalOverlay
      isOpen={isOpen}
      onClose={onClose}
      className="flex flex-col gap-6 p-4"
    >
      <header>
        <h3 className="text-lg font-semibold">
          Create Article With Perplexity
        </h3>
      </header>
      <div>
        <RadioGroup
          defaultValue="trend"
          className="gap-2"
          onValueChange={(v) => setArticleType(v as ArticleType)}
        >
          {articleTypes.map((articleType) => (
            <div key={articleType} className="flex items-center space-x-2">
              <RadioGroupItem value={articleType} id={articleType} />
              <Label htmlFor={articleType}>{articleType}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <footer className="flex w-full justify-end gap-4">
        <Button variant="ghost" onClick={onClose} disabled={isLoading}>
          Close
        </Button>
        <Button onClick={handleCreate} disabled={isLoading}>
          Submit
        </Button>
      </footer>
    </ModalOverlay>
  )
}
