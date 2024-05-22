export interface getCryptoPriceResponse {
  id: number,
  token_id: string,
  token_symbol: string,
  price_usd: string,
  lasted_updated: string
}

export type PaymentParams =  {
  id: string,
  currencyCode: string,
  walletAddress: string,
  amount: string
}