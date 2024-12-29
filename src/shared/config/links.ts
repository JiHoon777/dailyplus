type QueryParams = Record<string, string | number | boolean | undefined | null>
export const appendQueryParams = (
  url: string,
  params?: QueryParams,
): string => {
  if (!params) return url

  const queryParams = Object.entries(params)
    .filter(([_, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`,
    )
    .join('&')

  return queryParams ? `${url}?${queryParams}` : url
}

export const DPLinks = {
  admin: {
    aiStories: {
      list: '/admin/ai-stories',
    },
    articles: {
      list: '/admin/articles',
    },
    quoteAiInterpretations: {
      list: '/admin/quote-ai-interpretations',
    },
    quotePeople: {
      list: '/admin/quote-people',
    },
    quotes: {
      list: '/admin/quotes',
    },
    users: {
      list: '/admin/users',
    },
  },
  app: {
    articles: {
      list: (queryParams?: QueryParams) =>
        appendQueryParams('/articles', queryParams),
    },
    home: (queryParams?: QueryParams) =>
      appendQueryParams('/home', queryParams),
  },
  studio: {
    aiStories: {
      detail: (id: number) => `/studio/ai-stories/${id}`,
    },
    new: '/studio/new',
  },
} as const
