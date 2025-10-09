"use client";

import { motion, Variants } from "framer-motion"; // Import Variants
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Transaction } from "../types";

interface Insight {
  id: number;
  title: string;
  description: string;
  type: "summary" | "alert";
  timestamp: number;
}

// Explicitly type variants as Variants
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut", // Valid easing function
    },
  },
};

const cardScale: Variants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
    },
  },
};

const AIInsights: React.FC<{ transactions: Transaction[] }> = ({ transactions }) => {
  const { address } = useAccount();
  const [insights, setInsights] = useState<Insight[]>([]);
  const [showAlertsOnly, setShowAlertsOnly] = useState(false);

  useEffect(() => {
    const mockInsights: Insight[] = [
      {
        id: 1,
        title: "Large USDT Transfers",
        description: "10 large USDT transfers detected in the last hour.",
        type: "summary",
        timestamp: Date.now() - 3600000,
      },
      {
        id: 2,
        title: "Unusual Whale Activity",
        description: "Unusual whale activity detected on wallet 0x123...",
        type: "alert",
        timestamp: Date.now() - 1800000,
      },
      {
        id: 3,
        title: "High Gas Fees",
        description: "Spike in gas fees observed in recent blocks.",
        type: "alert",
        timestamp: Date.now() - 600000,
      },
    ];
    setInsights(mockInsights);
  }, []);

  const walletTransactions = transactions.filter(
    (tx) =>
      tx.from.toLowerCase() === address?.toLowerCase() ||
      tx.to.toLowerCase() === address?.toLowerCase()
  );

  const walletSummary = {
    total: walletTransactions.length,
    topToken: walletTransactions.reduce(
      (acc, tx) => ({ ...acc, [tx.token]: (acc[tx.token] || 0) + 1 }),
      {} as Record<string, number>
    ),
  };

  const filteredInsights = showAlertsOnly
    ? insights.filter((insight) => insight.type === "alert")
    : insights;

  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <h2 className="text-2xl font-bold text-white text-shadow-glow">AI Insights</h2>

      {address && (
        <motion.div
          className="p-4 rounded-lg bg-gray-800/30 backdrop-blur-lg border border-blue-500/20 shadow-2xl"
          variants={fadeIn}
        >
          <h3 className="text-lg font-semibold text-blue-300 text-shadow-glow">
            Wallet Activity
          </h3>
          <p className="text-gray-200">Total Transactions: {walletSummary.total}</p>
          <p className="text-gray-200">
            Top Token:{" "}
            {Object.entries(walletSummary.topToken).sort((a, b) => b[1] - a[1])[0]?.[0] ||
              "None"}
          </p>
        </motion.div>
      )}

      <motion.div className="mb-4" variants={fadeIn}>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showAlertsOnly}
            onChange={() => setShowAlertsOnly(!showAlertsOnly)}
            className="hidden"
          />
          <div
            className={`w-10 h-5 rounded-full ${
              showAlertsOnly ? "bg-blue-500" : "bg-gray-600"
            } relative`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white absolute top-0.5 ${
                showAlertsOnly ? "right-0.5" : "left-0.5"
              } transition-transform`}
            />
          </div>
          <span className="text-gray-200">Show Alerts Only</span>
        </label>
      </motion.div>

      <div className="space-y-4">
        {filteredInsights.map((insight) => (
          <motion.div
            key={insight.id}
            className={`p-4 rounded-lg bg-gray-800/30 backdrop-blur-lg border ${
              insight.type === "alert" ? "border-red-500/30" : "border-blue-500/20"
            } shadow-2xl hover:bg-gray-800/40`}
            variants={cardScale}
            whileHover="hover"
          >
            <h3 className="text-lg font-semibold text-blue-300">{insight.title}</h3>
            <p className="text-gray-200">{insight.description}</p>
            <p className="text-sm text-gray-400 mt-2">
              {new Date(insight.timestamp).toLocaleTimeString()}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default AIInsights;