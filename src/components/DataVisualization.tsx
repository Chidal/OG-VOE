import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const DataVisualization: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: ['T-4', 'T-3', 'T-2', 'T-1', 'T-0'],
    datasets: [
      {
        label: 'Trade Volume (Predicted)',
        data: [10, 20, 15, 30, 25],
        borderColor: '#00FFFF',
        backgroundColor: 'rgba(0, 255, 255, 0.2)',
      },
    ],
  });

  useEffect(() => {
    // Mock AI prediction update
    const interval = setInterval(() => {
      setChartData((prev) => ({
        ...prev,
        datasets: [
          {
            ...prev.datasets[0],
            data: prev.datasets[0].data.map((v) => v + Math.random() * 5 - 2.5),
          },
        ],
      }));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      role="region"
      aria-label="Data Visualization"
    >
      <h2 className="text-xl font-bold text-neon-green mb-4">Data Visualization</h2>
      <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </motion.div>
  );
};

export default DataVisualization;