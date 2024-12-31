# Store Architecture Guide

## Overview

이 프로젝트의 상태 관리는 [Zustand](https://github.com/pmndrs/zustand)를 기반으로 구현되어 있습니다. 각 스토어는 독립적으로 관리되며, 중앙화된 `useStore` 훅을 통해 접근합니다.

## Store Structure

```
src/shared/store/
├── utils/
│   └── createStore.ts    # 스토어 생성 유틸리티
├── Auth.ts              # 인증 관련 스토어
├── Studio.ts            # 스튜디오 관련 스토어
├── Studio.types.ts      # 스튜디오 스토어 타입 정의
└── index.ts            # 중앙 스토어 관리 및 useStore 훅
```

## Usage

### 스토어 사용하기

```typescript
import { useStore } from '@shared/store'

// 인증 스토어 사용
const user = useStore('auth', state => state.me)

// 스튜디오 스토어 사용
const mergingItems = useStore('studio', state => state.mergingItems)
```

### 새로운 스토어 추가하기

1. 스토어의 타입 정의:
```typescript
// YourStore.types.ts
export interface IYourStore {
  // 스토어의 상태 타입 정의
  someState: string
  setSomeState: (value: string) => void
}
```

2. 스토어 구현:
```typescript
// YourStore.ts
import { createStore } from './utils/createStore'
import type { IYourStore } from './YourStore.types'

export const YourStore = createStore<IYourStore>(
  (set) => ({
    someState: '',
    setSomeState: (value) => {
      set((state) => {
        state.someState = value
      })
    },
  }),
  'Your Store'
)
```

3. `index.ts`에 스토어 등록:
```typescript
type StoreMap = {
  auth: IAuthStore
  studio: IStudioStore
  yourStore: IYourStore  // 새로운 스토어 추가
}
```

## Features

- **Type Safety**: 모든 스토어는 TypeScript로 작성되어 있어 타입 안전성이 보장됩니다.
- **Middleware**: 
  - `immer`: 불변성을 쉽게 관리할 수 있도록 immer가 적용되어 있습니다.
  - `devtools`: Redux DevTools를 통해 상태 변화를 추적할 수 있습니다.
- **Centralized Access**: `useStore` 훅을 통해 모든 스토어에 일관된 방식으로 접근할 수 있습니다.

## Best Practices

1. **상태 분리**: 각 스토어는 독립적인 도메인을 가져야 합니다.
2. **명명 규칙**: 
   - 스토어 파일: `PascalCase.ts`
   - 타입 파일: `PascalCase.types.ts`
   - 인터페이스: `I{StoreName}Store`
3. **타입 안전성**: 모든 스토어 상태와 액션에 대한 타입을 명시적으로 정의합니다.
4. **불변성**: 상태 업데이트는 반드시 `set` 함수를 통해 수행합니다.

## Development Tools

상태 디버깅을 위해 [Redux DevTools](https://github.com/reduxjs/redux-devtools)를 사용할 수 있습니다:
1. 브라우저에 Redux DevTools 확장 프로그램을 설치합니다.
2. 개발자 도구에서 Redux 탭을 열어 상태 변화를 추적할 수 있습니다.
