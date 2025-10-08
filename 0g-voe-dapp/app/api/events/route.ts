import { NextResponse } from 'next/server';

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      setInterval(() => {
        const data = {
          hash: `0x${Math.random().toString(16).slice(2, 10)}`,
          data: `0x${Math.random().toString(16).slice(2, 20)}`,
          timestamp: Date.now(),
          from: `0x${Math.random().toString(16).slice(2, 10)}`,
          to: `0x${Math.random().toString(16).slice(2, 10)}`,
          value: (Math.random() * 10).toFixed(2),
          token: ['USDT', 'ETH', 'DAI'][Math.floor(Math.random() * 3)],
          eventName: ['Transfer', 'Approval', 'Swap'][Math.floor(Math.random() * 3)],
          number: Math.floor(Math.random() * 1000),
        };
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`);
      }, 5000);
    },
  });
  return new NextResponse(stream, {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}