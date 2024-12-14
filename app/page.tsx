import { HomeGreeting, QuickStart, TodayNews } from '@/_pages/home'
import { createApiClientSSR } from '@/shared/lib/supabase-ssr'
import { AppHomeHeaderBase, PageBase } from '@/widgets/layout'

export default async function Home() {
  const apiClient = await createApiClientSSR()

  const homeArticles = await apiClient.app.getHomeArticles()
  console.log(9, homeArticles)
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
