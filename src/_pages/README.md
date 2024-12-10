# Pages Layer

## Overview
Pages 레이어는 애플리케이션의 페이지 컴포넌트들을 관리하는 최상위 UI 레이어입니다.
각 페이지는 Widgets, Features, Entities를 조합하여 완성된 UI를 구성합니다.

### 핵심 원칙
- **Composition**: 하위 레이어 컴포넌트들의 조합
- **Routing**: 라우팅 로직과 페이지 전환
- **Layout**: 페이지 레이아웃 구성
- **State Management**: 페이지 수준의 상태 관리

### 아키텍처 제약사항
1. **의존성 규칙**
   ```typescript
   // 올바른 import
   import { Widget } from '@/widgets/component'
   import { Feature } from '@/features/component'
   import { Entity } from '@/entities/component'
   import { utils } from '@/shared/utils'

   // 잘못된 import
   import { OtherPage } from '@/pages/other'  // 페이지 간 직접 import 금지
   ```

## Structure
### 페이지 구조
```typescript
// 표준 페이지 구조
export const HomePage: FC = () => {
  return (
    <PageLayout>
      <Header />        // from @/widgets/layout
      <MainContent>     // from @/widgets/layout
        <UserProfile /> // from @/features/user
        <Feed />        // from @/features/feed
      </MainContent>
      <Sidebar />      // from @/widgets/layout
    </PageLayout>
  )
}
```

### 라우팅 통합
```typescript
// Next.js App Router 구조
app/
  ├─ (auth)/          // 인증 관련 라우트 그룹
  │   ├─ login/
  │   └─ register/
  ├─ (main)/          // 메인 컨텐츠 라우트 그룹
  │   ├─ dashboard/
  │   └─ profile/
  └─ layout.tsx       // 루트 레이아웃

// 페이지 컴포넌트
export default function DashboardPage() {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<LoadingSpinner />}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  )
}
```

## Best Practices
### 1. 성능 최적화
```typescript
// Code Splitting
const HeavyFeature = lazy(() => import('@/features/heavy'))

// Preloading
const preloadFeature = () => {
  const componentPromise = import('@/features/heavy')
  return componentPromise
}

// Usage in page
export const FeaturePage: FC = () => {
  useEffect(() => {
    // Preload on page mount
    preloadFeature()
  }, [])

  return (
    <Suspense fallback={<Skeleton />}>
      <HeavyFeature />
    </Suspense>
  )
}
```

### 2. SEO 최적화
```typescript
// Metadata 관리
export const metadata = {
  title: 'Dashboard | MyApp',
  description: 'View your personalized dashboard',
  openGraph: {
    title: 'Dashboard | MyApp',
    description: 'View your personalized dashboard',
    images: ['/og-image.jpg'],
  },
}

// 구조화된 데이터
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Dashboard',
  description: 'User dashboard showing personalized content',
}
```

### 3. 접근성
```typescript
// 키보드 네비게이션
export const AccessiblePage: FC = () => {
  const handleKeyDown = (event: KeyboardEvent) => {
    switch(event.key) {
      case 'Tab':
        // Focus management
        break
      case 'Escape':
        // Close modals
        break
    }
  }

  return (
    <div
      role="main"
      aria-label="Main content"
      onKeyDown={handleKeyDown}
    >
      <SkipLink />
      <MainContent />
    </div>
  )
}
```

## Testing
```typescript
describe('HomePage', () => {
  it('should render all required sections', () => {
    const { getByRole } = render(<HomePage />)
    
    expect(getByRole('banner')).toBeInTheDocument()
    expect(getByRole('main')).toBeInTheDocument()
    expect(getByRole('complementary')).toBeInTheDocument()
  })

  it('should handle loading states', async () => {
    const { getByRole, findByRole } = render(
      <Suspense fallback={<LoadingSpinner />}>
        <HomePage />
      </Suspense>
    )
    
    expect(getByRole('progressbar')).toBeInTheDocument()
    await findByRole('main')
  })
}
```

## 성능 최적화
1. **초기 로딩 최적화**
   - Route-based code splitting
   - Preloading/Prefetching
   - Critical CSS 인라인

2. **렌더링 최적화**
   - 컴포넌트 메모이제이션
   - 가상화(Virtualization)
   - 이미지 최적화

3. **상태 관리**
   - 페이지 수준 상태 격리
   - 불필요한 리렌더링 방지
   - 메모리 누수 방지

## 모니터링
- 페이지 로드 성능
- 사용자 인터랙션
- 에러 발생률

## 참고 자료
- [Next.js Documentation](https://nextjs.org/docs)
- [React Router](https://reactrouter.com/)
- [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/)
