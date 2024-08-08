import { FetchThemeParams, ItemTheme, ListData } from "@/models/common.type";
import api from "./axios";
import { ApiThemes } from "./route";
import { AxiosResponse } from "axios";

export function fetchThemes(
  params: FetchThemeParams,
): Promise<ListData<ItemTheme>> {
  return api(ApiThemes.fetchThemes, null, {
    method: "GET",
    params,
  })
    .then((res) => res.data)
    .catch((err) => err);
}
