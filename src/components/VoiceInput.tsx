import React, { useState } from 'react';
import { motion } from 'framer-motion';

const VoiceInput: React.FC = () => {
  const [transcript, setTranscript] = useState('Speak or type your query...');
  const [aiResponse, setAiResponse] = useState('');

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const input = (document.querySelector('input') as HTMLInputElement)?.value || '';
    setTranscript(`Query submitted: ${input}`);
    // Mock AI response using Nodit MCP (simulating Claude)
    if (input.toLowerCase().includes('aptos')) {
      setAiResponse('AI Analysis: Recent Aptos transactions show 3 NFT trades totaling 1.5 APT in the last hour.');
    } else if (input.toLowerCase().includes('wallet')) {
      setAiResponse('AI Analysis: Wallet activity includes 0.8 ETH received and 2 NFT purchases.');
    } else {
      setAiResponse('AI Analysis: Please specify a wallet or chain (e.g., Aptos) for insights.');
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      role="region"
      aria-label="Query Input"
    >
      <h2 className="text-xl font-bold text-neon-green mb-4">Voice Query</h2>
      <div className="flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 rounded-full bg-neon-blue text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
          onClick={() => setTranscript('Voice input placeholder')}
          aria-label="Simulate voice input"
          title="Click to simulate voice input"
        >
          Speak
        </motion.button>
        <p className="text-sm">{transcript}</p>
      </div>
      <form onSubmit={handleTextSubmit} className="mt-4">
        <input
          type="text"
          placeholder="e.g., Show Aptos transactions or Analyze wallet 0xABC..."
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
          aria-label="Text query input"
        />
        <button
          type="submit"
          className="mt-2 w-full p-3 bg-neon-green rounded-lg text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-neon-green"
          aria-label="Submit query"
          title="Submit your query for AI analysis"
        >
          Submit
        </button>
      </form>
      {aiResponse && <p className="mt-4 text-neon-blue">{aiResponse}</p>}
    </motion.div>
  );
};

export default VoiceInput;