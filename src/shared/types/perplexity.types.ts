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

export interface PerplexityResponse {
  id: string
  model: string
  created: number
  usage: Usage
  citations: string[]
  object: string
  choices: Choice[]
}
