export const extractJsonFromText = (text: string): string => {
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
