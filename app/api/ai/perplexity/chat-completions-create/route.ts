import { NextResponse } from 'next/server'

import { DPEnvs } from '@/shared/config'
import { createApiClientSSR } from '@/shared/lib/supabase-ssr'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const client = await createApiClientSSR()
    const data = await client.fetch.post({
      body,
      header: {
        Authorization: `Bearer ${DPEnvs.PERPLEXITY_API_KEY}`,
      },
      url: 'https://api.perplexity.ai/chat/completions',
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
