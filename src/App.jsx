import React, { useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

import '@solana/wallet-adapter-react-ui/styles.css';
import { RequestAirdrop } from './components/RequestAirdrop';
import { ShowSolBalance } from './components/ShowSolBalance';
import { SignMessage } from './components/SignMessage';
import { SendTokens } from './components/SendTokens';



function App() {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  return (
      <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={[]} autoConnect>
              <WalletModalProvider>
                <div className='justify-end flex gap-5 mb-5'>
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                </div>
                 <ShowSolBalance />
                <RequestAirdrop />
                {/* <Tokens /> */}
                <SignMessage />
                <SendTokens />
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>
  );
}

export default App