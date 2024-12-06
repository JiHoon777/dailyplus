import Link from 'next/link'

export const AppHomeHeaderBase = () => {
  return (
    <div className="sticky top-0 z-10 flex w-screen justify-center border-b border-gray-100 bg-white/70 px-6 py-4 backdrop-blur-lg">
      <div className="flex w-full max-w-screen-xl items-center">
        <Link href={'/'}>
          <h1 className="bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-xl font-semibold text-transparent">
            Daily+
          </h1>
        </Link>
      </div>
    </div>
  )
}
