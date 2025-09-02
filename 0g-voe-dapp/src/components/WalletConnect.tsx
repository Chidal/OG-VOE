"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit';

const WalletConnect: React.FC = () => {
  return (
    <div className="flex justify-end p-4">
      <ConnectButton
        showBalance={false}
        accountStatus="address"
        chainStatus="icon"
      />
    </div>
  );
};

export default WalletConnect;