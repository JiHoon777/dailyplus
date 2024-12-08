import { ModalOverlay } from '@/shared/ui'

export const CreateArticleWithAiModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) => {
  return (
    <ModalOverlay isOpen={isOpen} onClose={onClose}>
      <header>Create Article With Perplexity</header>
    </ModalOverlay>
  )
}
