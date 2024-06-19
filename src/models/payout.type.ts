export interface IPayout {
    date: string;
  status: string;
  method: string;
  product_name: string;
  note: string;
  amount: number;
}
  
export interface IPayoutItem {
    date: string;
    status: string;
    method: string;
    product_name: string;
    note: string;
    amount: number;
}

export interface FetchPayoutsParams {
  page: number;
  take: number;
}
