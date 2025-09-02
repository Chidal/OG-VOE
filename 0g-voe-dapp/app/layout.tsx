import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import '../src/styles/globals.css';

const config = createConfig({
  chains: [mainnet], // Replace with 0G testnet chain config when available
  transports: {
    [mainnet.id]: http(process.env.NEXT_PUBLIC_API_URL),
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <WagmiConfig config={config}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}