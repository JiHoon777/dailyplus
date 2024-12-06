import { HomeGreeting, QuickStart, TodayNews } from '@/pages/home'
import { PageBase } from '@/widgets/layout'

export default function Home() {
  return (
    <PageBase className={'gap-6'}>
      <HomeGreeting />
      <TodayNews />
      <QuickStart />
    </PageBase>
  )
}
