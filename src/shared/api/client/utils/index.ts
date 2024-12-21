export const getPaginationRange = (page: number, limit: number) => {
  const from = (page - 1) * limit
  const to = from + limit - 1

  return { from, to }
}

export const createListableResponse = <T>(
  data: T[] | null,
  count: number | null,
  error: Error | null,
) => {
  return {
    data: data ?? [],
    error,
    totalCount: count ?? 0,
  }
}
