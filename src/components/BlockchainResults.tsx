import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const BlockchainResults: React.FC = () => {
  const [results, setResults] = useState([
    { transactionHash: '0x123...', from: '0xABC...', to: '0xDEF...', tokenId: 'NFT001', value: '1 APT', chain: 'Aptos' },
  ]);

  useEffect(() => {
    // Mock Webhook stream (simulating Aptos Indexer API)
    const interval = setInterval(() => {
      setResults((prev) => [
        ...prev,
        {
          transactionHash: `0x${Math.random().toString(16).slice(2, 10)}...`,
          from: `0x${Math.random().toString(16).slice(2, 10)}...`,
          to: `0x${Math.random().toString(16).slice(2, 10)}...`,
          tokenId: `NFT${Math.floor(Math.random() * 1000)}`,
          value: `${(Math.random() * 2).toFixed(1)} APT`,
          chain: 'Aptos',
        },
      ].slice(-3)); // Keep last 3 transactions
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      role="region"
      aria-label="Blockchain Results"
    >
      <h2 className="text-xl font-bold text-neon-green mb-4">Blockchain Results</h2>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-600">
            <th className="pb-2">Tx Hash</th>
            <th className="pb-2">From</th>
            <th className="pb-2">To</th>
            <th className="pb-2">Token ID</th>
            <th className="pb-2">Value</th>
            <th className="pb-2">Chain</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index} className="border-b border-gray-700">
              <td className="py-2">{result.transactionHash}</td>
              <td className="py-2">{result.from}</td>
              <td className="py-2">{result.to}</td>
              <td className="py-2">{result.tokenId}</td>
              <td className="py-2">{result.value}</td>
              <td className="py-2">{result.chain}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default BlockchainResults;