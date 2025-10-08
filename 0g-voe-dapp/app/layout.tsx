import '../styles/globals.css';
import ClientWagmiProvider from '@/components/ClientWagmiProvider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ClientWagmiProvider>{children}</ClientWagmiProvider>
      </body>
    </html>
  );
}