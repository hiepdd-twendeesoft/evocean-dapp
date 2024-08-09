import { ListData } from "@/models/common.type";
import api from "./axios";
import { FetchPayoutsParams, IPayoutItem } from "@/models/payout.type";
import { ApiPayouts, ApiThemes } from "./route";

export async function getDashboardPayout(
  params: FetchPayoutsParams,
): Promise<ListData<IPayoutItem>> {
  return api(ApiPayouts.fetchPayouts, null, {
    method: "GET",
    params,
  })
    .then((res) => res.data)
    .catch((err) => err);
}
