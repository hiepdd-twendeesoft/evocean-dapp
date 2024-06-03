import api from "./axios";

type Payout = {
  date: string;
  status: string;
  method: string;
  product_name: string;
  note: string;
  amount: number;
};

type getDashboardPayoutRes = {
  data: Payout[];
};

export async function getDashboardPayout(): Promise<getDashboardPayoutRes> {
  return api(`/dashboard/payout`, {}, { method: "GET" }).then((res) => res);
}
