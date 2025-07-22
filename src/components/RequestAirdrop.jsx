import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function RequestAirdrop() {
    const { publicKey } = useWallet();
    const { connection } = useConnection();
    const [amount, setAmount] = useState("");

    const requestAirdrop = async () => {
        if (!publicKey) {
            alert("❌ Please connect your wallet first.");
            return;
        }

        const solAmount = parseFloat(amount);
        if (isNaN(solAmount) || solAmount <= 0) {
            alert("❌ Enter a valid amount (example: 1)");
            return;
        }

        try {
            const signature = await connection.requestAirdrop(
                publicKey,
                solAmount * LAMPORTS_PER_SOL
            );
            await connection.confirmTransaction(signature);
            alert(`✅ Airdropped ${solAmount} SOL to ${publicKey.toBase58()}`);
        } catch (err) {
            console.error(err);
            alert("❌ Airdrop failed: " + err.message);
        }
    };

    return (
        <div className="flex items-center justify-center gap-5 mb-5">
            <input
                className="border-2 border-purple-400 text-center rounded-2xl p-2"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />
            <button
                className="border-2 border-blue-600 rounded-xl px-4 py-2 hover:bg-green-600 hover:text-white hover:border-none"
                onClick={requestAirdrop}
            >
                Request Airdrop
            </button>
        </div>
    );
}
