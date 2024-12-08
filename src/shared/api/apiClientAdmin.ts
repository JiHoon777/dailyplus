import type { PerplexityResponse } from '../types'
import type { ArticleType } from '../types/entity.types'
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

  getUsers({ page = 1, limit = 10 }: { page: number; limit: number }) {
    const from = (page - 1) * limit
    const to = from + limit - 1

    return this.supabaseClient
      .from('users')
      .select('*', { count: 'exact' })
      .range(from, to)
  }

  getArticles({ page = 1, limit = 10 }: { page: number; limit: number }) {
    const from = (page - 1) * limit
    const to = from + limit - 1

    return this.supabaseClient
      .from('articles')
      .select('*', { count: 'exact' })
      .range(from, to)
  }

  // Todo: 분리
  async getArticlesByPerplexity(
    content: string,
    type: ArticleType,
    startDate: string, // YYYY-MM-DD
    endDate: string, // YYYY-MM-DD
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
    }

    const dateInstruction =
      `${startDate}부터 ${endDate} 사이에 작성된 article만 선택해주세요. ` +
      `각 뉴스는 고유해야 하며, 다른 매체의 동일 내용 보도는 가장 상세한 하나만 선택해주세요.`

    const systemContent = (() => {
      // analyze news
      if (type === 'korea-news' || type === 'world-news' || type === 'it') {
        return (
          `당신은 ${type} 뉴스 분석가입니다. ` +
          `다음 신뢰할 수 있는 출처의 뉴스만 선택해주세요: ${trustedSources[type]}. ` +
          dateInstruction +
          ' ' +
          `최신 뉴스 중 중요도와 영향력이 큰 뉴스 3개를 선택하되, ` +
          `각 뉴스는 서로 다른 주제를 다뤄야 합니다. ` +
          `정확히 다음 JSON 형식으로 응답해주세요: ` +
          `[ { "title": "뉴스 제목", "summary": "뉴스 요약 (200자 이내)", "published_at": "YYYY-MM-DD", ` +
          `"referenceName": "위에 명시된 매체 중 하나", "referenceUrl": "원본 기사 URL", ` +
          `"uniqueId": "제목과 URL을 조합한 고유 식별자" } ]`
        )
      }

      // analyze tech blog post
      if (type === 'ai' || type === 'front-end' || type === 'back-end') {
        return (
          `당신은 ${type} 기술 전문가입니다. ` +
          `다음 공식/신뢰할 수 있는 출처의 정보만 선택해주세요: ${trustedSources[type]}. ` +
          dateInstruction +
          ' ' +
          `글로벌 기술 트렌드와 한국 기업의 기술 적용 사례를 균형있게 선택해주세요. ` +
          `최신 업데이트나 중요한 기술 변경사항 위주로 3개를 선택하되, ` +
          `각 포스트는 서로 다른 기술/프레임워크에 대한 내용이어야 합니다. ` +
          `글로벌 업데이트 1-2개와 한국 기업의 기술 적용 사례 1-2개를 포함해주세요. ` +
          `정확히 다음 JSON 형식으로 응답해주세요: ` +
          `[ { "title": "제목", "summary": "주요 변경사항 및 영향도 요약 (200자 이내)", ` +
          `"published_at": "YYYY-MM-DD", "referenceName": "위에 명시된 출처 중 하나", ` +
          `"referenceUrl": "원본 URL", "uniqueId": "제목과 URL을 조합한 고유 식별자" } ]`
        )
      }

      // analyze trend
      return (
        `당신은 디지털 트렌드 분석가입니다. ` +
        dateInstruction +
        ' ' +
        `소셜 미디어, 기술, 문화 전반에 걸친 최신 트렌드 중 ` +
        `서로 다른 분야의 가장 영향력 있는 3개를 선택하여 ` +
        `정확히 다음 JSON 형식으로 응답해주세요: ` +
        `[ { "title": "트렌드 제목", "summary": "트렌드 설명 및 영향력 분석 (200자 이내)", ` +
        `"published_at": "YYYY-MM-DD", "referenceName": "주요 참고 출처", ` +
        `"referenceUrl": "참고 URL", "uniqueId": "제목과 URL을 조합한 고유 식별자" } ]`
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
    const options = {
      body,
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
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
