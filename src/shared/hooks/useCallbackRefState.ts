import { useCallback, useState } from 'react'

/**
 * React 컴포넌트에서 콜백 ref와 state를 함께 관리하기 위한 커스텀 훅
 *
 * @description
 * 이 훅은 DOM 요소의 ref를 관리하면서 동시에 해당 요소의 state를 관리할 수 있게 해줍니다.
 * ref 콜백이 호출될 때마다 state가 업데이트되며, 요소가 언마운트되면 state는 null이 됩니다.
 *
 * @template T - ref로 관리할 DOM 요소의 타입
 *
 * @returns {[T | null, (node: T | null) => void]}
 * - 첫 번째 요소: 현재 ref가 가리키는 DOM 요소 (또는 null)
 * - 두 번째 요소: ref 콜백 함수
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const [elementRef, setElementRef] = useCallbackRefState<HTMLDivElement>();
 *
 *   useEffect(() => {
 *     if (elementRef) {
 *       // DOM 요소를 사용한 로직
 *     }
 *   }, [elementRef]);
 *
 *   return <div ref={setElementRef}>Content</div>;
 * }
 * ```
 */
export function useCallbackRefState<T>(): [T | null, (node: T | null) => void] {
  const [ref, setRef] = useState<T | null>(null)
  const callbackRef = useCallback((node: T | null) => {
    setRef(node)
  }, [])

  return [ref, callbackRef]
}
