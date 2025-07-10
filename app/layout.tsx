import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BiG FI Protocol - Yield Made Simple',
  description: 'The SuperApp DeFi Deserves. Earn competitive yields with institutional-grade security and transparent smart contracts.',
  keywords: 'DeFi, yield farming, staking, crypto, ethereum, bitcoin, USDC',
  authors: [{ name: 'BIG FI Protocol' }],
  openGraph: {
    title: 'BIG FI Protocol - Yield Made Simple',
    description: 'The SuperApp DeFi Deserves. Earn competitive yields with institutional-grade security.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BIG FI Protocol - Yield Made Simple',
    description: 'The SuperApp DeFi Deserves. Earn competitive yields with institutional-grade security.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
