'use client'
import type { OverlayProps } from '@/shared/lib/overlay'
import type { SupportedLanguagesType } from '@/shared/types'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import {
  ApiClient,
  DpQueryKeys,
  type IApiClientArticlesParams,
} from '@/shared/api'
import { ARTICLE_TYPE_OPTIONS, SUPPORTED_LANGUAGES } from '@/shared/config'
import { showToast } from '@/shared/lib/utils'
import { ArticleType } from '@/shared/types'
import { Button, Dialog, DialogContent, DialogTitle, Label } from '@/shared/ui'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'

export const CreateArticleWithAiOverlay = ({ isOpen, close }: OverlayProps) => {
  const [articleType, setArticleType] = useState<ArticleType>(
    ArticleType.TREND_AND_LIFESTYLE,
  )
  const [language, setLanguage] = useState<SupportedLanguagesType>('ko')
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async (
      inputs: IApiClientArticlesParams<'generateAndSaveArticlesWithAi'>,
    ) => {
      return ApiClient.articles.generateAndSaveArticlesWithAi(inputs)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: DpQueryKeys.admin.articles.list(),
      })
      showToast.success('Successfully created articles')
    },
  })

  const handleCreate = async () => {
    mutate({ language, type: articleType })
  }

  return (
    <Dialog open={isOpen}>
      <DialogContent className="flex flex-col gap-6 p-4">
        <DialogTitle>Create Article With Perplexity</DialogTitle>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <Label>Article Type</Label>
            <RadioGroup
              defaultValue={articleType}
              className="flex flex-wrap gap-4"
              onValueChange={(value: ArticleType) => setArticleType(value)}
            >
              {ARTICLE_TYPE_OPTIONS.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} id={type} />
                  <Label htmlFor={type}>{type}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-3">
            <Label>Language</Label>
            <RadioGroup
              defaultValue={language}
              className="flex flex-wrap gap-4"
              onValueChange={(value: SupportedLanguagesType) =>
                setLanguage(value)
              }
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <div key={lang} className="flex items-center space-x-2">
                  <RadioGroupItem value={lang} id={lang} />
                  <Label htmlFor={lang}>{lang}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
        <footer className="flex w-full justify-end gap-4">
          <Button variant="ghost" onClick={close} disabled={isPending}>
            Close
          </Button>
          <Button onClick={handleCreate} disabled={isPending}>
            {isPending ? 'Generating...' : 'Submit'}
          </Button>
        </footer>
      </DialogContent>
    </Dialog>
  )
}
