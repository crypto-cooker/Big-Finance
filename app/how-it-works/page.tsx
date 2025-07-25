'use client';

import Link from 'next/link';
import AnimatedBackground from '../components/AnimatedBackground';
import ThemeToggle from '../components/ThemeToggle';

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-primary text-primary transition-colors duration-500 relative overflow-hidden">
      <AnimatedBackground />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-primary transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center font-bold text-xl">
                <img src="/logo.png" alt="" />
              </div>
              <Link href="/" className="text-2xl font-bold gradient-text cursor-pointer">
                BIG FI
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/how-it-works" className="text-accent hover:text-accent2 transition-colors">
                How it works
              </Link>
              <Link href="/transparency" className="text-accent hover:text-accent2 transition-colors">
                Transparency
              </Link>
              <Link href="/launch" className="gradient-bg text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-all duration-200 shadow-lg">
                Launch App
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 gradient-text">
              How It Works
            </h1>
            <p className="text-xl text-secondary">
              Understanding the BIG FI Protocol and how to earn competitive yields
            </p>
          </div>

          <div className="relative flex flex-col items-center space-y-16">
            {/* Vertical timeline line (optional) */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 bg-gradient-to-b from-accent/30 via-accent2/30 to-transparent pointer-events-none z-0" />

            {/* Step 1: Connect Wallet (left) */}
            <div className="relative z-10 w-full md:w-1/2 self-start">
              <div className="bg-panel/80 backdrop-blur-sm rounded-bigfi p-8 border border-primary transition-colors duration-300">
                <div className="flex items-center gap-6">
                  <div className="hidden md:block">
                    <div className="bg-accent/10 rounded-full p-6 border border-accent/30">
                      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#1E90FF" fillOpacity="0.15"/><path d="M14 20V16a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4v-4" stroke="#1E90FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="14" y="20" width="20" height="8" rx="2" fill="#1E90FF" fillOpacity="0.2"/><circle cx="32" cy="24" r="2" fill="#1E90FF"/></svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-accent">1. Connect Your Wallet</h2>
                    <p className="text-secondary mb-4">
                      Start by connecting your Web3 wallet (MetaMask, WalletConnect, etc.) to access the BIG FI platform.
                    </p>
                    <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
                      <p className="text-accent text-sm">
                        <strong>Supported Wallets:</strong> MetaMask, WalletConnect, Coinbase Wallet, and more
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Choose Vault (right) */}
            <div className="relative z-10 w-full md:w-1/2 self-end">
              <div className="bg-panel/80 backdrop-blur-sm rounded-bigfi p-8 border border-primary transition-colors duration-300">
                <div className="flex items-center gap-6 flex-row-reverse">
                  <div className="hidden md:block">
                    <div className="bg-accent2/10 rounded-full p-6 border border-accent2/30">
                      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#00BFAE" fillOpacity="0.15"/><path d="M24 14a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 0v16" stroke="#00BFAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="24" r="4" fill="#00BFAE" fillOpacity="0.2"/></svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-accent2">2. Choose Your Vault</h2>
                    <p className="text-secondary mb-6">
                      Select from our curated vaults offering different risk profiles and yield strategies:
                    </p>
                  </div>
                </div>
                <div>
                  <div className="space-y-4">
                    {/* USDC Vault */}
                    <div className="flex items-center gap-4 bg-accent/10 rounded-lg p-4 border border-accent/30">
                      <img src="/images/usdc.png" alt="USDC" className="w-8 h-8 rounded-full" onError={(e) => { e.currentTarget.src = '/images/usdc.png'; }} />
                      <div>
                        <h3 className="font-bold text-accent mb-1">USDC Vault</h3>
                        <p className="text-secondary text-sm">High yield, variable returns</p>
                      </div>
                    </div>
                    {/* ETH Vault */}
                    <div className="flex items-center gap-4 bg-accent/10 rounded-lg p-4 border border-accent/30">
                      <img src="/images/eth.png" alt="ETH" className="w-8 h-8 rounded-full" onError={(e) => { e.currentTarget.src = '/images/eth.png'; }} />
                      <div>
                        <h3 className="font-bold text-accent mb-1">ETH Vault</h3>
                        <p className="text-secondary text-sm">Medium yield, balanced risk</p>
                      </div>
                    </div>
                    {/* BTC Vault */}
                    <div className="flex items-center gap-4 bg-accent/10 rounded-lg p-4 border border-accent/30">
                      <img src="/images/btc.png" alt="BTC" className="w-8 h-8 rounded-full" onError={(e) => { e.currentTarget.src = '/public/images/btc.png'; }} />
                      <div>
                        <h3 className="font-bold text-accent mb-1">BTC Vault</h3>
                        <p className="text-secondary text-sm">Conservative, stable returns</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Stake and Earn (left) */}
            <div className="relative z-10 w-full md:w-1/2 self-start">
              <div className="bg-panel/80 backdrop-blur-sm rounded-bigfi p-8 border border-primary transition-colors duration-300">
                <div className="flex items-center gap-6">
                  <div className="hidden md:block">
                    <div className="bg-accent/10 rounded-full p-6 border border-accent/30">
                      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#1E90FF" fillOpacity="0.15"/><path d="M24 16v16M16 24h16" stroke="#1E90FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="24" r="8" fill="#1E90FF" fillOpacity="0.2"/></svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-accent">3. Stake and Earn</h2>
                    <p className="text-secondary mb-4">
                      Deposit your assets into the chosen vault and start earning competitive yields immediately.
                    </p>
                    <div className="bg-accent/10 rounded-lg p-4 border border-accent/30">
                      <p className="text-accent text-sm">
                        <strong>Key Features:</strong> No lock-up periods, instant withdrawals, transparent fee structure
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 4: Monitor and Withdraw (right) */}
            <div className="relative z-10 w-full md:w-1/2 self-end">
              <div className="bg-panel/80 backdrop-blur-sm rounded-bigfi p-8 border border-primary transition-colors duration-300">
                <div className="flex items-center gap-6 flex-row-reverse">
                  <div className="hidden md:block">
                    <div className="bg-accent2/10 rounded-full p-6 border border-accent2/30">
                      <svg width="48" height="48" fill="none" viewBox="0 0 48 48"><rect width="48" height="48" rx="24" fill="#00BFAE" fillOpacity="0.15"/><path d="M16 32V16h16v16H16Zm8-8h8" stroke="#00BFAE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="24" cy="24" r="8" fill="#00BFAE" fillOpacity="0.2"/></svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-4 text-accent2">4. Monitor and Withdraw</h2>
                    <p className="text-secondary mb-4">
                      Track your earnings in real-time and withdraw your funds whenever you need them.
                    </p>
                    <div className="bg-accent2/10 rounded-lg p-4 border border-accent2/30">
                      <p className="text-accent2 text-sm">
                        <strong>Real-time Updates:</strong> Live APY tracking, portfolio performance, and yield history
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/launch" 
              className="gradient-bg text-white px-8 py-4 rounded-lg font-semibold text-lg hover:opacity-90 transition-all duration-200 shadow-lg"
            >
              Start Earning Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}