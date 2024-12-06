import { getGreetingByTime } from '../lib/getGreetingByTime'

export const HomeGreeting = () => {
  return (
    <div className={'w-full'}>
      <h2 className="mb-3 text-3xl font-bold">유저님, 안녕하세요 👋</h2>
      <p className="text-lg font-semibold text-gray-600">
        {getGreetingByTime()}
      </p>
    </div>
  )
}
