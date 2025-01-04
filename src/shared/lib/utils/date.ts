import { format } from 'date-fns'

export const formatDate = (date: string | Date) => {
  return format(date, 'yyyy년MM월dd일')
}

/**
 * 날짜 문자열을 년-월-일('yyyy-MM-dd') 포맷으로 변환합니다.
 * 시간 정보는 제외되고 일자까지만 포함됩니다.
 * Date 객체로 파싱 가능한 모든 형식을 지원합니다.
 *
 * @param {string | null | undefined} date - 변환할 날짜 문자열
 * @returns {string | null} 년-월-일('yyyy-MM-dd') 포맷의 날짜 문자열 또는 실패시 null
 *                         시간 정보 없이 일자까지만 반환 (예: '2023-01-25')
 *
 * @example
 * formatToHyphenYyyyMMddDate('2023-12-25 13:30:00') // returns '2023-12-25'
 * formatToHyphenYyyyMMddDate('2023/12/25 15:45') // returns '2023-12-25'
 * formatToHyphenYyyyMMddDate('2023.12.25T14:20') // returns '2023-12-25'
 * formatToHyphenYyyyMMddDate(null) // returns null
 * formatToHyphenYyyyMMddDate('invalid') // returns null
 */
export const formatToHyphenYyyyMMddDate = (
  date: Date | string | null | undefined,
): string | null => {
  if (!date) return null

  try {
    const parsedDate = new Date(date)
    return format(parsedDate, 'yyyy-MM-dd') // 시간 정보 제외, 일자까지만 포맷
  } catch {
    return null
  }
}
