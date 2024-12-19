# InfiniteListableQueryLoader 개선사항

## 잘된 점

### 1. 타입 안정성

- TData, TParams 제네릭을 적절히 활용
- 인터페이스 정의와 타입 제약이 명확
- 쿼리 응답에 대한 타입 추론이 잘 되어있음

### 2. 아키텍처

- 단일 책임 원칙을 잘 따름 - 무한 쿼리 로딩에 집중
- FSD 아키텍처에 맞게 shared/lib/loader 디렉토리에 잘 배치됨
- 데이터 페칭과 표현 로직이 잘 분리됨

### 3. 코드 품질

- 일관된 명명 규칙 사용
- props 인터페이스가 명확함
- React Query의 기능을 효과적으로 활용

### 4. 에러 처리

- 토스트 알림을 통한 기본적인 에러 처리 구현
- React Query를 통한 에러 상태 관리

## 개선이 필요한 부분

### 1. 성능 최적화

```typescript
// flattenedList를 메모이제이션하여 불필요한 재계산 방지
const flattenedList = useMemo(
  () => data?.pages.flatMap((page) => page.data) ?? [],
  [data?.pages],
)
```

### 2. 에러 처리 강화

```typescript
// 더 자세한 에러 처리 추가
useEffect(() => {
  if (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : '데이터를 불러오는 중 오류가 발생했습니다.'
    showToast.error(errorMessage)
    // 디버깅을 위한 에러 로깅
    console.error('InfiniteListableQueryLoader 에러:', error)
  }
}, [error])
```

### 3. 로딩 상태

- 초기 로딩 시 스켈레톤이나 플레이스홀더 추가 필요
- 페치 실패 시의 로딩 상태 처리 필요

### 4. 문서화

```typescript
/**
 * 무한 스크롤 리스트를 위한 제네릭 로더 컴포넌트
 * @template TData 로드할 데이터의 타입
 * @template TParams 페치 요청에 사용될 파라미터 타입
 * @param fetchData 페이지네이션된 데이터를 가져오는 함수
 * @param params 페이지 번호를 제외한 쿼리 파라미터
 * @param queryKey 고유한 쿼리 키를 생성하는 함수
 * @param children 리스트 컨텐츠를 렌더링하는 render prop
 */
```

## 중요 제안사항

### 1. 재시도 로직

```typescript
useInfiniteQuery<IListableResponse<TData>, Error>({
  // 기존 설정 유지
  retry: 3, // 실패한 요청에 대한 재시도 횟수
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
})
```

### 2. 캐시 관리

```typescript
useInfiniteQuery<IListableResponse<TData>, Error>({
  // 기존 설정 유지
  staleTime: 5 * 60 * 1000, // 데이터가 5분간 신선한 상태 유지
  cacheTime: 30 * 60 * 1000, // 캐시가 30분간 유지
})
```

## 추가 권장사항

1. 컴포넌트에 대한 단위 테스트 추가
2. 대용량 데이터셋을 위한 가상화 리스트 구현 고려
3. TypeDoc 주석을 통한 문서화 개선
4. 로딩 및 에러 상태를 위한 별도 컴포넌트 구현
5. 컴포넌트 언마운트 시 적절한 정리(cleanup) 구현
