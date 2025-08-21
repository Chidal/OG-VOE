import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QueryGallery: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);
  const mockQueries = [
    { text: 'Show NFT trades on Polygon', details: 'Displays recent NFT trades on the Polygon network.' },
    { text: 'Get portfolio for 0xABC...', details: 'Fetches portfolio details for address 0xABC... on Ethereum.' },
    { text: 'Analyze Aptos activity', details: 'Provides an overview of recent activity on Aptos.' },
  ];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="bg-gray-800 p-6 rounded-lg shadow-lg"
      role="region"
      aria-label="Query Gallery"
    >
      <h2 className="text-xl font-bold text-neon-green mb-4">Community Queries</h2>
      <ul className="list-disc pl-5 mb-4">
        {mockQueries.map((query, index) => (
          <li key={index} className="py-1">
            <button
              onClick={() => setSelectedQuery(query.text)}
              className="text-blue-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-neon-blue"
              aria-expanded={selectedQuery === query.text}
              aria-controls={`query-${index}`}
              title="Click to view query details"
            >
              {query.text}
            </button>
            {selectedQuery === query.text && (
              <div id={`query-${index}`} className="mt-2 pl-4 text-gray-300">
                {query.details}
              </div>
            )}
          </li>
        ))}
      </ul>
      {selectedQuery && (
        <button
          onClick={() => setSelectedQuery(null)}
          className="mt-4 p-2 bg-neon-green text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-neon-green"
          aria-label="Close query details"
          title="Close the selected query details"
        >
          Close Details
        </button>
      )}
    </motion.div>
  );
};

export default QueryGallery;