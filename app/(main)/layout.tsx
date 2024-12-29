import { DPHeader } from './_ui'

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
