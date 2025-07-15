# Big Fi - Staking dApp

A modern, transparent staking platform for ETH, BTC, and USDC built with Next.js and TypeScript.

## Features

### Main Website
- **Landing Page**: Hero section with TVL display and token cards
- **How it Works**: Step-by-step guide and explanations
- **Transparency**: Detailed protocol information and security measures
- **Responsive Design**: Works on desktop and mobile devices

### Launch App
- **Multi-Wallet Support**: MetaMask, Phantom, WalletConnect, and more
- **Token Staking**: Stake ETH, BTC, and USDC with competitive APY
- **Portfolio Tracking**: Real-time portfolio and rewards monitoring
- **Theme Switching**: Light and dark mode support
- **Real-time Data**: Live TVL and protocol statistics

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Wallet Integration**: Custom wallet connector (expandable to RainbowKit)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd big_finance
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
big_finance/
├── app/
│   ├── components/          # Reusable components
│   │   └── WalletConnect.tsx
│   ├── how-it-works/        # How it works page
│   ├── transparency/        # Transparency page
│   ├── launch/             # Main dApp interface
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── public/                 # Static assets
└── package.json
```

## Pages

### Homepage (`/`)
- Hero section with TVL and token cards
- Solution overview
- Product showcase
- Contact information

### How it Works (`/how-it-works`)
- Step-by-step staking guide
- Protocol explanations
- Support contact

### Transparency (`/transparency`)
- Smart contract transparency
- Security measures
- Real-time protocol data
- Fee structure

### Launch App (`/launch`)
- **Earn Tab**: Current APY and locked amounts
- **Portfolio Tab**: User's staked assets and rewards
- **BIG USDC/BIG ETH/BIG BTC Tabs**: Individual token staking interfaces
- **Wallet Connection**: Multi-wallet support
- **Theme Toggle**: Light/dark mode

## Smart Contract Integration

The current version includes placeholder data and mock wallet connections. To integrate with real smart contracts:

1. Add Web3 libraries (wagmi, viem, RainbowKit)
2. Implement actual wallet connections
3. Connect to deployed smart contracts
4. Add real-time data fetching

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@bigfi.com or create an issue in the repository.
