export interface Transaction {
    hash: string;
    from: string;
    to: string;
    value: string;
    token: string;
    timestamp: number;
}

export interface Block {
    number: number;
    hash: string;
    timestamp: number;
    gasUsed: string;
    transactionCount: number;
}

export interface WalletActivity {
    address: string;
    type: 'send' | 'receive' | 'contract';
    amount: string;
    tokenSymbol: string;
    timestamp: string;
}

export interface AIInsight {
    type: 'summary' | 'anomaly' | 'prediction';
    message: string;
    timestamp: string;
    confidence?: number;
}


export interface EventLog {
  id: string;
  transactionHash: string;
  data: string;
  timestamp: number;
  eventName?: string;
  params?: Record<string, string>;
}