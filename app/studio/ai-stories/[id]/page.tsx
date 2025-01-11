'use client'

import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

import { ApiClient, DpQueryKeys } from '@/shared/api'
import { useStore } from '@/shared/store'
import { DPage, ScreenLoading } from '@/shared/ui'

import { useGetBlockName } from './_hooks'
import { StudioStoryEditor } from './_ui'

export default function Post() {
  const { id } = useParams()
  const initNavigation = useStore('studioStoryNavigation').getState().init
  const initEditor = useStore('studioStoryEditor').getState().init
  const blockKey = useGetBlockName()

  const { data, isLoading, error } = useQuery({
    queryFn: () => ApiClient.aiStories.getById(Number(id)),
    queryKey: DpQueryKeys.studio.story.detail(Number(id)),
  })

  useEffect(() => {
    if (!data?.content) {
      return
    }

    initEditor(data.content, blockKey ?? data.content.startBlockTitle)
  }, [initNavigation, initEditor, blockKey, data?.content])

  if (isLoading) {
    return <ScreenLoading />
  }

  if (error) {
    throw error
  }

  return (
    <DPage className="flex-row gap-6">
      {/* <StudioStoryNavigation /> */}
      <StudioStoryEditor />
    </DPage>
  )
}
