"use client";

import { useEffect, useState } from 'react';
import { Transaction } from '../types';

const TransactionTracker: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const eventSource = new EventSource('/api/events');
    eventSource.onmessage = (event) => {
      const newTransaction: Transaction = JSON.parse(event.data);
      setTransactions((prev) => [newTransaction, ...prev].slice(0, 50));
    };
    return () => eventSource.close();
  }, []);

  const filteredTransactions = filter
    ? transactions.filter((tx) => tx.tokenSymbol.toLowerCase() === filter.toLowerCase())
    : transactions;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Transaction Tracker</h2>
      <input
        type="text"
        placeholder="Filter by token (e.g., USDT)"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 rounded bg-gray-700 text-white w-full"
      />
      <div className="overflow-auto max-h-96">
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="p-2">Hash</th>
              <th className="p-2">From</th>
              <th className="p-2">To</th>
              <th className="p-2">Value</th>
              <th className="p-2">Token</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx) => (
              <tr key={tx.hash} className="border-t border-gray-700">
                <td className="p-2 truncate">{tx.hash.slice(0, 10)}...</td>
                <td className="p-2 truncate">{tx.from.slice(0, 10)}...</td>
                <td className="p-2 truncate">{tx.to.slice(0, 10)}...</td>
                <td className="p-2">{tx.value}</td>
                <td className="p-2">{tx.tokenSymbol}</td>
                <td className="p-2">{new Date(tx.timestamp).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTracker;