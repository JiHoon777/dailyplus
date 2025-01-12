import type {
  BlockTitle,
  IStoryContent,
  StoryMessages,
  StoryMessageType,
} from '../types'

import { createStore } from './utils/createStore'

/** 스토리 플레이어의 상태를 나타내는 타입 */
export type PlayerStatus = 'idle' | 'playing' | 'paused'

/** 스토리 플레이어 스토어의 public API */
export type IStudioStoryPlayerStore = {
  // 현재 상태
  status: PlayerStatus
  currentBlock: BlockTitle
  messageHistory: StoryMessages[]

  // 플레이어 제어
  init: (content: IStoryContent) => void
  play: () => void
  pause: () => void
  next: () => void
  previous: () => void
  jumpToBlock: (blockTitle: BlockTitle) => void
  chooseOption: (choice: BlockTitle) => void
  setPlaybackSpeed: (speed: number) => void

  // 상태 확인
  canGoNext: () => boolean
  canGoPrevious: () => boolean
  getCurrentMessage: () => StoryMessages | null
  getMessageType: () => StoryMessageType | null
  isLastMessage: () => boolean
  getPlaybackSpeed: () => number
}

/** 플레이어의 private 상태 */
type PrivateState = {
  storyContent: IStoryContent
  playbackSpeed: number
  choiceHistory: Array<{
    fromBlock: BlockTitle
    toBlock: BlockTitle
    choiceIndex: number
  }>
  messageIndex: number
  currentBlockMessages: StoryMessages[]

  autoPlayTimer?: NodeJS.Timeout
}

