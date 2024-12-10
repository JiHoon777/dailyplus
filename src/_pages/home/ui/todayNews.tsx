export const TodayNews = () => {
  return (
    <div className={'flex w-full flex-col gap-6'}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">오늘의 뉴스</h3>
      </div>
      <div className="w-full border border-gray-100 bg-black/30 p-7">
        Todo!
        <p> 주요 카테고리별 7개씩 긁어 오기</p>
      </div>
    </div>
  )
}
