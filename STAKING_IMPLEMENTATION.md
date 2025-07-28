# Big Finance Staking Implementation

## Overview
This implementation provides a complete staking interface for the Big Finance protocol on Arbitrum mainnet. Users can stake USDC, WBTC, and ETH to earn rewards.

## Features Implemented

### 1. Wallet Connection
- **Hook**: `useArbitrumWallet` (updated from Sepolia to Arbitrum)
- **Network**: Arbitrum mainnet (Chain ID: 42161)
- **Functionality**: Connects to MetaMask and switches to Arbitrum if needed

### 2. Staking Functionality
- **Hook**: `useStaking` - Comprehensive staking management
- **Supported Tokens**: USDC, WBTC, ETH
- **Functions**:
  - `stakeUSDC(amount)` - Stake USDC tokens
  - `stakeWBTC(amount)` - Stake WBTC tokens  
  - `stakeETH(amount)` - Stake ETH (native token)
  - `unstakeUSDC(amount)` - Unstake USDC tokens
  - `unstakeWBTC(amount)` - Unstake WBTC tokens
  - `unstakeETH(amount)` - Unstake ETH

### 3. Smart Contract Integration
- **Staking Contract**: `0x755f161fBFb0B7715227f2Be5707537818aB7c85`
- **Token Addresses**:
  - USDC: `0xaf88d065e77c8cc2239327c5edb3a432268e5831`
  - WBTC: `0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f`
  - WETH: `0x82af49447d8a07e3bd95bd0d56f35241523fbab1`

### 4. Key Features
- **Automatic Approvals**: USDC and WBTC require approval before staking
- **Real-time Data**: Fetches staked amounts, rewards, and balances
- **Error Handling**: Comprehensive error handling for failed transactions
- **Loading States**: Visual feedback during transactions
- **MAX Buttons**: Quick input of maximum available amounts

### 5. UI Components
- **Token Selection**: Choose between USDC, ETH, and WBTC
- **Staking Interface**: Input amounts and execute staking/unstaking
- **Staking Overview**: Detailed view of user's staking positions
- **Transaction Status**: Real-time transaction feedback

## Usage

### For Users
1. Connect wallet (MetaMask) - will automatically switch to Arbitrum
2. Select token to stake (USDC, ETH, or WBTC)
3. Enter amount or click MAX
4. Click "Stake" button
5. Approve transaction in MetaMask (if required)
6. View staking overview below

### For Developers
1. **Environment Setup**: Add `NEXT_PUBLIC_ARBITRUM_RPC_URL` to `.env.local`
2. **Install Dependencies**: `npm install`
3. **Run Development**: `npm run dev`
4. **Access**: Navigate to `/launch` page

## Contract Functions Used

### Staking Contract Functions
- `stakeUSDC(uint256 amount)` - Stake USDC
- `stakeWBTC(uint256 amount)` - Stake WBTC
- `stakeETH(uint256 amount)` - Stake ETH (payable)
- `unstakeUSDC(uint256 amount)` - Unstake USDC
- `unstakeWBTC(uint256 amount)` - Unstake WBTC
- `unstakeETH(uint256 amount)` - Unstake ETH
- `getReward(address user)` - Get rewards for all tokens
- `usdcStakedAmount(address user)` - Get USDC staked amount
- `wbtcStakedAmount(address user)` - Get WBTC staked amount
- `ethStakedAmount(address user)` - Get ETH staked amount
- `totalStakedUSDC()` - Get total USDC staked
- `totalStakedWBTC()` - Get total WBTC staked
- `totalStakedETH()` - Get total ETH staked

### ERC20 Functions
- `approve(address spender, uint256 amount)` - Approve spending
- `allowance(address owner, address spender)` - Check allowance
- `balanceOf(address account)` - Get token balance

## Security Features
- **Approval Checks**: Verifies allowance before staking
- **Input Validation**: Validates amounts and user connection
- **Error Handling**: Graceful handling of transaction failures
- **Network Validation**: Ensures correct network (Arbitrum)

## File Structure
```
app/
├── hooks/
│   ├── useArbitrumWallet.ts    # Wallet connection for Arbitrum
│   └── useStaking.ts           # Staking functionality
├── components/
│   └── StakingInfo.tsx         # Staking overview component
├── constants/
│   └── index.ts                # Contract addresses
├── abis/
│   ├── staking.json            # Staking contract ABI
│   └── erc20.json              # ERC20 token ABI
└── launch/
    └── page.tsx                # Main staking interface
```

## Notes
- ETH staking uses the native token (no approval needed)
- USDC and WBTC require approval before first staking
- All amounts are handled with proper decimal precision
- Real-time data updates every 30 seconds
- Transaction status provides user feedback 