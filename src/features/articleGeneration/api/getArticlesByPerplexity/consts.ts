import type { ArticleType, SupportedLanguagesType } from '@/shared/types'

// Sources
const SOURCES = {
  AI: 'Google AI, OpenAI, DeepMind, Microsoft AI, MIT AI, Stanford AI, MIT, Stanford, UC Berkeley',
  GLOBAL_TECH: [
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
  ],
  KOREAN_TECH: [
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
  ],
  NEWS: {
    GLOBAL:
      'Reuters, Bloomberg, AP News, Financial Times, Wall Street Journal, BBC, CNN',
    KOREAN: '연합뉴스, 한국경제, 조선일보, 중앙일보, 매일경제, KBS, MBC, SBS',
    TECH: 'TechCrunch, The Verge, Wired, VentureBeat, CNET, ZDNet, Reuters Technology, Bloomberg Technology',
  },
  TRENDS:
    'Google Trends, Twitter Trends, Naver Trends, Daum Trends, Kakao Trends, Yahoo Trends, Naver Blog Trends, Daum Blog Trends, Kakao Blog Trends, Yahoo Blog Trends, Naver News Trends, Daum News Trends, Kakao News Trends, Yahoo News Trends 등',
}

const TRUSTED_SOURCES: Record<ArticleType, string> = {
  ai: SOURCES.AI,
  'back-end': [...SOURCES.KOREAN_TECH, ...SOURCES.GLOBAL_TECH].join(', '),
  'front-end': [...SOURCES.KOREAN_TECH, ...SOURCES.GLOBAL_TECH].join(', '),
  it: SOURCES.NEWS.TECH,
  'korea-news': SOURCES.NEWS.KOREAN,
  trend: SOURCES.TRENDS,
  'world-news': SOURCES.NEWS.GLOBAL,
}

