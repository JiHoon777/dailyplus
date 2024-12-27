interface Usage {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

interface Message {
  role: 'assistant' | 'user' | 'system'
  content: string
}

interface Choice {
  index: number
  finish_reason: string
  message: Message
  delta: {
    role: string
    content: string
  }
}

export type IPerplexityInput = {
  model: 'llama-3.1-sonar-huge-128k-online'
  messages: Message[]
}

export type IPerplexityResponse = {
  id: string
  model: string
  created: number
  usage: Usage
  citations: string[]
  object: string
  choices: Choice[]
}