export const StudioStoryPlayerStore = createStore<IStudioStoryPlayerStore>(
  (set, get) => {
    // 클로저로 관리되는 private 상태
    const $state: PrivateState = {
      storyContent: {} as IStoryContent,
      playbackSpeed: 1,
      choiceHistory: [],
      messageIndex: -1,
      currentBlockMessages: [],
    }

    /** 자동 재생 타이머를 정리하는 유틸리티 함수 */
    const $clearAutoPlayTimer = () => {
      if ($state.autoPlayTimer) {
        clearTimeout($state.autoPlayTimer)
        $state.autoPlayTimer = undefined
      }
    }

    /** 메시지 타입별 재생 딜레이를 계산하는 함수 */
    const $getMessageDelay = (message: StoryMessages) => {
      const baseDelay = 2000 // 기본 2초
      const speed = $state.playbackSpeed

      switch (message.type) {
        case 'chat':
          // 메시지 길이에 따라 동적으로 계산 (100자당 1초 추가)
          return (
            (baseDelay + Math.floor(message.message.length / 100) * 1000) /
            speed
          )
        case 'script':
          // 스크립트는 좀 더 긴 시간 부여
          return (
            (baseDelay * 1.5 + Math.floor(message.message.length / 80) * 1000) /
            speed
          )
        case 'choice':
          // 선택지는 자동 재생하지 않음
          return 0
        default:
          return baseDelay / speed
      }
    }

    /** 다음 메시지 자동 재생을 스케줄링하는 함수 */
    const $scheduleNextMessage = () => {
      const state = get()
      if (state.status !== 'playing') return

      const nextMessage =
        $state.messageIndex < 0
          ? $state.currentBlockMessages[0]
          : $state.currentBlockMessages[$state.messageIndex + 1]

      if (!nextMessage) return

      // 선택지에서는 자동 재생 중지
      if (nextMessage.type === 'choice') {
        set((state) => {
          if (state.status === 'playing') {
            state.status = 'paused'
          }
        })
        return
      }

      const delay = $getMessageDelay(nextMessage)
      $state.autoPlayTimer = setTimeout(() => {
        get().next()
        $scheduleNextMessage()
      }, delay)
    }

    // Private 메서드들
    const $getStoryContent = () => $state.storyContent
    const $getCurrentBlock = () =>
      $getStoryContent().blocksMap[get().currentBlock]
    const $getMessages = () => $getCurrentBlock()?.messages || []

    return {
      // 초기 상태
      status: 'idle' as PlayerStatus,
      currentBlock: '',
      messageHistory: [],

      /** 스토리 콘텐츠를 초기화하고 플레이어를 준비상태로 만듭니다 */
      init: (content) => {
        $state.storyContent = content
        $state.messageIndex = -1
        $state.currentBlockMessages =
          content.blocksMap[content.startBlockTitle].messages

        $clearAutoPlayTimer()
        set((state) => {
          state.status = 'idle'
          state.currentBlock = content.startBlockTitle
          state.messageHistory = []
        })
      },

      /** 자동 재생을 시작합니다 */
      play: () => {
        set({ status: 'playing' })
        $scheduleNextMessage()
      },

      /** 자동 재생을 일시 중지합니다 */
      pause: () => {
        $clearAutoPlayTimer()
        set({ status: 'paused' })
      },

      /** 다음 메시지로 이동합니다 */
      next: () => {
        $clearAutoPlayTimer()
        set((state) => {
          if (!state.canGoNext()) return state

          const nextIndex = $state.messageIndex + 1
          const currentMessage = $getMessages()[nextIndex]

          if (currentMessage?.type === 'choice') {
            $state.messageIndex = nextIndex

            if (state.status === 'playing') {
              state.status = 'paused'
            }
            state.messageHistory = [...state.messageHistory, currentMessage]

            return
          }

          // 자동 재생 중이면 다음 메시지 예약
          if (state.status === 'playing') {
            $scheduleNextMessage()
          }

          $state.messageIndex = nextIndex
          state.messageHistory = [...state.messageHistory, currentMessage]
        })
      },

      /** 이전 메시지로 이동합니다 */
      previous: () => {
        $clearAutoPlayTimer()
        set((state) => {
          if (!state.canGoPrevious()) return state

          $state.messageIndex -= 1

          if (state.status === 'playing') {
            state.status = 'paused'
          }
          state.messageHistory = state.messageHistory.slice(0, -1)
        })
      },

      /** 특정 블록으로 즉시 이동합니다 */
      jumpToBlock: (blockTitle) => {
        $clearAutoPlayTimer()
        const block = $getStoryContent().blocksMap[blockTitle]
        if (!block) {
          return
        }

        $state.messageIndex = -1
        $state.currentBlockMessages = block.messages
        set((state) => {
          state.status = 'paused'
          state.currentBlock = blockTitle
          state.messageHistory = []
        })
      },

      /** 현재 선택지에서 특정 옵션을 선택합니다 */
      chooseOption: (choice) => {
        $clearAutoPlayTimer()
        set((state) => {
          const currentMessage = state.getCurrentMessage()
          if (currentMessage?.type !== 'choice') {
            return state
          }

          const choiceIndex = currentMessage.choices.indexOf(choice)
          if (choiceIndex === -1) {
            return state
          }

          // 선택 기록 저장
          $state.choiceHistory.push({
            fromBlock: state.currentBlock,
            toBlock: choice,
            choiceIndex,
          })

          $state.currentBlockMessages =
            $getStoryContent().blocksMap[choice].messages
          $state.messageIndex = -1

          // 새 블록으로 이동
          state.status = 'playing'
          state.currentBlock = choice
          state.messageHistory = []
        })
      },

      /** 재생 속도를 설정합니다 (0.5 ~ 2.0) */
      setPlaybackSpeed: (speed) => {
        $state.playbackSpeed = Math.max(0.5, Math.min(2.0, speed))
        // 재생 중이면 현재 타이머를 클리어하고 새로운 속도로 다시 스케줄링
        if (get().status === 'playing') {
          $clearAutoPlayTimer()
          $scheduleNextMessage()
        }
      },

      /** 다음 메시지로 이동 가능한지 확인합니다 */
      canGoNext: () => {
        return $state.messageIndex < $getMessages().length - 1
      },

      /** 이전 메시지로 이동 가능한지 확인합니다 */
      canGoPrevious: () => {
        return $state.messageIndex > -1
      },

      /** 현재 메시지를 반환합니다 */
      getCurrentMessage: () => {
        return $state.messageIndex >= 0
          ? $getMessages()[$state.messageIndex]
          : null
      },

      /** 현재 메시지의 타입을 반환합니다 */
      getMessageType: () => {
        return get().getCurrentMessage()?.type || null
      },

      /** 현재 블록의 마지막 메시지인지 확인합니다 */
      isLastMessage: () => {
        return $state.messageIndex === $getMessages().length - 1
      },

      /** 현재 재생 속도를 반환합니다 */
      getPlaybackSpeed: () => $state.playbackSpeed,
    }
  },
  'Studio Story Player Store',
)
