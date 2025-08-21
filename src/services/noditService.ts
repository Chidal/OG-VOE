import axios from 'axios';

const NODIT_API_KEY = process.env.REACT_APP_NODIT_API_KEY || 'your-api-key';

export const fetchNFTTrades = async (address: string, chain: string) => {
  const url = `https://web3.nodit.io/v1/${chain}/mainnet/nft/getNFTTransfersByAccount`;
  try {
    const response = await axios.post(
      url,
      {
        accountAddress: address,
        fromDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        toDate: new Date().toISOString(),
      },
      {
        headers: {
          'X-API-KEY': NODIT_API_KEY,
          'accept': 'application/json',
          'content-type': 'application/json',
        },
      }
    );
    return (response.data.transfers || []).map((tx: any) => ({
      ...tx,
      chain, // Add chain for visualization
      timestamp: tx.timestamp || new Date().toISOString(),
    }));
  } catch (error) {
    console.error('Error fetching NFT trades:', error);
    throw new Error('Failed to fetch NFT trades.');
  }
};

// Basic MCP Setup (Placeholder for Demo)
export const setupMCP = async () => {
  try {
    // Mock MCP response for demo
    console.log('Setting up Nodit MCP...');
    const mcpConfig = {
      mcpServers: {
        nodit: {
          command: 'npx',
          args: ['@noditlabs/nodit-mcp-server@latest'],
          env: { NODIT_API_KEY },
        },
      },
    };
    // In production, run MCP server and connect to LLM
    return { status: 'MCP ready', config: mcpConfig };
  } catch (error) {
    console.error('MCP setup failed:', error);
    throw new Error('Failed to initialize MCP.');
  }
};

// Stream API for Real-Time Updates
export const setupStream = (chain: string, callback: (event: any) => void) => {
  // Placeholder: Implement WebSocket connection
  console.log(`Setting up stream for ${chain}`);
  // Mock real-time data for demo
  const mockEvent = {
    transactionHash: '0x' + Math.random().toString(16).slice(2, 42),
    from: '0x' + Math.random().toString(16).slice(2, 42),
    to: '0x' + Math.random().toString(16).slice(2, 42),
    tokenId: Math.floor(Math.random() * 1000).toString(),
    value: (Math.random() * 0.5).toFixed(4),
    timestamp: new Date().toISOString(),
    chain,
  };
  const interval = setInterval(() => callback(mockEvent), 5000);
  return () => clearInterval(interval);
};