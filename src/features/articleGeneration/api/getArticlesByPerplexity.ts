// Todo: Refactor
// Todo: type 세분화 kr_, en_ ,

import type {
  ArticleType,
  PerplexityResponse,
  SupportedLanguagesType,
} from '@/shared/types'

export type GetArticlesByPerplexityInputs = {
  type: ArticleType
  language: SupportedLanguagesType
  startDate?: string // YYYY-MM-DD
  endDate?: string // YYYY-MM-DD
}

// -> 영어로 프롬프트를 짜면 해외 사이트에서만 가져오고, 한국어로 짜면 한국 사이트에서만 가져옴, 골고루 못 가져옴
export const getArticlesByPerplexity = async (
  inputs: GetArticlesByPerplexityInputs,
): Promise<PerplexityResponse> => {
  const { type, language, startDate, endDate } = inputs
  const frontBackendSources = [
    'AWS',
    'Google Cloud',
    'Google',
    'Microsoft Azure',
    'Microsoft',
    'IBM',
    'Oracle',
    'GitHub',
    'Node.js',
    'Docker',
    'Toast UI Tech',
    'Toast',
    'React',
    'Next.js',
    'Vue',
    'Angular',
    'Chrome Developers',
    'MDN Web',
    '카카오',
    '네이버 D2',
    '네이버',
    '라인',
    '우아한형제들',
    '당근마켓',
    '쏘카',
    '리디',
    '뱅크샐러드',
    'NHN Cloud',
    '쿠팡',
    '마켓컬리',
    '토스',
    '왓챠',
    '야놀자',
    '직방',
  ]
  const trustedSources = {
    ai: 'Google AI, OpenAI, DeepMind, Microsoft AI, MIT AI, Stanford AI, MIT, Stanford, UC Berkeley',
    'back-end': frontBackendSources.join(', '),
    'front-end': frontBackendSources.join(', '),
    it: 'TechCrunch, The Verge, Wired, VentureBeat, CNET, ZDNet, Reuters Technology, Bloomberg Technology',
    'korea-news':
      '연합뉴스, 한국경제, 조선일보, 중앙일보, 매일경제, KBS, MBC, SBS',
    trend:
      'Google Trends, Twitter Trends, Naver Trends, Daum Trends, Kakao Trends, Yahoo Trends, Naver Blog Trends, Daum Blog Trends, Kakao Blog Trends, Yahoo Blog Trends, Naver News Trends, Daum News Trends, Kakao News Trends, Yahoo News Trends 등',
    'world-news':
      'Reuters, Bloomberg, AP News, Financial Times, Wall Street Journal, BBC, CNN',
  }

  const dateRangeText = (() => {
    const now = new Date().toISOString()
    if (startDate && endDate) {
      return `${startDate} ~ ${endDate}`
    }
    if (startDate) {
      return `${startDate} ~ ${now}`
    }

    return `${now}`
  })()

  const systemContent =
    `Only find the most recent articles published ${dateRangeText}. ` +
    `STRICT REQUIREMENTS:` +
    `1. MUST return exactly 5 articles` +
    `2. All dates MUST be in YYYY-MM-DD format or null if exact date is uncertain` +
    `3. ONLY use articles from these trusted sources: ${trustedSources[type]}` +
    `4. Results MUST be balanced:` +
    `- 2-3 articles from Korean websites/companies (카카오, 네이버, 라인, 토스, 쿠팡 etc.)` +
    `- 2-3 articles from International websites/companies` +
    `5. For international articles:` +
    `- title: Keep original title in English (DO NOT translate)` +
    `- summary: MUST be translated to Korean` +
    `6. Keep original reference_name and reference_url unchanged`

  const content = (() => {
    // analyze news
    if (type === 'korea-news' || type === 'world-news' || type === 'it') {
      return (
        `You are a search expert specializing in finding important ${type} news within the specified timeframe. ` +
        `Please identify the most impactful and significant ${type} news articles from the specified period. ` +
        `Return the response in exactly this JSON format: ` +
        `[ { "title": "뉴스 제목", "summary": "뉴스 요약 (200자 이내)", "published_at": "YYYY-MM-DD", ` +
        `"reference_name": "위에 명시된 매체 중 하나", "reference_url": "원본 기사 URL" } ]`
      )
    }

    // analyze tech blog articles
    if (type === 'ai' || type === 'front-end' || type === 'back-end') {
      return (
        `You are a search expert specializing in finding ${type} development articles within the specified timeframe. ` +
        `Please identify articles from authoritative tech blogs of prominent Korean and international IT companies matching our trusted sources for this period. ` +
        `Respond in exactly this JSON format: ` +
        `[ { "title": "제목", "summary": "주요 내용 및 영향도 요약 (200자 이내)", ` +
        `"published_at": "YYYY-MM-DD", "reference_name": "위에 명시된 출처 중 하나", ` +
        `"reference_url": "원본 URL" } ]`
      )
    }

    // analyze trend
    return (
      `You are a trend analyst specializing in finding trends within the specified timeframe. ` +
      `Please highlight the most significant trends emerging across social media, technology, and cultural domains. ` +
      `Select diverse and impactful trends from different sectors. ` +
      `Respond in exactly this JSON format: ` +
      `[ { "title": "트렌드 제목", "summary": "트렌드 설명 및 영향력 분석 (200자 이내)", ` +
      `"published_at": "YYYY-MM-DD", "reference_name": "주요 참고 출처", ` +
      `"reference_url": "참고 URL" } ]`
    )
  })()

  const body = JSON.stringify({
    messages: [
      {
        content: systemContent,
        role: 'system',
      },
      {
        content,
        role: 'user',
      },
    ],
    model: 'llama-3.1-sonar-huge-128k-online',
  })

  const res = await fetch('https://api.perplexity.ai/chat/completions', {
    body,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  return res.json()
}
