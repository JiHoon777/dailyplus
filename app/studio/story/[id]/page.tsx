'use client'

import type { IStoryContent } from '@/shared/types'

import { useEffect } from 'react'

import { useStore } from '@/shared/store'
import { DPage } from '@/shared/ui'

import { useGetBlockName } from './_hooks'
import { StudioStoryEditor } from './_ui'

const mock: IStoryContent = {
  startBlockTitle: '시작',
  blocksMap: {
    시작: {
      title: '시작',
      messages: [
        {
          chrName: '나그네',
          message:
            '길을 걷다 지친 나그네는 한 마을에 도착했습니다. 그곳에서 제자들을 가르치고 있는 공자를 만났습니다.',
        },
        {
          chrName: '공자',
          isMainChr: true,
          message: '젊은이여, 무엇을 찾아 이곳까지 왔는가?',
        },
        {
          chrName: '나그네',
          message: '스승님, 제가 찾는 것은...',
          choices: ['지혜', '부', '명예'],
        },
      ],
    },
    지혜: {
      title: '지혜',
      messages: [
        {
          chrName: '나그네',
          message:
            '저는 세상의 이치를 알고 싶습니다. 참된 지혜를 찾아 여기까지 왔습니다.',
        },
        {
          chrName: '공자',
          isMainChr: true,
          message:
            '지혜를 구하는 자는 먼저 자신을 알아야 하느니라. 네가 진정 알고 싶은 것은 무엇인가?',
          choices: ['인간의 본성', '올바른 통치법', '예절의 의미'],
        },
      ],
    },
    부: {
      title: '부',
      messages: [
        {
          chrName: '나그네',
          message: '저는 큰 부자가 되고 싶습니다. 어떻게 해야 할까요?',
        },
        {
          chrName: '공자',
          isMainChr: true,
          message:
            '재물은 물과 같아서 잘 흐르게 해야 하느니라. 네가 재물을 구하는 이유는 무엇인가?',
          choices: ['가족을 위해', '개인의 안락', '사회 공헌'],
        },
      ],
    },
    명예: {
      title: '명예',
      messages: [
        {
          chrName: '나그네',
          message: '저는 모든 사람이 존경하는 인물이 되고 싶습니다.',
        },
        {
          chrName: '공자',
          isMainChr: true,
          message:
            '명예는 덕의 그림자와 같으니, 덕을 좇으면 명예는 저절로 따라오느니라. 어떤 덕을 쌓고 싶은가?',
          choices: ['충성', '효도', '정의'],
        },
      ],
    },
    '인간의 본성': {
      title: '인간의 본성',
      messages: [
        {
          chrName: '공자',
          isMainChr: true,
          message:
            '사람의 본성은 서로 비슷하나 습관으로 달라지느니라. 네가 가진 습관부터 돌아보아라.',
        },
        {
          chrName: '나그네',
          message: '깊이 깨달았습니다. 제 자신을 먼저 살피겠습니다.',
        },
      ],
    },
    '올바른 통치법': {
      title: '올바른 통치법',
      messages: [
        {
          chrName: '공자',
          isMainChr: true,
          message:
            '백성을 다스리는 자는 먼저 자신을 다스려야 하며, 법보다 덕으로 다스려야 하느니라.',
        },
        {
          chrName: '나그네',
          message: '덕치의 중요성을 이해했습니다. 감사합니다.',
        },
      ],
    },
    '예절의 의미': {
      title: '예절의 의미',
      messages: [
        {
          chrName: '공자',
          isMainChr: true,
          message:
            '예는 형식이 아닌 마음에서 우러나와야 하느니라. 진심어린 공경심이 예의 근본이니라.',
        },
        {
          chrName: '나그네',
          message: '예절의 진정한 의미를 깨달았습니다.',
        },
      ],
    },
    '가족을 위해': {
      title: '가족을 위해',
      messages: [
        {
          chrName: '공자',
          isMainChr: true,
          message:
            '가족을 사랑하는 마음은 귀하도다. 하지만 정당한 방법으로 부를 쌓아야 하느니라.',
        },
        {
          chrName: '나그네',
          message: '올바른 방법으로 가족을 부양하겠습니다.',
        },
      ],
    },
    '개인의 안락': {
      title: '개인의 안락',
      messages: [
        {
          chrName: '공자',
          isMainChr: true,
          message:
            '안락만을 좇다보면 덕을 잃기 쉬우니, 절제하는 마음을 배워야 하느니라.',
        },
        {
          chrName: '나그네',
          message: '사치를 경계하고 절제하며 살겠습니다.',
        },
      ],
    },
    '사회 공헌': {
      title: '사회 공헌',
      messages: [
        {
          chrName: '공자',
          isMainChr: true,
          message:
            '재물로 세상을 이롭게 하고자 하는 마음이 가장 귀하니라. 그대의 뜻이 높도다.',
        },
        {
          chrName: '나그네',
          message: '부를 통해 세상에 기여하는 삶을 살겠습니다.',
        },
      ],
    },
    충성: {
      title: '충성',
      messages: [
        {
          chrName: '공자',
          isMainChr: true,
          message:
            '윗사람을 섬김에 있어 진심을 다하되, 올바른 도를 좇아야 하느니라.',
        },
        {
          chrName: '나그네',
          message: '올바른 길을 걸으며 충성하겠습니다.',
        },
      ],
    },
    효도: {
      title: '효도',
      messages: [
        {
          chrName: '공자',
          isMainChr: true,
          message:
            '효는 모든 덕의 근본이니라. 부모를 공경하는 마음으로 시작하여 세상을 사랑하는 마음을 배우게 되느니라.',
        },
        {
          chrName: '나그네',
          message: '효도를 실천하며 살겠습니다.',
        },
      ],
    },
    정의: {
      title: '정의',
      messages: [
        {
          chrName: '공자',
          isMainChr: true,
          message:
            '옳은 것을 위해 싸우되, 자신의 이익을 좇지 말아야 하느니라. 정의로운 자는 홀로 걷는 법이니라.',
        },
        {
          chrName: '나그네',
          message: '정의로운 길을 걸으며 살겠습니다.',
        },
      ],
    },
  },
}

export default function Post() {
  //   const { id } = useParams()
  const initNavigation = useStore('studioStoryNavigation').getState().init
  const initEditor = useStore('studioStoryEditor').getState().init
  const blockKey = useGetBlockName()

  useEffect(() => {
    initNavigation(mock)
    initEditor(mock, blockKey ?? '')
  }, [initNavigation, initEditor, blockKey])

  return (
    <DPage className="flex-row gap-6">
      {/* <StudioStoryNavigation /> */}
      <StudioStoryEditor />
    </DPage>
  )
}
