export const If = ({
  condition,
  then: thenComponent,
  else: elseComponent,
}: {
  condition: boolean
  then: React.ReactNode
  else?: React.ReactNode
}) => {
  return condition ? <>{thenComponent}</> : <>{elseComponent}</>
}
