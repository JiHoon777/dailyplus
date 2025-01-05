export const Show = ({
  when,
  children,
  fallback,
}: {
  when: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
}) => {
  if (!when) {
    return fallback || null
  }

  return <>{children}</>
}
