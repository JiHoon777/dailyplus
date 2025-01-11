import { useSearchParams } from 'next/navigation'

export const useGetBlockName = () => {
  const searchParams = useSearchParams()

  return searchParams.get('block') ?? null
}
