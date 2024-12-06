# App Layer

## Overview
App 레이어는 애플리케이션의 초기화와 전역 상태를 관리하는 최상위 레이어입니다.
모든 레이어를 조율하고 애플리케이션의 라이프사이클을 관리합니다.

### 핵심 원칙
- **Composition Root**: 의존성 주입과 초기화의 중심점
- **Global State**: 전역 상태 관리 및 공유
- **환경 설정**: 앱 전반의 설정 관리
- **Error Boundary**: 전역 에러 처리

### 아키텍처 제약사항
1. **단방향 의존성**
   ```typescript
   // ✅ 올바른 구조
   app/
     ├─ providers/      // 전역 Context Providers
     ├─ store/          // 전역 상태 관리
     ├─ styles/         // 전역 스타일
     └─ config/         // 환경 설정

   // ❌ 잘못된 구조: 비즈니스 로직 포함
   app/
     └─ features/       // 비즈니스 로직은 features 레이어로
   ```

## Structure
### `providers/`
전역 Context Provider 관리
```typescript
// Provider Composition
export const AppProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <StrictMode>
        <ThemeProvider>
          <StoreProvider>
            <RouterProvider>
              <QueryClientProvider>
                <AuthProvider>
                  {children}
                </AuthProvider>
              </QueryClientProvider>
            </RouterProvider>
          </StoreProvider>
        </ThemeProvider>
      </StrictMode>
    </ErrorBoundary>
  )
}
```

### `store/`
전역 상태 관리 설정
```typescript
// Store Configuration
export const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    // ... other reducers
  },
  middleware: (getDefault) => getDefault()
    .concat(errorMiddleware)
    .concat(analyticsMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

// Type-safe store usage
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

### `styles/`
전역 스타일 시스템
```typescript
// Theme Configuration
export const theme = {
  colors: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      // ... color scale
    },
    // ... other color tokens
  },
  spacing: {
    0: '0',
    1: '0.25rem',
    // ... spacing scale
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    // ... breakpoints
  },
} as const

// Type-safe theme usage
type Theme = typeof theme
declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
```

## Best Practices
### 1. 환경 설정 관리
```typescript
// Environment Configuration
const envConfig = {
  development: {
    apiUrl: 'http://localhost:3000',
    debug: true,
  },
  production: {
    apiUrl: process.env.API_URL,
    debug: false,
  },
  test: {
    apiUrl: 'http://localhost:3000',
    debug: true,
  },
} as const

// Type-safe config access
type Env = keyof typeof envConfig
const currentEnv = process.env.NODE_ENV as Env
export const config = envConfig[currentEnv]
```

### 2. 에러 처리
```typescript
// Global Error Boundary
export class AppErrorBoundary extends Component<
  PropsWithChildren<{
    fallback: ReactNode
  }>,
  { hasError: boolean }
> {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 로깅 서비스로 전송
    errorReportingService.captureError(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}
```

### 3. 성능 최적화
```typescript
// Performance Monitoring
export const AppMetrics = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Web Vitals 측정
      webVitals.getCLS(metric => sendToAnalytics(metric))
      webVitals.getFID(metric => sendToAnalytics(metric))
      webVitals.getLCP(metric => sendToAnalytics(metric))
    }
  }, [])

  return null
}
```

## Testing
```typescript
describe('App Configuration', () => {
  it('should load correct environment config', () => {
    process.env.NODE_ENV = 'production'
    
    expect(config.debug).toBe(false)
    expect(config.apiUrl).toBe(process.env.API_URL)
  })
})

describe('Error Boundary', () => {
  it('should catch rendering errors', () => {
    const ThrowError = () => {
      throw new Error('Test error')
    }
    
    const { getByText } = render(
      <AppErrorBoundary fallback={<div>Error occurred</div>}>
        <ThrowError />
      </AppErrorBoundary>
    )
    
    expect(getByText('Error occurred')).toBeInTheDocument()
  })
})
```

## 모니터링 및 분석
1. **성능 모니터링**
   - Core Web Vitals
   - React Profiler 데이터
   - 메모리 사용량

2. **에러 트래킹**
   - 전역 에러 캡처
   - 비동기 에러 처리
   - 에러 리포팅

3. **사용자 분석**
   - 페이지 뷰
   - 사용자 행동
   - 성능 메트릭

## 보안
- CSP(Content Security Policy) 설정
- 환경 변수 관리
- 인증/인가 흐름

## 참고 자료
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Web Vitals](https://web.dev/vitals/)
