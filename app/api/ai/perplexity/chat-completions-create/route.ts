import { NextResponse } from 'next/server'

import { ApiClient } from '@/shared/api'
import { DPEnvs } from '@/shared/config'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const data = await ApiClient.fetch.request({
      body,
      header: {
        Authorization: `Bearer ${DPEnvs.PERPLEXITY_API_KEY}`,
      },
      url: 'https://api.perplexity.ai/chat/completions',
      method: 'POST',
    })

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in quote interpretation:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 },
    )
  }
}
