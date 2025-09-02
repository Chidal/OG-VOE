import { NextResponse } from 'next/server';
import { Transaction, Block, AIInsight, WalletActivity } from '@/types';

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder();
      const sendEvent = () => {
        const events: (Transaction | Block | AIInsight | WalletActivity)[] = [
          {
            hash: `0x${Math.random().toString(16).slice(2, 10)}`,
            from: `0x${Math.random().toString(16).slice(2, 10)}`,
            to: `0x${Math.random().toString(16).slice(2, 10)}`,
            value: (Math.random() * 100).toFixed(2),
            tokenSymbol: ['USDT', 'WETH'][Math.floor(Math.random() * 2)],
            timestamp: new Date().toISOString(),
          },
          {
            number: Math.floor(Math.random() * 1000000),
            hash: `0x${Math.random().toString(16).slice(2, 10)}`,
            timestamp: new Date().toISOString(),
            gasUsed: (Math.random() * 1000000).toFixed(0),
            transactionCount: Math.floor(Math.random() * 100),
          },
          {
            type: ['summary', 'anomaly', 'prediction'][Math.floor(Math.random() * 3)] as any,
            message:
              Math.random() > 0.66
                ? `Detected ${Math.floor(Math.random() * 10)} large USDT transfers`
                : Math.random() > 0.33
                ? `Unusual activity in wallet 0x${Math.random().toString(16).slice(2, 10)}`
                : `High gas fees predicted in next block`,
            timestamp: new Date().toISOString(),
            confidence: Math.random(),
          },
          {
            address: `0x${Math.random().toString(16).slice(2, 10)}`,
            type: ['send', 'receive', 'contract'][Math.floor(Math.random() * 3)] as any,
            amount: (Math.random() * 100).toFixed(2),
            tokenSymbol: ['USDT', 'WETH'][Math.floor(Math.random() * 2)],
            timestamp: new Date().toISOString(),
          },
        ];

        const event = events[Math.floor(Math.random() * events.length)];
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(event)}\n\n`));
      };

      const interval = setInterval(sendEvent, 5000);
      return () => clearInterval(interval);
    },
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}