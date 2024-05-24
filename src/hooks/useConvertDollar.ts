
import { getCryptoPrice } from "@/services/get-crypto-price";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const useConvertDollar = (price: number) => {
  // const { data } = useQuery({
  //   queryKey: ["getCurrencyUsd", price],
  //   queryFn: () => {
  //     return axios.get(
  //       `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`
  //     );
  //   },
  // });
  
  const { data } = useQuery({
    queryKey: ["get-scrypto-price"],
    queryFn: () => getCryptoPrice('solana'),
    enabled: !!price
  });

  const value = useMemo(() => {
    if (data?.price_usd) {
      return (price * Number(data?.price_usd)).toFixed(1);
    }
    return (175 * price).toFixed(1);
  }, [(data?.price_usd), price]);

  return value;
};

export default useConvertDollar;
