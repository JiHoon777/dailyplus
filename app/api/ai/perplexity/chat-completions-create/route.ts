import ky from 'ky'
import { NextResponse } from 'next/server'

import { DPEnvs } from '@/shared/config'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const data = await ky
      .post('https://api.perplexity.ai/chat/completions', {
        headers: {
          Authorization: `Bearer ${DPEnvs.PERPLEXITY_API_KEY}`,
        },
        json: body,
      })
      .json()

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in quote interpretation:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 },
    )
  }
}
