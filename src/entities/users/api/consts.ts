export const userQueryKeys = {
  session: () => ['auth', 'session'] as const,
  user: (authId: string) => ['users', authId] as const,
}
