export interface Transaction {
    hash: string;
    from: string;
    to: string;
    value: string;
    tokenSymbol: string;
    timestamp: string;
}

export interface Block {
    number: number;
    hash: string;
    timestamp: string;
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