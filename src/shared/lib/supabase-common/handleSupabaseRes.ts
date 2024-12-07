type SupabaseResponse<T, E extends Error | null> = {
  data: T | { [K in keyof T]: T[K] | null }
  error: E
}

export const handleSupabaseRes = <T, E extends Error | null>({
  data,
  error,
}: SupabaseResponse<T, E>): T => {
  if (error) {
    throw error
  }

  return data as T
}