// Prompts
const PROMPTS = {
  SYSTEM: {
    en: (type: ArticleType, dateRangeText: string) =>
      `Only find the most recent articles published ${dateRangeText}. ` +
      `STRICT REQUIREMENTS:` +
      `1. MUST return exactly 5 articles` +
      `2. All dates MUST be in YYYY-MM-DD format or null if exact date is uncertain` +
      `3. ONLY use articles from these trusted sources: ${TRUSTED_SOURCES[type]}` +
      `4. Results MUST be balanced:` +
      `- 2-3 articles from Korean websites/companies (카카오, 네이버, 라인, 토스, 쿠팡 etc.)` +
      `- 2-3 articles from International websites/companies` +
      `5. For international articles:` +
      `- title: Keep original title in English (DO NOT translate)` +
      `- summary: MUST be translated to Korean` +
      `6. Keep original reference_name and reference_url unchanged`,
    ko: (type: ArticleType, dateRangeText: string) =>
      `${dateRangeText}에 게시된 가장 최근 기사만 찾아주세요. ` +
      `필수 요구사항:` +
      `1. 정확히 5개의 기사를 반환해야 합니다` +
      `2. 모든 날짜는 YYYY-MM-DD 형식이어야 하며, 정확한 날짜를 알 수 없는 경우 null로 표시` +
      `3. 다음 신뢰할 수 있는 출처의 기사만 사용: ${TRUSTED_SOURCES[type]}` +
      `4. 결과는 균형있게 구성되어야 합니다:` +
      `- 한국 웹사이트/기업의 기사 2-3개 (카카오, 네이버, 라인, 토스, 쿠팡 등)` +
      `- 해외 웹사이트/기업의 기사 2-3개` +
      `5. 해외 기사의 경우:` +
      `- 제목: 영어 원문 유지 (번역하지 않음)` +
      `- 요약: 반드시 한국어로 번역` +
      `6. 원본 reference_name과 reference_url은 변경하지 않고 유지`,
  },
  USER: {
    NEWS: {
      en: (type: ArticleType) =>
        `You are a search expert specializing in finding important ${type} news within the specified timeframe. ` +
        `Please identify the most impactful and significant ${type} news articles from the specified period. ` +
        `Return the response in exactly this JSON format: ` +
        `[ { "title": "뉴스 제목", "summary": "뉴스 요약 (200자 이내)", "published_at": "YYYY-MM-DD", ` +
        `"reference_name": "위에 명시된 매체 중 하나", "reference_url": "원본 기사 URL" } ]`,
      ko: (type: ArticleType) =>
        `당신은 지정된 기간 내의 중요한 ${type} 뉴스를 찾는 전문가입니다. ` +
        `해당 기간 동안 가장 영향력 있고 중요한 ${type} 뉴스 기사를 식별해주세요. ` +
        `다음 JSON 형식으로 정확히 응답해주세요: ` +
        `[ { "title": "뉴스 제목", "summary": "뉴스 요약 (200자 이내)", "published_at": "YYYY-MM-DD", ` +
        `"reference_name": "위에 명시된 매체 중 하나", "reference_url": "원본 기사 URL" } ]`,
    },
    TECH: {
      en: (type: ArticleType) =>
        `You are a search expert specializing in finding ${type} development articles within the specified timeframe. ` +
        `Please identify articles from authoritative tech blogs of prominent Korean and international IT companies matching our trusted sources for this period. ` +
        `Respond in exactly this JSON format: ` +
        `[ { "title": "제목", "summary": "주요 내용 및 영향도 요약 (200자 이내)", ` +
        `"published_at": "YYYY-MM-DD", "reference_name": "위에 명시된 출처 중 하나", ` +
        `"reference_url": "원본 URL" } ]`,
      ko: (type: ArticleType) =>
        `당신은 지정된 기간 내의 ${type} 개발 관련 기사를 찾는 전문가입니다. ` +
        `이 기간 동안 신뢰할 수 있는 출처와 일치하는 한국 및 해외 주요 IT 기업의 공식 기술 블로그에서 기사를 식별해주세요. ` +
        `다음 JSON 형식으로 정확히 응답해주세요: ` +
        `[ { "title": "제목", "summary": "주요 내용 및 영향도 요약 (200자 이내)", ` +
        `"published_at": "YYYY-MM-DD", "reference_name": "위에 명시된 출처 중 하나", ` +
        `"reference_url": "원본 URL" } ]`,
    },
    TREND: {
      en: () =>
        `You are a trend analyst specializing in finding trends within the specified timeframe. ` +
        `Please highlight the most significant trends emerging across social media, technology, and cultural domains. ` +
        `Select diverse and impactful trends from different sectors. ` +
        `Respond in exactly this JSON format: ` +
        `[ { "title": "트렌드 제목", "summary": "트렌드 설명 및 영향력 분석 (200자 이내)", ` +
        `"published_at": "YYYY-MM-DD", "reference_name": "주요 참고 출처", ` +
        `"reference_url": "원본 URL" } ]`,
      ko: () =>
        `당신은 지정된 기간 내의 트렌드를 찾는 전문 분석가입니다. ` +
        `소셜 미디어, 기술, 문화 영역에서 나타나는 가장 중요한 트렌드를 강조해주세요. ` +
        `다양한 분야에서 영향력 있는 트렌드를 선별해주세요. ` +
        `다음 JSON 형식으로 정확히 응답해주세요: ` +
        `[ { "title": "트렌드 제목", "summary": "트렌드 설명 및 영향력 분석 (200자 이내)", ` +
        `"published_at": "YYYY-MM-DD", "reference_name": "주요 참고 출처", ` +
        `"reference_url": "원본 URL" } ]`,
    },
  },
}

export const getDateRangeText = (startDate?: string, endDate?: string) => {
  const now = new Date().toISOString()
  if (startDate && endDate) {
    return `${startDate} ~ ${endDate}`
  }
  if (startDate) {
    return `${startDate} ~ ${now}`
  }
  return `${now}`
}

export const getSystemContentByLanguage = (
  type: ArticleType,
  language: SupportedLanguagesType,
  dateRangeText: string,
) => {
  return language === 'en'
    ? PROMPTS.SYSTEM.en(type, dateRangeText)
    : PROMPTS.SYSTEM.ko(type, dateRangeText)
}

export const getUserContentByLanguage = (
  type: ArticleType,
  language: SupportedLanguagesType,
) => {
  if (type === 'korea-news' || type === 'world-news' || type === 'it') {
    return language === 'en'
      ? PROMPTS.USER.NEWS.en(type)
      : PROMPTS.USER.NEWS.ko(type)
  }

  if (type === 'ai' || type === 'front-end' || type === 'back-end') {
    return language === 'en'
      ? PROMPTS.USER.TECH.en(type)
      : PROMPTS.USER.TECH.ko(type)
  }

  return language === 'en' ? PROMPTS.USER.TREND.en() : PROMPTS.USER.TREND.ko()
}
