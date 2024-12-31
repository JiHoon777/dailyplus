import { useStore } from '@/shared/store'

export const useAiPromptAccess = () => {
  const hasAiPromptAccess = useStore('auth', (s) => s.hasAiPromptAccess)

  // Todo: Login or AI Prompt Access Alert
  return {
    hasAiPromptAccess,
  }
}
