import { useState, useEffect } from "react";
import { ethers } from "ethers";

export function useArbitrumWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Connect logic for Arbitrum mainnet
  const connectArbitrum = async () => {
    if (!isClient) {
      setError("Not on client side");
      return;
    }
    if (!(window as any).ethereum) {
      setError("MetaMask not found");
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      let ethProvider = new ethers.BrowserProvider((window as any).ethereum);
      let network = await ethProvider.getNetwork();
      if (network.chainId !== BigInt("42161")) {
        // Arbitrum mainnet chainId
        // Prompt user to switch to Arbitrum
        await (window as any).ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xa4b1" }],
        });
        // After switching, re-create provider and get new network
        ethProvider = new ethers.BrowserProvider((window as any).ethereum);
        network = await ethProvider.getNetwork();
        if (network.chainId !== BigInt("42161")) {
          setError("Failed to switch to Arbitrum");
          return;
        }
      }
      await ethProvider.send("eth_requestAccounts", []);
      const signer = await ethProvider.getSigner();
      setProvider(ethProvider);
      setSigner(signer);
      setAddress(await signer.getAddress());
      setError(null);
    } catch (e: any) {
      setError(e.message || "Failed to connect");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setProvider(null);
    setSigner(null);
    setError(null);
  };

  return {
    address,
    provider,
    signer,
    error,
    isConnecting,
    connectArbitrum,
    disconnect,
    isClient,
  };
}
