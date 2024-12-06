# Entities Layer

## Overview
Entities는 비즈니스 엔티티의 핵심 로직과 데이터 구조를 캡슐화하는 레이어입니다.
시스템의 핵심 도메인 모델을 정의하고, 다른 레이어에서 재사용 가능한 형태로 제공합니다.

### 핵심 원칙
- **비즈니스 로직 캡슐화**: 도메인 규칙과 유효성 검사 포함
- **상태 관리 독립성**: 자체적인 상태 관리 메커니즘
- **재사용성**: 여러 기능에서 공통으로 사용
- **불변성**: 엔티티의 무결성 보장

### 아키텍처 제약사항
1. **순수한 도메인 로직**
   ```typescript
   // ✅ 올바른 예시: 순수한 도메인 로직
   class User {
     private readonly id: string;
     private email: Email; // Value Object
     private password: HashedPassword; // Value Object

     validate(): ValidationResult {
       return this.email.isValid() && this.password.isValid();
     }
   }

   // ❌ 잘못된 예시: UI 로직 포함
   class User {
     render() { /* UI 로직 */ }
   }
   ```

2. **의존성 규칙**
   ```typescript
   // ✅ 허용되는 의존성
   import { type } from '@/shared/types'
   import { utils } from '@/shared/utils'

   // ❌ 금지된 의존성
   import { something } from '@/features/*'
   import { something } from '@/widgets/*'
   import { something } from '@/pages/*'
   ```

## Structure
### `model/`
```typescript
// Domain Model
interface IEntity<T extends string> {
  id: T
  createdAt: Date
  updatedAt: Date
}

// Value Objects
class Email {
  private readonly value: string
  constructor(email: string) {
    if (!this.validate(email)) throw new InvalidEmailError(email)
    this.value = email
  }
  private validate(email: string): boolean {
    return /^[^@]+@[^@]+\.[^@]+$/.test(email)
  }
}
```

### `api/`
```typescript
// Repository Pattern
interface IRepository<T extends IEntity<string>> {
  findById(id: string): Promise<T>
  save(entity: T): Promise<void>
  delete(id: string): Promise<void>
}

// API Layer
class UserAPI implements IRepository<User> {
  async findById(id: string): Promise<User> {
    const response = await this.client.get(\`/users/\${id}\`)
    return User.fromDTO(response.data)
  }
}
```

### `lib/`
```typescript
// Domain Services
class UserService {
  constructor(private readonly repository: IRepository<User>) {}

  async authenticate(email: string, password: string): Promise<AuthResult> {
    const user = await this.repository.findByEmail(email)
    return user.verifyPassword(password)
  }
}
```

## Best Practices
### 1. 도메인 주도 설계 (DDD) 원칙 적용
```typescript
// Aggregate Root
class Order implements IAggregateRoot {
  private readonly orderItems: OrderItem[]
  private status: OrderStatus

  addItem(item: OrderItem): Result<void> {
    if (this.status !== OrderStatus.Draft) {
      return Result.failure('Cannot modify confirmed order')
    }
    this.orderItems.push(item)
    return Result.success()
  }
}
```

### 2. 불변성과 캡슐화
```typescript
// Value Object Pattern
class Money {
  private constructor(
    private readonly amount: number,
    private readonly currency: Currency
  ) {}

  static of(amount: number, currency: Currency): Money {
    return new Money(amount, currency)
  }

  add(other: Money): Money {
    if (this.currency !== other.currency) {
      throw new InvalidCurrencyError()
    }
    return Money.of(this.amount + other.amount, this.currency)
  }
}
```

### 3. 타입 안전성
```typescript
// Branded Types
type UserId = string & { readonly brand: unique symbol }
type Email = string & { readonly brand: unique symbol }

function createUser(email: Email): User<UserId> {
  return new User(generateUserId(), email)
}
```

## Testing
```typescript
describe('User Entity', () => {
  it('should validate email format', () => {
    expect(() => new Email('invalid')).toThrow(InvalidEmailError)
    expect(() => new Email('valid@email.com')).not.toThrow()
  })

  it('should hash password before saving', async () => {
    const user = await User.create({
      email: 'test@example.com',
      password: 'password123'
    })
    expect(user.password).not.toBe('password123')
    expect(user.password).toMatch(/^\$2[ayb]\$.{56}$/) // bcrypt format
  })
})
```

## 성능 고려사항
1. **메모리 최적화**
   - Flyweight 패턴 활용
   - Value Objects 공유
   - 순환 참조 방지

2. **데이터 일관성**
   - Optimistic Locking
   - Version Control
   - Event Sourcing

## 모니터링 및 디버깅
- Entity 생명주기 추적
- 상태 변경 감사(Audit)
- 성능 메트릭 수집

## 참고 자료
- [Domain-Driven Design](https://martinfowler.com/tags/domain%20driven%20design.html)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [CQRS Pattern](https://martinfowler.com/bliki/CQRS.html)
