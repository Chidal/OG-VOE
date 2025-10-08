"use client";

import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Block } from '../types';

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } } };

const BlockExplorer: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/events');
    eventSource.onmessage = (event) => {
      const newBlock: Block = JSON.parse(event.data);
      setBlocks((prev) => [newBlock, ...prev].slice(0, 50));
    };
    return () => eventSource.close();
  }, []);

  const gasFees = blocks.map(() => (Math.random() * 0.01).toFixed(4));
  const gasChartData = {
    labels: blocks.map((block) => block.number.toString()),
    datasets: [
      {
        label: 'Gas Fees (ETH)',
        data: gasFees,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const blockTimes = blocks.slice(1).map((block, i) => (block.timestamp - blocks[i].timestamp) / 1000);
  const blockTimeData = {
    labels: blocks.slice(1).map((block) => block.number.toString()),
    datasets: [
      {
        label: 'Block Time (seconds)',
        data: blockTimes,
        borderColor: 'rgba(139, 92, 246, 1)',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' as const, labels: { color: '#E5E7EB' } }, title: { display: false } },
    scales: { x: { ticks: { color: '#E5E7EB' }, grid: { color: 'rgba(255, 255, 255, 0.1)' } }, y: { ticks: { color: '#E5E7EB' }, grid: { color: 'rgba(255, 255, 255, 0.1)' }, beginAtZero: true } },
  };

  const barChartData = {
    labels: blocks.map((block) => block.number.toString()),
    datasets: [
      {
        label: 'Transactions per Block',
        data: blocks.map(() => Math.floor(Math.random() * 10) + 1),
        backgroundColor: 'rgba(139, 92, 246, 0.6)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div className="space-y-4" initial="hidden" animate="visible" variants={fadeIn}>
      <h2 className="text-2xl font-bold text-white text-shadow-glow">Block Explorer</h2>
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white text-shadow-glow mb-2">Gas Fees per Block</h3>
        <Line data={gasChartData} options={chartOptions} />
      </div>
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white text-shadow-glow mb-2">Block Time Intervals</h3>
        <Line data={blockTimeData} options={chartOptions} />
      </div>
      <div className="bg-gray-900/50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-white text-shadow-glow mb-2">Transactions per Block</h3>
        <Bar data={barChartData} options={chartOptions} />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-200">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-2 px-4">Block Number</th>
              <th className="py-2 px-4">Hash</th>
              <th className="py-2 px-4">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block) => (
              <tr key={block.hash} className="border-b border-gray-800 hover:bg-gray-800/20">
                <td className="py-2 px-4">{block.number}</td>
                <td className="py-2 px-4">{block.hash.slice(0, 6)}...</td>
                <td className="py-2 px-4">{new Date(block.timestamp).toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default BlockExplorer;