import { getHours } from 'date-fns'

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night'

const greetings: Record<TimeOfDay, string[]> = {
  afternoon: [
    '점심 식사는 하셨나요? 🍚',
    '오후도 힘내봐요! ⭐️',
    '점심 시간 즐거운 하루 되세요! 🌤',
    '맛있는 점심 드셨나요? ☺️',
  ],
  evening: [
    '수고한 하루 마무리해요! 🌙',
    '오늘도 고생 많으셨어요! 🌆',
    '저녁 식사는 맛있게 하셨나요? 🍽',
    '편안한 저녁 시간 보내세요! ✨',
  ],
  morning: [
    '상쾌한 아침이에요! ☀️',
    '좋은 아침이에요! 오늘도 화이팅! 🌅',
    '새로운 하루가 시작됐어요! 🌞',
    '아침부터 열심히 하시네요! 💪',
  ],
  night: [
    '좋은 꿈 꾸세요! 💫',
    '오늘도 수고하셨어요! 🌜',
    '달콤한 밤 되세요! 🌠',
    '푹 쉬고 내일 만나요! 😴',
  ],
}

const getTimeOfDay = (hours: number): TimeOfDay => {
  if (hours >= 5 && hours < 12) return 'morning'
  if (hours >= 12 && hours < 17) return 'afternoon'
  if (hours >= 17 && hours < 21) return 'evening'
  return 'night'
}

export const getGreetingByTime = (): string => {
  const hours = getHours(new Date())
  const timeOfDay = getTimeOfDay(hours)
  const greetingsList = greetings[timeOfDay]

  // 랜덤하게 인사말 선택
  const randomIndex = Math.floor(Math.random() * greetingsList.length)
  return greetingsList[randomIndex]
}
