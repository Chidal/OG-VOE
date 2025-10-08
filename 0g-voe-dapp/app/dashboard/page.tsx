"use client";

import TransactionTracker from '@/components/TransactionTracker';
import BlockExplorer from '@/components/BlockExplorer';
import AIInsights from '@/components/AIInsights';
import WalletConnect from '@/components/WalletConnect';
import { motion, Variants } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Transaction } from '@/types';

// Explicitly type variants as Variants from framer-motion
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut', // Valid easing function
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2, // Optional: adds a slight delay before children animations start
    },
  },
};

export default function Dashboard() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/events');
    eventSource.onmessage = (event) => {
      const newTransaction: Transaction = JSON.parse(event.data);
      setTransactions((prev) => [newTransaction, ...prev].slice(0, 50));
    };
    return () => eventSource.close();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-950 to-purple-950 text-white">
      <motion.header
        className="flex justify-between items-center p-6 lg:p-12"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500 text-shadow-glow">
          0G-VOE Dashboard
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
          Real-Time Blockchain Analytics
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            className="bg-gray-800/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-blue-500/20"
            variants={fadeIn}
          >
            <TransactionTracker />
          </motion.div>
          <motion.div
            className="bg-gray-800/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-blue-500/20"
            variants={fadeIn}
          >
            <BlockExplorer />
          </motion.div>
          <motion.div
            className="bg-gray-800/30 backdrop-blur-lg p-6 rounded-2xl shadow-2xl border border-blue-500/20"
            variants={fadeIn}
          >
            <AIInsights transactions={transactions} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}