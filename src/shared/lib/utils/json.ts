/**
 * 주어진 텍스트에서 JSON 배열을 추출하는 함수입니다.
 *
 * 이 함수는 다음과 같은 순서로 JSON을 찾습니다:
 * 1. 삼중 백틱(```)으로 둘러싸인 JSON 블록을 먼저 찾습니다.
 * 2. 삼중 백틱 블록이 없다면, 대괄호([])로 둘러싸인 JSON 배열을 찾습니다.
 * 3. 둘 다 찾지 못한 경우, 입력받은 텍스트를 그대로 반환합니다.
 *
 * @param text - JSON을 추출할 대상 텍스트
 * @returns 추출된 JSON 문자열
 */
export const extractJsonArrayFromText = (text: string): string => {
  // JSON 블록 찾기
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (jsonMatch) {
    return jsonMatch[1].trim()
  }

  // JSON 블록이 없으면 전체 텍스트에서 [] 블록 찾기
  const arrayMatch = text.match(/\[\s*{[\s\S]*}\s*\]/)
  if (arrayMatch) {
    return arrayMatch[0].trim()
  }

  return text.trim()
}
