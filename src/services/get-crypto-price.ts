import { getCryptoPriceResponse } from "@/models/scrypto-price.type";
import api from "./axios";

export const getCryptoPrice = (
  token: string,
): Promise<getCryptoPriceResponse> =>
  api(`/crypto-price/${token}`, null, { method: "GET" }).then(
    (res) => res.data,
  );
