// 날짜 형식 검증 및 정제를 위한 유틸리티 함수
export const sanitizePublishedDate = (
  date: string | null | undefined,
): string | null => {
  if (!date) return null

  // YYYY-MM-DD 형식 검증
  const dateRegex = /^\d{4}(-\d{2}(-\d{2})?)?$/
  if (dateRegex.test(date)) {
    return date
  }

  // 년도만 있는 경우 처리 (예: "2023년")
  const yearMatch = date.match(/\d{4}/)
  if (yearMatch) {
    return `${yearMatch[0]}-01-01` // 년도만 반환
  }

  return null
}
