import type { IApiClientOpenAiParams } from '@/shared/api'

import { NextResponse } from 'next/server'

import { createApiClientSSR } from '@/shared/lib/supabase-ssr'

export async function POST(req: Request) {
  try {
    const body: IApiClientOpenAiParams<'createChatCompletions'> =
      await req.json()
    const apiClient = await createApiClientSSR()

    const res = await apiClient.openai.createChatCompletions(body)

    return NextResponse.json({ content: res })
  } catch (error) {
    console.error('Error in quote interpretation:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 },
    )
  }
}