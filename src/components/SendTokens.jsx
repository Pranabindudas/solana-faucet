import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction} from "@solana/web3.js";


export function SendTokens() {
    const wallet = useWallet();
    const {connection} = useConnection();

    async function sendTokens() {
        let to = document.getElementById("to").value;
        let amount = document.getElementById("amount").value;
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
            fromPubkey: wallet.publicKey,
            toPubkey: new PublicKey(to),
            lamports: amount * LAMPORTS_PER_SOL,
        }));

        await wallet.sendTransaction(transaction, connection);
        alert("Sent " + amount + " SOL to " + to);
    }

    return <div className="flex items-center justify-center gap-3 mb-5">
        <input className="border-2 border-purple-400 text-center rounded-2xl" id="to" type="text" placeholder="To" />
        <input className="border-2 border-purple-400 text-center rounded-2xl" id="amount" type="text" placeholder="Amount" />
        <button className="border-2 border-blue-600 rounded-xl p-1 hover:bg-green-600 hover:text-white hover:border-none" onClick={sendTokens}>Send</button>
    </div>
}