import type { PerplexityResponse } from '../types'
import type { ArticleType, IArticle } from '../types/entity.types'
import type { ApiClient } from './apiClient'

/**
 * 관리자 전용 API 클라이언트로 관리자 수준의 작업을 처리
 * 이 클라이언트는 관리자 수준의 작업에만 사용되어야 함
 * Todo: 공통 파라메터 추출 & 일원화
 */
export class ApiClientAdmin {
  constructor(private readonly _apiClient: ApiClient) {}

  get supabaseClient() {
    return this._apiClient.supabaseClient
  }

  getUsers({ page = 1, limit = 10 }: { page: number; limit?: number }) {
    const from = (page - 1) * limit
    const to = from + limit - 1

    return this.supabaseClient
      .from('users')
      .select('*', { count: 'exact' })
      .range(from, to)
  }

  getArticles({ page = 1, limit = 10 }: { page: number; limit?: number }) {
    const from = (page - 1) * limit
    const to = from + limit - 1

    return this.supabaseClient
      .from('articles')
      .select('*', { count: 'exact' })
      .range(from, to)
  }

  async createBulkArticles(
    articles: Pick<
      IArticle,
      | 'published_at'
      | 'title'
      | 'summary'
      | 'reference_name'
      | 'reference_url'
      | 'type'
      | 'unique_id'
    >[],
  ) {
    const results = await Promise.allSettled(
      articles.map((article) =>
        this.supabaseClient.from('articles').insert([article]),
      ),
    )

    const succeeded = results.filter(
      (result): result is PromiseFulfilledResult<any> =>
        result.status === 'fulfilled',
    ).length

    const failed = results.filter(
      (result): result is PromiseRejectedResult => result.status === 'rejected',
    ).length

    return {
      error: failed > 0 ? `Failed to insert ${failed} articles` : null,
      data: { succeeded, failed },
    }
  }

  // Todo: 분리
  async getArticlesByPerplexity(
    type: ArticleType,
    startDate?: string, // YYYY-MM-DD
    endDate?: string, // YYYY-MM-DD
  ): Promise<PerplexityResponse> {
    const frontBackendSources = [
      'AWS Blog',
      'Google Cloud Blog',
      'Microsoft Azure Blog',
      'GitHub Blog',
      'Node.js Blog',
      'Docker Blog',
      'Toast UI Tech',
      'React Blog',
      'Next.js Blog',
      'Vue Blog',
      'Angular Blog',
      'Chrome Developers Blog',
      'MDN Web Docs',
      '카카오 기술 블로그',
      '네이버 D2',
      '라인 기술 블로그',
      '우아한형제들 기술 블로그',
      '당근마켓 기술 블로그',
      '쏘카 기술 블로그',
      '리디 기술 블로그',
      '뱅크샐러드 기술 블로그',
      'NHN Cloud 기술 블로그',
      '쿠팡 기술 블로그',
      '마켓컬리 기술 블로그',
      '토스 기술 블로그',
      '왓챠 기술 블로그',
      '야놀자 기술 블로그',
      '직방 기술 블로그',
    ]
    const trustedSources = {
      ai: 'Google AI Blog, OpenAI Blog, DeepMind Blog, Microsoft AI Blog, MIT AI Lab, Stanford AI Lab',
      'back-end': frontBackendSources.join(', '),
      'front-end': frontBackendSources.join(', '),
      it: 'TechCrunch, The Verge, Wired, VentureBeat, CNET, ZDNet, Reuters Technology, Bloomberg Technology',
      'korea-news':
        '연합뉴스, 한국경제, 조선일보, 중앙일보, 매일경제, KBS, MBC, SBS',
      'world-news':
        'Reuters, Bloomberg, AP News, Financial Times, Wall Street Journal, BBC, CNN',
      trend:
        'Google Trends, Twitter Trends, Naver Trends, Daum Trends, Kakao Trends, Yahoo Trends, Naver Blog Trends, Daum Blog Trends, Kakao Blog Trends, Yahoo Blog Trends, Naver News Trends, Daum News Trends, Kakao News Trends, Yahoo News Trends 등',
    }

    const dateRangeText = (() => {
      const now = new Date().toISOString()
      if (startDate && endDate) {
        return `${startDate} ~ ${endDate} 사이에`
      }
      if (startDate) {
        return `${startDate} ~ ${now} 사이에`
      }

      return `${now} 에`
    })()

    const systemContent =
      `${dateRangeText}에 작성된 article을 찾아주세요. 해당 날짜에 출간된 게시글이 없다면, 1주일 이내, 1개월 이내, 3개월 이내 순서로 가장 가까운 시기의 article을 5개 보여주세요.` +
      `유명한, 영향력있는 공식/신뢰할 수 있는 출처의 정보만 선택해주세요: ${trustedSources[type]}. ` +
      `한국, 외국(미국) 출처를 반절씩 선택해주세요.`

    const content = (() => {
      // analyze news
      if (type === 'korea-news' || type === 'world-news' || type === 'it') {
        return (
          `당신은 ${type} 뉴스 분석 전문가입니다. ` +
          `최신 ${type} 뉴스 중 중요도와 영향력이 큰 뉴스들을 알려주세요., ` +
          `각 뉴스는 서로 다른 주제를 다뤄야 합니다. ` +
          `정확히 다음 JSON 형식으로 응답해주세요: ` +
          `[ { "title": "뉴스 제목", "summary": "뉴스 요약 (200자 이내)", "published_at": "YYYY-MM-DD", ` +
          `"reference_name": "위에 명시된 매체 중 하나", "reference_url": "원본 기사 URL" } ]`
        )
      }

      // analyze tech blog articles
      if (type === 'ai' || type === 'front-end' || type === 'back-end') {
        return (
          `당신은 ${type} 개발 전문가입니다. ` +
          `최신 ${type} IT 회사, 공신력(유명한) 있는 블로그의 기술 블로그 및 논문 article 중 중요도와 영향력이 article 들을 알려주세요., ` +
          `정확히 다음 JSON 형식으로 응답해주세요: ` +
          `[ { "title": "제목", "summary": "주요 내용 및 영향도 요약 (200자 이내)", ` +
          `"published_at": "YYYY-MM-DD", "reference_name": "위에 명시된 출처 중 하나", ` +
          `"reference_url": "원본 URL" } ]`
        )
      }

      // analyze trend
      return (
        `당신은 디지털 트렌드 분석가입니다. ` +
        `소셜 미디어, 기술, 문화 전반에 걸친 최신 트렌드 중 ` +
        `서로 다른 분야의 가장 영향력 있는 trend 를 알려주세요. ` +
        `정확히 다음 JSON 형식으로 응답해주세요: ` +
        `[ { "title": "트렌드 제목", "summary": "트렌드 설명 및 영향력 분석 (200자 이내)", ` +
        `"published_at": "YYYY-MM-DD", "reference_name": "주요 참고 출처", ` +
        `"reference_url": "참고 URL" } ]`
      )
    })()

    const body = JSON.stringify({
      messages: [
        {
          content: systemContent + '최대한 공유한 출처 위주로 찾아주세요.',
          role: 'system',
        },
        {
          content,
          role: 'user',
        },
      ],
      model: 'llama-3.1-sonar-huge-128k-online',
    })
    const options = {
      body,
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }

    const res = await fetch(
      'https://api.perplexity.ai/chat/completions',
      options,
    )

    return res.json()
  }
}
