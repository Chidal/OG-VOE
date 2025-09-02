"use client";

import { useEffect, useState } from 'react';
import { AIInsight } from '../types';

const AIInsights: React.FC = () => {
  const [insights, setInsights] = useState<AIInsight[]>([]);

  useEffect(() => {
    const eventSource = new EventSource('/api/events');
    eventSource.onmessage = (event) => {
      const newInsight: AIInsight = JSON.parse(event.data);
      setInsights((prev) => [newInsight, ...prev].slice(0, 20));
    };
    return () => eventSource.close();
  }, []);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-4">AI Insights</h2>
      <div className="space-y-4 max-h-96 overflow-auto">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-4 rounded ${
              insight.type === 'anomaly' ? 'bg-red-900' : insight.type === 'prediction' ? 'bg-blue-900' : 'bg-gray-700'
            }`}
          >
            <p className="text-white">{insight.message}</p>
            <p className="text-sm text-gray-400">{new Date(insight.timestamp).toLocaleTimeString()}</p>
            {insight.confidence && (
              <p className="text-sm text-gray-300">Confidence: {(insight.confidence * 100).toFixed(2)}%</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;