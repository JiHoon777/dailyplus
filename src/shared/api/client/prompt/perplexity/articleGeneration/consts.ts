import type { ArticlesType, SupportedLanguagesType } from '@/shared/types'

// Sources
const SOURCES = {
  AI: 'Google AI, OpenAI, DeepMind, Microsoft AI, MIT AI, Stanford AI, MIT, Stanford, UC Berkeley',
  BITCOIN: {
    GLOBAL:
      'CoinDesk, Cointelegraph, Bitcoin Magazine, Bloomberg Crypto, CryptoSlate',
    KOREAN: '업비트, 빗썸, 코인원, 코인데스크코리아, 디센터',
  },
  ECONOMY: {
    GLOBAL:
      'Bloomberg, Financial Times, Wall Street Journal, Reuters, The Economist, CNBC, Forbes',
    KOREAN:
      '한국은행, 금융감독원, 한국경제연구원, 한국금융연구원, KDI, 한국경제, 매일경제, 서울경제',
  },
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
  LIFESTYLE: {
    GLOBAL:
      "Vogue, GQ, The New York Times Style, Elle, Harper's Bazaar, Refinery29",
    KOREAN:
      '네이버 라이프, 카카오 스타일, 마리끌레르, 얼루어, 싱글즈, 여성중앙, 우먼센스',
  },
  NEWS: {
    GLOBAL:
      'Reuters, Bloomberg, AP News, Financial Times, Wall Street Journal, BBC, CNN',
    KOREAN: '연합뉴스, 한국경제, 조선일보, 중앙일보, 매일경제, KBS, MBC, SBS',
    TECH: 'TechCrunch, The Verge, Wired, VentureBeat, CNET, ZDNet, Reuters Technology, Bloomberg Technology',
  },
  TRENDS:
    'Google Trends, Twitter Trends, Naver Trends, Daum Trends, Kakao Trends, Yahoo Trends, Naver Blog Trends, Daum Blog Trends, Kakao Blog Trends, Yahoo Blog Trends, Naver News Trends, Daum News Trends, Kakao News Trends, Yahoo News Trends 등',
}

const TRUSTED_SOURCES: Record<ArticlesType, string> = {
  ai: SOURCES.AI,
  backEnd: [...SOURCES.KOREAN_TECH, ...SOURCES.GLOBAL_TECH].join(', '),
  frontEnd: [...SOURCES.KOREAN_TECH, ...SOURCES.GLOBAL_TECH].join(', '),
  it: SOURCES.NEWS.TECH,
  lifeStyle: [...SOURCES.LIFESTYLE.KOREAN, ...SOURCES.LIFESTYLE.GLOBAL].join(
    ', ',
  ),
  trend: SOURCES.TRENDS,
}

