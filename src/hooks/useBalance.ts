import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";

const useBalance = (publicKey: PublicKey | null) => {
  const [balance, setBalance] = useState<number>(0);
  useEffect(() => {
    if (!publicKey) {
      return;
    }
    const connection = new Connection("https://api.mainnet-beta.solana.com");
    connection
      .getBalance(publicKey)
      .then((balance) => {
        setBalance(balance / 10 ** 9);
        console.log(balance / 10 ** 9); // Convert lamports to SOL
      })
      .catch((error) => {
        console.error("Error fetching balance:", error);
      });
  }, [publicKey]);

  return balance;
};

export default useBalance;
