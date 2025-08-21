import React, { useState } from 'react';
import { motion } from 'framer-motion';
import VoiceInput from './components/VoiceInput';
import BlockchainResults from './components/BlockchainResults';
import DataVisualization from './components/DataVisualization';
import QueryGallery from './components/QueryGallery';
import Portfolio from './components/Portfolio';
import { TourProvider, useTour } from '@reactour/tour'; // Install: npm install @reactour/tour

const steps = [
  { selector: '[data-tour="voice-input"]', content: 'Start by entering a voice or text query here.' },
  { selector: '[data-tour="blockchain-results"]', content: 'View AI-analyzed blockchain results here.' },
  { selector: '[data-tour="portfolio"]', content: 'Check your portfolio with AI insights here.' },
];

const AppContent: React.FC = () => {
  const { setIsOpen } = useTour();
  const [isTourOpen, setIsTourOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white font-sans">
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-4 flex justify-between items-center shadow-lg"
      >
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-neon-blue">OG-Voe</h1>
        </div>
        <div className="space-x-4">
          <button className="text-neon-green hover:text-white">Portfolio</button>
          <button className="text-neon-green hover:text-white">Gallery</button>
          <button
            onClick={() => setIsTourOpen(true)}
            className="text-neon-green hover:text-white"
          >
            Take Tour
          </button>
        </div>
      </motion.nav>

      <main className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          data-tour="voice-input"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <VoiceInput />
        </motion.div>

        <motion.div
          data-tour="blockchain-results"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg col-span-1 md:col-span-2"
        >
          <BlockchainResults />
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <DataVisualization />
        </motion.div>

        <motion.div
          data-tour="portfolio"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <Portfolio />
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg"
        >
          <QueryGallery />
        </motion.div>
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <TourProvider steps={steps}>
    <AppContent />
  </TourProvider>
);

export default App;