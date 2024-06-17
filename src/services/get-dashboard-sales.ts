import api from "./axios";

type Sale = {
  date: string;
  status: string;
  product_name: string;
  price: number;
  earn: number;
};

type getDashboardSalesRes = {
  data: Sale[];
};

export async function getDashboardSales(): Promise<getDashboardSalesRes> {
  return api(`/dashboard/sales`, {}, { method: "GET" }).then((res) => res);
}
