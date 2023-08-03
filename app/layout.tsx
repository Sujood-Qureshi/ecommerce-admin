import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { ToasterProvider } from '@/providers/toast-provider'

const montserrate = Montserrat({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Fake Store',
  description: 'Created by Sujood Qureshi for personal project.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={montserrate.className}>
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
