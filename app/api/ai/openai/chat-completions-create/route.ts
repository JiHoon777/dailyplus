import { NextResponse } from 'next/server'
import OpenAI from 'openai'

import { DPEnvs } from '@/shared/config'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const openai = new OpenAI({
      apiKey: DPEnvs.OPENAI_API_KEY,
    })

    const data = await openai.chat.completions.create(body)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in quote interpretation:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 },
    )
  }
}
