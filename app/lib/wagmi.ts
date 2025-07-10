import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, zora } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'BIG FI Protocol',
  projectId: 'YOUR_PROJECT_ID', // Get one at https://cloud.walletconnect.com
  chains: [mainnet, polygon, optimism, arbitrum, base, zora],
  ssr: true,
}); 