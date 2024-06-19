export interface ISale {
    id: number;
    date: string;
    status: string;
    product_name: string;
    price: number;
    earn: number;
}
  
export interface ISaleItem {
      date: string;
      status: string;
      product_name: string;
      price: number;
      earn: number;
}


export interface FetchSalesParams {
  page: number;
  take: number;
}
