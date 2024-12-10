import { HomeGreeting, QuickStart, TodayNews } from '@/_pages/home'
import { AppHomeHeaderBase, PageBase } from '@/widgets/layout'

export default function Home() {
  return (
    <>
      <AppHomeHeaderBase />
      <PageBase className={'gap-6'}>
        <HomeGreeting />
        <TodayNews />
        <QuickStart />
      </PageBase>
    </>
  )
}
