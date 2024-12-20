'use client'
import type { ArticleType, SupportedLanguagesType } from '@/shared/types'

import { useState } from 'react'

import { ARTICLE_TYPE_OPTIONS, SUPPORTED_LANGUAGES } from '@/shared/config'
import { Button, Label, ModalOverlay } from '@/shared/ui'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'

import { useGenerateArticlesWithAi } from '../hooks/useGenerateArticlesWithAi'

// Todo: Form Type Check, like zod, Refactor
export const CreateArticleWithAiModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const [articleType, setArticleType] = useState<ArticleType>('trend')
  const [language, setLanguage] = useState<SupportedLanguagesType>('ko')
  const { mutate, isPending } = useGenerateArticlesWithAi()

  const handleCreate = async () => {
    mutate({ language, type: articleType })
  }

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
        <Button variant="ghost" onClick={onClose} disabled={isPending}>
          Close
        </Button>
        <Button onClick={handleCreate} disabled={isPending}>
          {isPending ? 'Generating...' : 'Submit'}
        </Button>
      </footer>
    </ModalOverlay>
  )
}
