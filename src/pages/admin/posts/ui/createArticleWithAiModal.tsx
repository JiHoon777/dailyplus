'use client'
import { ArticleType } from '@/shared/types'
import { Button, Label, ModalOverlay } from '@/shared/ui'
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group'

// Todo: Form Type Check, like zod
export const CreateArticleWithAiModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  const handleCreate = () => {}

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
        <RadioGroup defaultValue="trend" className="gap-2">
          {articleTypes.map((articleType) => (
            <div key={articleType} className="flex items-center space-x-2">
              <RadioGroupItem value={articleType} id={articleType} />
              <Label htmlFor={articleType}>{articleType}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <footer className="flex w-full justify-end gap-4">
        <Button variant="ghost" onClick={onClose}>
          Close
        </Button>
        <Button onClick={handleCreate}>Submit</Button>
      </footer>
    </ModalOverlay>
  )
}
