import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

const inter = Inter({ subsets: ['latin'] });

const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <RainbowKitProvider>{children}</RainbowKitProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}