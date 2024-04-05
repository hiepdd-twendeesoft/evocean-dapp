import { ItemTheme, ListData } from "@/models/common.type";
import api from "./axios";

type PayLoad = {
  seller: string;
  theme_id: number;
  listing_price: number;
  sale_price: number;
};

export const listTheme = (payload: PayLoad) => api("/themes/listing", payload);

export const detailTheme = (theme_id: number): Promise<ItemTheme> =>
  api(`/themes/${theme_id}`, null, { method: "GET" })
    .then((res) => res.data)
    .catch((err) => err);
