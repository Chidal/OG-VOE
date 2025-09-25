import TransactionTracker from '@/components/TransactionTracker';
import BlockExplorer from '@/components/BlockExplorer';
import AIInsights from '@/components/AIInsights';
import ClientWalletConnect from '@/components/ClientWalletConnect';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <ClientWalletConnect />
      <h1 className="text-4xl font-bold text-white mb-8 text-center">0G-VOE: Vision of Onchain Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TransactionTracker />
        <BlockExplorer />
        <AIInsights />
      </div>
    </div>
  );
}