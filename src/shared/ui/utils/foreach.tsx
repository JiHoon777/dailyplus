export const Foreach = <T,>({
  items,
  render,
  empty,
}: {
  items: T[]
  render: (props: {
    item: T
    index: number
    isLast: boolean
    isFirst: boolean
  }) => React.ReactNode
  empty?: React.ReactNode
}) => {
  if (items.length === 0) {
    return <>{empty}</> || null
  }

  return (
    <>
      {items.map((item, index) =>
        render({
          item,
          index,
          isLast: index === items.length - 1,
          isFirst: index === 0,
        }),
      )}
    </>
  )
}