// Prompts
const PROMPTS = {
  SYSTEM: {
    en: (type: ArticlesType, dateRangeText: string) =>
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
    ko: (type: ArticlesType, dateRangeText: string) =>
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
    LIFESTYLE: {
      en: () =>
        `You are a lifestyle trend analyst specializing in cultural, fashion, and social trends within the specified timeframe. ` +
        `Please identify the most significant lifestyle trends and developments from trusted sources. ` +
        `Focus on fashion, wellness, cultural movements, and social phenomena. ` +
        `Respond in exactly this JSON format: ` +
        `[ { "title": "글 제목", "summary": "한글로 번역된 글 주요 내용 요약 (200자 이내)", ` +
        `"published_at": "YYYY-MM-DD", "reference_name": "참고 출처 이름", ` +
        `"reference_url": "원본 URL" } ]`,
      ko: () =>
        `당신은 지정된 기간 내의 문화, 패션, 사회 트렌드를 전문으로 하는 라이프스타일 분석가입니다. ` +
        `신뢰할 수 있는 매체에서 가장 중요한 라이프스타일 트렌드와 발전 동향을 식별해주세요. ` +
        `패션, 웰니스, 문화 운동, 사회 현상에 중점을 두어주세요. ` +
        `다음 JSON 형식으로 정확히 응답해주세요: ` +
        `[ { "title": "글 제목", "summary": "한글로 번역된 글 주요 내용 요약 (200자 이내)", ` +
        `"published_at": "YYYY-MM-DD", "reference_name": "참고 출처 이름", ` +
        `"reference_url": "원본 URL" } ]`,
    },
    NEWS: {
      en: (type: ArticlesType) =>
        `You are a search expert specializing in finding important ${type} news within the specified timeframe. ` +
        `Please identify the most impactful and significant ${type} news articles from the specified period. ` +
        `Return the response in exactly this JSON format: ` +
        `[ { "title": "글 제목", "summary": "한글로 번역된 글 주요 내용 요약 (200자 이내)", "published_at": "YYYY-MM-DD", ` +
        `"reference_name": "위에 명시된 매체 중 하나", "reference_url": "원본 기사 URL" } ]`,
      ko: (type: ArticlesType) =>
        `당신은 지정된 기간 내의 중요한 ${type} 뉴스를 찾는 전문가입니다. ` +
        `해당 기간 동안 가장 영향력 있고 중요한 ${type} 뉴스 기사를 식별해주세요. ` +
        `다음 JSON 형식으로 정확히 응답해주세요: ` +
        `[ { "title": "글 제목", "summary": "한글로 번역된 글 주요 내용 요약 (200자 이내)", "published_at": "YYYY-MM-DD", ` +
        `"reference_name": "위에 명시된 매체 중 하나", "reference_url": "원본 기사 URL" } ]`,
    },
    TECH: {
      en: (type: ArticlesType) =>
        `You are a search expert specializing in finding ${type} development articles within the specified timeframe. ` +
        `Please identify articles from authoritative tech blogs of prominent Korean and international IT companies matching our trusted sources for this period. ` +
        `Respond in exactly this JSON format: ` +
        `[ { "title": "글 제목", "summary": "한글로 번역된 글 주요 내용 요약 (200자 이내)", ` +
        `"published_at": "YYYY-MM-DD", "reference_name": "위에 명시된 출처 중 하나", ` +
        `"reference_url": "원본 URL" } ]`,
      ko: (type: ArticlesType) =>
        `당신은 지정된 기간 내의 ${type} 개발 관련 기사를 찾는 전문가입니다. ` +
        `이 기간 동안 신뢰할 수 있는 출처와 일치하는 한국 및 해외 주요 IT 기업의 공식 기술 블로그에서 기사를 식별해주세요. ` +
        `다음 JSON 형식으로 정확히 응답해주세요: ` +
        `[ { "title": "글 제목", "summary": "한글로 번역된 글 주요 내용 요약 (200자 이내)", ` +
        `"published_at": "YYYY-MM-DD", "reference_name": "위에 명시된 출처 중 하나", ` +
        `"reference_url": "원본 URL" } ]`,
    },
    TREND: {
      en: () =>
        `You are a trend analyst specializing in finding trends within the specified timeframe. ` +
        `Please highlight the most significant trends emerging across social media, technology, and cultural domains. ` +
        `Select diverse and impactful trends from different sectors. ` +
        `Respond in exactly this JSON format: ` +
        `[ { "title": "글 제목", "summary": "한글로 번역된 글 주요 내용 요약 (200자 이내)", ` +
        `"published_at": "YYYY-MM-DD", "reference_name": "참고 출처 이름", ` +
        `"reference_url": "원본 URL" } ]`,
      ko: () =>
        `당신은 지정된 기간 내의 트렌드를 찾는 전문 분석가입니다. ` +
        `소셜 미디어, 기술, 문화 영역에서 나타나는 가장 중요한 트렌드를 강조해주세요. ` +
        `다양한 분야에서 영향력 있는 트렌드를 선별해주세요. ` +
        `다음 JSON 형식으로 정확히 응답해주세요: ` +
        `[ { "title": "글 제목", "summary": "한글로 번역된 글 주요 내용 요약 (200자 이내)", ` +
        `"published_at": "YYYY-MM-DD", "reference_name": "참고 출처 이름", ` +
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
  type: ArticlesType,
  language: SupportedLanguagesType,
  dateRangeText: string,
) => {
  return language === 'en'
    ? PROMPTS.SYSTEM.en(type, dateRangeText)
    : PROMPTS.SYSTEM.ko(type, dateRangeText)
}

export const getUserContentByLanguage = (
  type: ArticlesType,
  language: SupportedLanguagesType,
) => {
  if (type === 'it') {
    return language === 'en'
      ? PROMPTS.USER.NEWS.en(type)
      : PROMPTS.USER.NEWS.ko(type)
  }

  if (type === 'ai' || type === 'frontEnd' || type === 'backEnd') {
    return language === 'en'
      ? PROMPTS.USER.TECH.en(type)
      : PROMPTS.USER.TECH.ko(type)
  }

  if (type === 'lifeStyle') {
    return language === 'en'
      ? PROMPTS.USER.LIFESTYLE.en()
      : PROMPTS.USER.LIFESTYLE.ko()
  }

  return language === 'en' ? PROMPTS.USER.TREND.en() : PROMPTS.USER.TREND.ko()
}
