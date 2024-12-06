# Widgets Layer

## Overview
Widgets는 Feature-Sliced Design 아키텍처에서 UI의 독립적인 복합 블록을 담당하는 레이어입니다.
상위 레이어(Pages)와 하위 레이어(Features, Entities) 사이에서 UI 조합을 담당합니다.

### 핵심 원칙
- **조합(Composition)**: Features와 Entities를 조합하여 더 큰 UI 블록 구성
- **독립성(Independence)**: 다른 Widgets와 독립적으로 동작
- **단방향 의존성(Unidirectional Dependencies)**: 상위 레이어(Pages)에서만 참조 가능
- **제한된 책임(Limited Responsibility)**: UI 표현과 레이아웃에만 집중

### 아키텍처 제약사항
1. **상위 레이어 참조 금지**
   - `@pages/*` 임포트 불가
   - 다른 widgets 간 직접 참조 불가

2. **하위 레이어만 참조 가능**
   ```typescript
   // 올바른 예시
   import { UserCard } from '@/entities/user'
   import { AuthForm } from '@/features/auth'
   import { Button } from '@/shared/ui'
   
   // 잘못된 예시
   import { HomePage } from '@/pages/home'
   import { OtherWidget } from '@/widgets/other'
   ```

## Structure
### `layout/`
레이아웃 컴포넌트들의 집합
```typescript
// 레이아웃 컴포넌트의 책임
interface ILayout {
  composition: Features + Entities // UI 블록 조합
  styling: Layout + Spacing // 레이아웃과 간격
  behavior: None // 비즈니스 로직 없음
}
```

- `PageBase/` - 페이지 기본 레이아웃
  - 일관된 페이지 구조 제공
  - 반응형 레이아웃 처리
  - 공통 스타일링 적용

- `AppHomeHeaderBase/` - 앱 헤더
  - 네비게이션 통합
  - 사용자 상태 표시
  - 전역 액션 제공

### `navigation/`
네비게이션 관련 복합 컴포넌트
- 라우팅 상태 반영
- 사용자 권한에 따른 동적 렌더링
- 네비게이션 상태 관리

### `modals/`
모달 및 다이얼로그 시스템
- 전역 모달 상태 관리
- 접근성(A11Y) 표준 준수
- 키보드 인터랙션 처리

## Best Practices
### 1. 명확한 책임 분리
```typescript
// 올바른 예시: UI 조합에만 집중
export const Header = () => {
  return (
    <Container>
      <UserAvatar /> // from @/entities/user
      <AuthButton /> // from @/features/auth
    </Container>
  )
}

// 잘못된 예시: 비즈니스 로직 포함
export const Header = () => {
  const handleAuth = () => { /* 비즈니스 로직 */ }
  return <Container>{/* ... */}</Container>
}
```

### 2. 성능 최적화
```typescript
// 올바른 예시: 메모이제이션 활용
export const ExpensiveWidget = memo(({ data }) => {
  return <ComplexUIStructure data={data} />
})

// 올바른 예시: 지연 로딩
const ModalWidget = lazy(() => import('./ModalWidget'))
```

### 3. 테스트 용이성
```typescript
// widgets/layout/__tests__/Header.test.tsx
describe('Header Widget', () => {
  it('correctly composes child components', () => {
    render(<Header />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })
})
```

## 확장성 고려사항
1. **국제화(i18n) 지원**
   - 텍스트 추출 및 번역 키 관리
   - RTL 레이아웃 지원

2. **테마 시스템**
   - 다크/라이트 모드
   - 커스텀 테마 지원
   - CSS Variables 활용

3. **접근성(A11Y)**
   - ARIA 속성 적용
   - 키보드 네비게이션
   - 스크린 리더 지원

## 모니터링 및 분석
- 성능 메트릭 수집
- 사용자 인터랙션 분석
- 에러 트래킹

## 참고 자료
- [Feature-Sliced Design](https://feature-sliced.design/)
- [React Performance](https://reactjs.org/docs/optimizing-performance.html)
- [WAI-ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)
