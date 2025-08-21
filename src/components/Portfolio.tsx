import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface PortfolioItem {
  id: string;
  collection: string;
  value: string;
}

interface TokenItem {
  symbol: string;
  balance: string;
}

interface ChainPortfolio {
  nfts: PortfolioItem[];
  tokens: TokenItem[];
}

const Portfolio: React.FC = () => {
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({ polygon: false, ethereum: false, aptos: false });
  const [filter, setFilter] = useState('all');
  const [aiInsight, setAiInsight] = useState('');

  const mockPortfolio: { [key: string]: ChainPortfolio } = {
    polygon: {
      nfts: [{ id: 'NFT001', collection: 'PolygonArt', value: '1 ETH' }, { id: 'NFT002', collection: 'PolyPunks', value: '0.5 ETH' }],
      tokens: [{ symbol: 'MATIC', balance: '100' }, { symbol: 'USDC', balance: '50' }],
    },
    ethereum: {
      nfts: [{ id: 'NFT003', collection: 'EtherCats', value: '2 ETH' }],
      tokens: [{ symbol: 'ETH', balance: '0.8' }, { symbol: 'DAI', balance: '200' }],
    },
    aptos: {
      nfts: [{ id: 'NFT004', collection: 'AptosArt', value: '0.3 APT' }],
      tokens: [{ symbol: 'APT', balance: '75' }],
    },
  };

  const filteredChains = filter === 'all' ? Object.keys(mockPortfolio) : [filter];

  const analyzePortfolio = (chain: string) => {
    const totalValue = parseFloat(mockPortfolio[chain].nfts.reduce((sum, nft) => sum + parseFloat(nft.value), 0).toString()) +
                       parseFloat(mockPortfolio[chain].tokens.reduce((sum, token) => sum + parseFloat(token.balance), 0).toString());
    setAiInsight(`AI Insight: ${chain.toUpperCase()} portfolio value is approximately ${totalValue.toFixed(2)} units. Consider diversifying.`);
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      role="region"
      aria-label="Portfolio"
    >
      <h2 className="text-xl font-bold text-neon-green mb-4">Portfolio</h2>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
          aria-label="Filter chains"
          title="Filter your portfolio by chain"
        >
          <option value="all">All Chains</option>
          <option value="polygon">Polygon</option>
          <option value="ethereum">Ethereum</option>
          <option value="aptos">Aptos</option>
        </select>
      </div>
      {filteredChains.map((chain) => (
        <div key={chain} className="mb-4">
          <button
            onClick={() => {
              setShowDetails((prev) => ({ ...prev, [chain]: !prev[chain] }));
              analyzePortfolio(chain);
            }}
            className="w-full text-left p-2 bg-neon-blue text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-neon-green"
            aria-expanded={showDetails[chain]}
            aria-controls={`portfolio-${chain}`}
            title="Click to view or analyze portfolio details"
          >
            {chain.toUpperCase()} ({mockPortfolio[chain].nfts.length} NFTs, {mockPortfolio[chain].tokens.length} Tokens)
          </button>
          {showDetails[chain] && (
            <div id={`portfolio-${chain}`} className="mt-2 pl-4">
              <h3 className="text-lg text-neon-green mb-2">NFTs</h3>
              <ul className="list-disc pl-5 mb-4">
                {mockPortfolio[chain].nfts.map((nft: PortfolioItem, index: number) => (
                  <li key={index} className="py-1">
                    {nft.id} ({nft.collection}) - {nft.value}
                  </li>
                ))}
              </ul>
              <h3 className="text-lg text-neon-green mb-2">Tokens</h3>
              <ul className="list-disc pl-5">
                {mockPortfolio[chain].tokens.map((token: TokenItem, index: number) => (
                  <li key={index} className="py-1">
                    {token.symbol}: {token.balance}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      {aiInsight && <p className="mt-4 text-neon-blue">{aiInsight}</p>}
    </motion.div>
  );
};

export default Portfolio;