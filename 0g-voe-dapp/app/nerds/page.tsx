"use client";

import WalletConnect from '@/components/WalletConnect';
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import { EventLog } from '@/types';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Explicitly type variants as Variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

export default function DeveloperDashboard() {
  const [events, setEvents] = useState<EventLog[]>([]);
  const [search, setSearch] = useState({ hash: '', eventName: '', address: '' });
  const [query, setQuery] = useState({ blockNumber: '', address: '' });
  const [queryResults, setQueryResults] = useState<EventLog[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/events');
    eventSource.onmessage = (event) => {
      const rawData = JSON.parse(event.data);
      const newEvent: EventLog = {
        id: `${rawData.hash}-${Date.now()}`,
        transactionHash: rawData.hash,
        data: rawData.data || `0x${Math.random().toString(16).slice(2, 20)}`,
        timestamp: rawData.timestamp || Date.now(),
        eventName:
          rawData.eventName ||
          ['Transfer', 'Approval', 'Swap'][Math.floor(Math.random() * 3)],
        params: {
          from: rawData.from || `0x${Math.random().toString(16).slice(2, 10)}`,
          to: rawData.to || `0x${Math.random().toString(16).slice(2, 10)}`,
          value: rawData.value || (Math.random() * 10).toFixed(2),
        },
      };
      setEvents((prev) => [newEvent, ...prev].slice(0, 50));
    };
    return () => eventSource.close();
  }, []);

  const filteredEvents = events.filter(
    (event) =>
      (search.hash === '' || event.transactionHash.toLowerCase().includes(search.hash.toLowerCase())) &&
      (search.eventName === '' || event.eventName?.toLowerCase().includes(search.eventName.toLowerCase())) &&
      (search.address === '' ||
        event.params?.from.toLowerCase().includes(search.address.toLowerCase()) ||
        event.params?.to.toLowerCase().includes(search.address.toLowerCase()))
  );

  const handleQuery = async () => {
    const results = events.filter(
      (event) =>
        (query.blockNumber === '' || event.transactionHash.includes(query.blockNumber)) &&
        (query.address === '' ||
          event.params?.from.includes(query.address) ||
          event.params?.to.includes(query.address))
    );
    setQueryResults(results);
  };

  const exportToCSV = () => {
    const headers = ['Transaction Hash,Data,Timestamp,Event Name,From,To,Value'];
    const rows = filteredEvents.map(
      (event) =>
        `${event.transactionHash},${event.data},${new Date(event.timestamp).toISOString()},${event.eventName || ''},${event.params?.from || ''},${event.params?.to || ''},${event.params?.value || ''}`
    );
    const csv = [headers, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'event-logs.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const chartData = {
    labels: events.map((event) => new Date(event.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'Event Frequency',
        data: events.map((_, index) => events.length - index),
        borderColor: 'rgba(236, 72, 153, 1)',
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 text-white">
      <motion.header
        className="flex justify-between items-center p-6 lg:p-12"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500 text-shadow-glow">
          0G-VOE Developer Hub
        </h1>
        <WalletConnect />
      </motion.header>
      <motion.div
        className="max-w-6xl mx-auto px-4 md:px-8 py-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-500 text-shadow-glow"
          variants={fadeIn}
        >
          Blockchain Event Logs
        </motion.h2>
        <motion.div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4" variants={fadeIn}>
          <input
            type="text"
            placeholder="Search by transaction hash"
            value={search.hash}
            onChange={(e) => setSearch({ ...search, hash: e.target.value })}
            className="p-2 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Search by event name (e.g., Transfer)"
            value={search.eventName}
            onChange={(e) => setSearch({ ...search, eventName: e.target.value })}
            className="p-2 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Search by address"
            value={search.address}
            onChange={(e) => setSearch({ ...search, address: e.target.value })}
            className="p-2 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </motion.div>
        <motion.div
          className="mb-12 bg-gray-800/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-blue-500/20"
          variants={fadeIn}
        >
          <h3 className="text-2xl font-bold text-white text-shadow-glow mb-4">Query Events</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Block Number"
              value={query.blockNumber}
              onChange={(e) => setQuery({ ...query, blockNumber: e.target.value })}
              className="p-2 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Address"
              value={query.address}
              onChange={(e) => setQuery({ ...query, address: e.target.value })}
              className="p-2 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleQuery}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg"
          >
            Query Events
          </button>
          {queryResults.length > 0 && (
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-gray-200">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2 px-4">Transaction Hash</th>
                    <th className="py-2 px-4">Event Name</th>
                    <th className="py-2 px-4">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {queryResults.map((event) => (
                    <tr key={event.id} className="border-b border-gray-800 hover:bg-gray-800/20">
                      <td className="py-2 px-4">{event.transactionHash.slice(0, 6)}...</td>
                      <td className="py-2 px-4">{event.eventName}</td>
                      <td className="py-2 px-4">{new Date(event.timestamp).toLocaleTimeString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
        <motion.div
          className="mb-12 bg-gray-800/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-blue-500/20"
          variants={fadeIn}
        >
          <h3 className="text-2xl font-bold text-white text-shadow-glow mb-4">Event Frequency</h3>
          <div className="bg-gray-900/50 p-4 rounded-lg">
            <Line data={chartData} options={chartOptions} />
          </div>
        </motion.div>
        <motion.div className="mb-6" variants={fadeIn}>
          <button
            onClick={exportToCSV}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-full shadow-lg"
          >
            Export Logs as CSV
          </button>
        </motion.div>
        <motion.div
          className="mb-12 bg-gray-800/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-blue-500/20"
          variants={fadeIn}
        >
          <h3 className="text-2xl font-bold text-white text-shadow-glow mb-4">Raw Event Logs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-200">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-4">Transaction Hash</th>
                  <th className="py-2 px-4">Data</th>
                  <th className="py-2 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="border-b border-gray-800 hover:bg-gray-800/20">
                    <td className="py-2 px-4 flex items-center space-x-2">
                      <span>{event.transactionHash.slice(0, 6)}...</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(event.transactionHash)} // Use writeText
                        className="p-1 rounded-full bg-gray-700 hover:bg-blue-500 text-white"
                        title="Copy hash"
                      >
                        <ClipboardIcon className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="py-2 px-4 font-mono text-sm">{event.data.slice(0, 10)}...</td>
                    <td className="py-2 px-4">{new Date(event.timestamp).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
        <motion.div
          className="mb-12 bg-gray-800/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-blue-500/20"
          variants={fadeIn}
        >
          <h3 className="text-2xl font-bold text-white text-shadow-glow mb-4">Decoded Event Logs</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-gray-200">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-4">Event Name</th>
                  <th className="py-2 px-4">From</th>
                  <th className="py-2 px-4">To</th>
                  <th className="py-2 px-4">Value</th>
                  <th className="py-2 px-4">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((event) => (
                  <tr key={event.id} className="border-b border-gray-800 hover:bg-gray-800/20">
                    <td className="py-2 px-4">{event.eventName}</td>
                    <td className="py-2 px-4 flex items-center space-x-2">
                      <span>{event.params?.from.slice(0, 6)}...</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(event.params?.from || '')} // Use writeText
                        className="p-1 rounded-full bg-gray-700 hover:bg-blue-500 text-white"
                        title="Copy from address"
                      >
                        <ClipboardIcon className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="py-2 px-4 flex items-center space-x-2">
                      <span>{event.params?.to.slice(0, 6)}...</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(event.params?.to || '')} // Use writeText
                        className="p-1 rounded-full bg-gray-700 hover:bg-blue-500 text-white"
                        title="Copy to address"
                      >
                        <ClipboardIcon className="w-4 h-4" />
                      </button>
                    </td>
                    <td className="py-2 px-4">{event.params?.value}</td>
                    <td className="py-2 px-4">{new Date(event.timestamp).toLocaleTimeString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}