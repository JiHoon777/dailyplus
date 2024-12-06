import type { Metadata } from 'next'

import './globals.css'

import localFont from 'next/font/local'
import { Toaster } from 'sonner'

import { UiProvider } from '@/app/providers/ui-provider'

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
  description: 'Generated by create next app',
  title: 'Create Next App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-screen w-screen overflow-hidden bg-background text-foreground antialiased`}
      >
        <UiProvider>
          <main className={'h-screen w-full overflow-hidden'}>{children}</main>
          <Toaster />
        </UiProvider>
      </body>
    </html>
  )
}
