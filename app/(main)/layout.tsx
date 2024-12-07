import { AppHomeHeaderBase } from '@/widgets/layout'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AppHomeHeaderBase />
      {children}
    </>
  )
}
