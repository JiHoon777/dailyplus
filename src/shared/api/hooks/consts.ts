export const userQueryKeys = {
  session: () => ['auth', 'session'] as const,
  me: () => ['users', 'me'] as const,
}
