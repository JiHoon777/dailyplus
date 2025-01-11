import type { IApiClientAiStoriesParams } from '@/shared/api'
import type { ChangeEvent } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowUpIcon } from 'lucide-react'

import { ApiClient, DpQueryKeys } from '@/shared/api'
import { showToast } from '@/shared/lib/utils'
import { useStore } from '@/shared/store'
import { Button, ResizableTextarea } from '@/shared/ui'

export const StudioPromptInput = () => {
  const mergingItems = useStore('studio', (s) => s.mergingItems)
  const userPrompt = useStore('studio', (s) => s.userPrompt)
  const setUserPrompt = useStore('studio').getState().setUserPrompt
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation({
    mutationFn: async (
      inputs: IApiClientAiStoriesParams<'generateFromQuotesWithAi'>,
    ) => {
      return ApiClient.aiStories.generateFromQuotesWithAi(inputs)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        exact: false,
        queryKey: DpQueryKeys.studio.recentAiStoryList(),
      })
      showToast.success('Successfully created articles')
      close()
    },
  })

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserPrompt(e.target.value)
  }

  const activeUpload = !!userPrompt.trim() && mergingItems.length > 0

  const handleSubmit = () => {
    mutate({
      // Todo: AiStory 머지 기능 추가시에는 type 구분하여 처리
      quoteIds: mergingItems.map((item) => item.data.id),
      customPrompt: userPrompt,
    })
  }

  return (
    <div className="relative w-full">
      <ResizableTextarea
        value={userPrompt}
        onChange={handleChange}
        placeholder={'Write your Prompt'}
        className={`resize-none`}
      />
      {activeUpload && (
        <Button
          variant="ghost"
          onClick={handleSubmit}
          disabled={!activeUpload && isPending}
          className="absolute right-2 top-2"
        >
          <ArrowUpIcon className="text-gray-500" />
        </Button>
      )}
    </div>
  )
}
