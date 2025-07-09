'use client'

import { useState } from 'react'

interface WalletConnectProps {
  onConnect: (wallet: string) => void
  isConnected: boolean
  onDisconnect: () => void
}

const WALLETS = [
  { id: 'metamask', name: 'MetaMask', icon: '🦊', description: 'Connect with MetaMask' },
  { id: 'phantom', name: 'Phantom', icon: '👻', description: 'Connect with Phantom' },
  { id: 'walletconnect', name: 'WalletConnect', icon: '🔗', description: 'Connect with WalletConnect' },
  { id: 'coinbase', name: 'Coinbase Wallet', icon: '🪙', description: 'Connect with Coinbase Wallet' },
]

export default function WalletConnect({ onConnect, isConnected, onDisconnect }: WalletConnectProps) {
  const [showModal, setShowModal] = useState(false)

  const handleWalletSelect = (walletId: string) => {
    onConnect(walletId)
    setShowModal(false)
  }

  if (isConnected) {
    return (
      <button 
        onClick={onDisconnect}
        className="bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-green-600 transition"
      >
        Connected
      </button>
    )
  }

  return (
    <>
      <button 
        onClick={() => setShowModal(true)}
        className="bg-primary text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition"
      >
        Connect Wallet
      </button>

      {/* Wallet Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Connect Wallet</h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              {WALLETS.map(wallet => (
                <button
                  key={wallet.id}
                  onClick={() => handleWalletSelect(wallet.id)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                >
                  <span className="text-2xl">{wallet.icon}</span>
                  <div className="text-left">
                    <div className="font-medium">{wallet.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{wallet.description}</div>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Don't have a wallet?{' '}
                <a href="https://metamask.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  Get one here
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
} 