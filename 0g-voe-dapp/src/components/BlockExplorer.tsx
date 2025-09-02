"use client";

import { useEffect, useState } from 'react';
import { Block } from '../types';

const BlockExplorer: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    const eventSource = new EventSource('/api/events');
    eventSource.onmessage = (event) => {
      const newBlock: Block = JSON.parse(event.data);
      setBlocks((prev) => [newBlock, ...prev].slice(0, 50));
    };
    return () => eventSource.close();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Block Explorer</h2>
      <div className="overflow-auto max-h-96">
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="p-2">Block Number</th>
              <th className="p-2">Hash</th>
              <th className="p-2">Timestamp</th>
              <th className="p-2">Gas Used</th>
              <th className="p-2">Tx Count</th>
            </tr>
          </thead>
          <tbody>
            {blocks.map((block) => (
              <tr
                key={block.number}
                className="border-t border-gray-700 cursor-pointer hover:bg-gray-700"
                onClick={() => setExpanded(expanded === block.number ? null : block.number)}
              >
                <td className="p-2">{block.number}</td>
                <td className="p-2 truncate">{block.hash.slice(0, 10)}...</td>
                <td className="p-2">{new Date(block.timestamp).toLocaleTimeString()}</td>
                <td className="p-2">{block.gasUsed}</td>
                <td className="p-2">{block.transactionCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlockExplorer;