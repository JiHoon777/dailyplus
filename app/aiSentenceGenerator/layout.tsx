import { AiSentenceGeneratorSidebar } from '@/pages/ai-sentenc-generator'

export default function AiSentenceGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <AiSentenceGeneratorSidebar />
      <main className="h-screen w-full overflow-hidden">{children}</main>
    </div>
  )
}
