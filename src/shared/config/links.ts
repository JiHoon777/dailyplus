export const DPLinks = {
  admin: {
    articles: {
      list: '/admin/articles',
    },
    quoteAiInterpretations: {
      list: '/admin/quote-ai-interpretations',
    },
    quoteAiStories: {
      list: '/admin/quote-ai-stories',
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
    articles: '/articles',
    home: '/home',
  },
} as const
