import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Stream Protocol - Yield Made Simple',
  description: 'The SuperApp DeFi Deserves. Earn competitive yields with institutional-grade security and transparent smart contracts.',
  keywords: 'DeFi, yield farming, staking, crypto, ethereum, bitcoin, USDC',
  authors: [{ name: 'Stream Protocol' }],
  openGraph: {
    title: 'Stream Protocol - Yield Made Simple',
    description: 'The SuperApp DeFi Deserves. Earn competitive yields with institutional-grade security.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stream Protocol - Yield Made Simple',
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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
