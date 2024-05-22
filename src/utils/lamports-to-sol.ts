import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export const lamportsToSol = (lamports: string | undefined| null) =>
  (Number(lamports) || 0) / LAMPORTS_PER_SOL;
