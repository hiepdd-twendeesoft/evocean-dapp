import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";

const useConvertDollar = (price: number) => {
  const { data } = useQuery({
    queryKey: ["getCurrencyUsd", price],
    queryFn: () => {
      return axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`
      );
    },
  });

  const value = useMemo(() => {
    if (data?.data?.solana?.usd) {
      return (price * data?.data?.solana?.usd).toFixed(1);
    }
    return (175 * price).toFixed(1);
  }, [data?.data?.solana?.usd, price]);

  return value;
};

export default useConvertDollar;
