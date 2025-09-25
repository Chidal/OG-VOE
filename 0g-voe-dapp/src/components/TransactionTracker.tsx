"use client";

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Transaction } from '../types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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

  const chartData = {
    labels: transactions.map((tx) => new Date(tx.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Transaction Value',
        data: transactions.map((tx) => parseFloat(tx.value)),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

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
      <Line data={chartData} />
      {/* Existing table code */}
    </div>
  );
};

export default TransactionTracker;