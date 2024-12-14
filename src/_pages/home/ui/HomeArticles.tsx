import type { IApiClientAppResponse } from '@/shared/api'

export const HomeArticles = ({
  articlesMap,
}: {
  articlesMap: IApiClientAppResponse<'getHomeArticles'>['data']
}) => {
  return (
    <div className={'flex w-full flex-col gap-6'}>
      <div className="w-full border border-gray-100 bg-black/30 p-7">
        Todo!
        <p> 주요 카테고리별 7개씩 긁어 오기</p>
      </div>
    </div>
  )
}
