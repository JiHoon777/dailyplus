export const For = <T,>({
  each,
  children,
  empty,
  skip,
}: {
  each: T[]
  children: (
    item: T,
    index: number,
    isLast: boolean,
    isFirst: boolean,
  ) => React.ReactNode
  empty?: React.ReactNode
  skip?: (item: T, index: number) => boolean
}) => {
  if (each.length === 0) {
    return <>{empty}</> || null
  }

  return (
    <>
      {each.map((item, index) => {
        return skip?.(item, index)
          ? null
          : children(item, index, index === each.length - 1, index === 0)
      })}
    </>
  )
}
