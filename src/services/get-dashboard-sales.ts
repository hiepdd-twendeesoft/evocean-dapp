import { ListData } from "@/models/common.type";
import api from "./axios";
import { ApiSales } from "./route";
import { FetchSalesParams, ISaleItem } from "@/models/sale.type";

export async function getDashboardSales(
  params: FetchSalesParams
): Promise<ListData<ISaleItem>> {
  return api(ApiSales.fetchSales, null, {
    method: "GET",
    params,
  })
    .then((res) => res.data)
    .catch((err) => err);
}
