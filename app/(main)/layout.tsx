import { DPHeader } from '@/widgets/layout'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <DPHeader />
      {children}
    </>
  )
}
