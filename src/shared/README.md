# Shared Layer

## Overview
Shared 레이어는 애플리케이션 전반에 걸쳐 사용되는 인프라스트럭처 코드와 유틸리티를 제공합니다.
모든 레이어에서 접근 가능한 유일한 레이어로, 높은 재사용성과 일관성이 요구됩니다.

### 핵심 원칙
- **보편성**: 특정 비즈니스 로직에 종속되지 않음
- **안정성**: 자주 변경되지 않는 안정적인 API 제공
- **독립성**: 다른 레이어에 대한 의존성 없음
- **일관성**: 프로젝트 전반의 일관된 동작 보장

### 설계 제약사항
1. **순수성 유지**
   ```typescript
   // ✅ 올바른 예시: 순수 함수
   export const formatDate = (date: Date, locale: string): string => {
     return new Intl.DateTimeFormat(locale).format(date)
   }

   // ❌ 잘못된 예시: 외부 상태 의존
   export const formatDate = (date: Date): string => {
     return new Intl.DateTimeFormat(globalLocale).format(date) // 전역 상태 의존
   }
   ```

2. **의존성 규칙**
   ```typescript
   // ✅ 허용되는 의존성
   import { type } from './types'
   import { constant } from './constants'

   // ❌ 금지된 의존성
   import { something } from '@/entities/*'
   import { something } from '@/features/*'
   import { something } from '@/widgets/*'
   ```

## Structure
### `ui/`
재사용 가능한 UI 프리미티브
```typescript
// Component Contract
interface IUIComponent<P> {
  props: P & HTMLAttributes
  accessibility: A11Y
  theming: Theme
  behavior: Interaction
}

// Example Implementation
export const Button = styled(BaseButton, {
  variants: {
    size: {
      sm: { padding: '$2 $4' },
      md: { padding: '$4 $6' },
      lg: { padding: '$6 $8' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
```

### `lib/`
핵심 유틸리티 및 헬퍼 함수
```typescript
// Type-safe deep clone
export function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') return obj
  
  if (obj instanceof Date) return new Date(obj) as any
  if (obj instanceof RegExp) return new RegExp(obj) as any
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item)) as any
  }
  
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      deepClone(value)
    ])
  ) as T
}

// Type-safe deep freeze
export function deepFreeze<T>(obj: T): Readonly<T> {
  Object.freeze(obj)
  
  Object.getOwnPropertyNames(obj).forEach(prop => {
    if (
      obj[prop] !== null &&
      (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop])
    }
  })
  
  return obj
}
```

### `api/`
HTTP 클라이언트 및 API 유틸리티
```typescript
// API Client
export class APIClient {
  constructor(
    private readonly baseURL: string,
    private readonly options: APIOptions
  ) {}

  async request<T>({
    method,
    url,
    data,
    headers
  }: RequestConfig): Promise<APIResponse<T>> {
    try {
      const response = await fetch(\`\${this.baseURL}\${url}\`, {
        method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      })
      
      if (!response.ok) {
        throw new APIError(response.statusText, response.status)
      }
      
      return await response.json()
    } catch (error) {
      this.options.onError?.(error)
      throw error
    }
  }
}
```

## Best Practices
### 1. 타입 안전성
```typescript
// Utility Types
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P]
}

type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends object ? DeepReadonly<T[P]> : T[P]
}

// Type Guards
function isError(value: unknown): value is Error {
  return value instanceof Error
}
```

### 2. 성능 최적화
```typescript
// Memoization
export function memoize<T extends Function>(
  fn: T,
  options: MemoizeOptions = {}
): T {
  const cache = new Map()
  const { maxSize = 1000, ttl } = options

  return function (...args: any[]) {
    const key = JSON.stringify(args)
    
    if (cache.has(key)) {
      const { value, timestamp } = cache.get(key)
      if (!ttl || Date.now() - timestamp < ttl) {
        return value
      }
    }
    
    const result = fn.apply(this, args)
    cache.set(key, { value: result, timestamp: Date.now() })
    
    if (cache.size > maxSize) {
      const firstKey = cache.keys().next().value
      cache.delete(firstKey)
    }
    
    return result
  } as any
}
```

### 3. 에러 처리
```typescript
// Error Hierarchy
export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: Record<string, any>
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, any>) {
    super(message, 'VALIDATION_ERROR', details)
  }
}
```

## Testing
```typescript
describe('deepClone', () => {
  it('should handle circular references', () => {
    const obj: any = { a: 1 }
    obj.self = obj
    
    expect(() => deepClone(obj)).not.toThrow()
    const cloned = deepClone(obj)
    expect(cloned).not.toBe(obj)
    expect(cloned.a).toBe(1)
  })
})

describe('APIClient', () => {
  it('should handle network errors', async () => {
    const client = new APIClient('http://localhost')
    
    await expect(
      client.request({ url: '/non-existent' })
    ).rejects.toThrow(APIError)
  })
})
```

## 보안 고려사항
1. **입력 검증**
   - XSS 방지
   - SQL Injection 방지
   - 타입 검증

2. **데이터 보호**
   - 민감 정보 암호화
   - 안전한 직렬화/역직렬화
   - CSRF 토큰 관리

## 모니터링
- 성능 메트릭
- 에러 로깅
- 사용량 통계

## 참고 자료
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Clean Code](https://github.com/ryanmcdermott/clean-code-javascript)
- [OWASP Security Guidelines](https://owasp.org/www-project-web-security-testing-guide/)
