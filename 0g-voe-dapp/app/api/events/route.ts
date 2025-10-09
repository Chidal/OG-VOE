import { NextResponse } from 'next/server';

export async function GET() {
  const stream = new ReadableStream({
    start(controller) {
      // Create interval to send mock events
      const interval = setInterval(() => {
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
        controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify(data)}\n\n`));
      }, 5000);

      // Cleanup function to close the stream
      return () => {
        clearInterval(interval);
        controller.close();
      };
    },
    cancel() {
      // This is called when the client closes the connection
      // No need to clear interval here since the `start` cleanup handles it
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