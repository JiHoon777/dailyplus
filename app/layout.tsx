import type { Metadata } from 'next'

import './globals.css'
import '@app/css/emblaCarousel.css'

import localFont from 'next/font/local'
import { Suspense } from 'react'
import { Toaster } from 'sonner'

import { AuthProvider, QueryProvider, UiProvider } from '@/app/providers'
import { ScreenLoading } from '@/shared/ui'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  description: '하루에 긍정을 더하기 위한 앱',
  title: 'DailyPlus',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen w-screen overflow-y-auto overflow-x-hidden bg-background text-foreground antialiased`}
      >
        <QueryProvider>
          <UiProvider>
            <Suspense fallback={<ScreenLoading />}>
              <AuthProvider>
                <main
                  className={'flex min-h-screen w-screen flex-col items-center'}
                >
                  {children}
                </main>
                <Toaster />
              </AuthProvider>
            </Suspense>
          </UiProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
