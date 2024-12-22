import type {
  IArticlesListableInput,
  IQuotePeopleListableInput,
  IQuotesListableInput,
} from '../types'

/**
 * 쿼리키 생성 유틸리티 함수
 * @param keys - 쿼리키 배열 (예: ['admin', 'articles', 'list'])
 * @param input - 입력 객체 (선택적)
 */
const createQueryKey = <T extends Record<string, unknown>>(
  keys: string[],
  input?: T,
) => {
  const base = [...keys]

  if (input) {
    base.push(JSON.stringify(input))
  }

  return base
}

/** 관리자 영역 쿼리키 */
const adminQueryKeys = {
  articles: {
    /** 관리자용 게시글 목록 조회 (/admin/articles) */
    list: (input?: IArticlesListableInput) =>
      createQueryKey(['admin', 'articles', 'list'], input),
  },
  quotePeople: {
    /** 관리자용 명언 인물 조회 (/admin/articles) */
    list: (input?: IQuotePeopleListableInput) =>
      createQueryKey(['admin', 'quote-people', 'list'], input),
  },
  quotes: {
    /** 관리자용 명언 조회 (/admin/articles) */
    list: (input?: IQuotesListableInput) =>
      createQueryKey(['admin', 'quotes', 'list'], input),
  },
} as const

/** 일반 사용자 영역 쿼리키 */
const appQueryKeys = {
  articles: {
    /** 일반 사용자용 게시글 목록 조회 (/app/articles) */
    list: (input?: Omit<IArticlesListableInput, 'page' | 'limit'>) =>
      createQueryKey(['app', 'articles', 'list'], input),
  },
} as const

/** 인증 관련 쿼리키 */
const authQueryKeys = {
  /** 현재 인증 세션 조회 */
  getAuthUser: () => createQueryKey(['auth', 'session']),
  /** 현재 로그인한 사용자 정보 조회 */
  getMe: () => createQueryKey(['users', 'me']),
} as const

export const DpQueryKeys = {
  admin: adminQueryKeys,
  app: appQueryKeys,
  auth: authQueryKeys,
} as const
