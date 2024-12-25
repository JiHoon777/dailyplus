import { useDPStore } from '@/shared/store'

export const useAiPromptAccess = () => {
  const hasAiPromptAccess = useDPStore((s) => s.auth.hasAiPromptAccess)

  // Todo: Login or AI Prompt Access Alert
  return {
    hasAiPromptAccess,
  }
}
