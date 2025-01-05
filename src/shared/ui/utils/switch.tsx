import { Children, isValidElement } from 'react'

type CaseProps = {
  condition: boolean
  children: React.ReactNode
}

const Case = ({
  condition,
  children,
}: {
  condition: boolean
  children: React.ReactNode
}) => {
  return condition ? <>{children}</> : null
}

const SwitchRoot = ({
  children,
  fallback,
}: {
  children: React.ReactElement<CaseProps> | React.ReactElement<CaseProps>[]
  fallback?: React.ReactNode
}) => {
  let matched = false
  const childArray = Children.toArray(children)

  for (const child of childArray) {
    if (isValidElement<CaseProps>(child) && child.props.condition) {
      matched = true
      return child
    }
  }

  return matched ? null : <>{fallback}</>
}

export const Switch = Object.assign(SwitchRoot, { Case })
