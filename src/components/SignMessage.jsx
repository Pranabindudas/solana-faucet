import { ed25519 } from '@noble/curves/ed25519';
import { useWallet } from '@solana/wallet-adapter-react';
import bs58 from 'bs58';
import React from 'react';

export function SignMessage() {
    const { publicKey, signMessage } = useWallet();

    async function onClick() {
        if (!publicKey) throw new Error('Wallet not connected!');
        if (!signMessage) throw new Error('Wallet does not support message signing!');
        
        const message = document.getElementById("message").value;
        const encodedMessage = new TextEncoder().encode(message);
        const signature = await signMessage(encodedMessage);

        if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes())) throw new Error('Message signature invalid!');
        alert('success', `Message signature: ${bs58.encode(signature)}`);
    };

    return (
        <div className='flex items-center justify-center gap-5 mb-5'>
            <input className="border-2 border-purple-400 text-center rounded-2xl" id="message" type="text" placeholder="Message" />
            <button className="border-2 border-blue-600 rounded-xl p-1 hover:bg-green-600 hover:text-white hover:border-none" onClick={onClick}>
                Sign Message
            </button>
        </div>
    );
};