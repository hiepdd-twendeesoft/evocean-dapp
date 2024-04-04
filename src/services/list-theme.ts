import api from "./axios";

type PayLoad = {
  seller: string;
  theme_id: number;
  listing_price: number;
  sale_price: number;
};

export const listTheme = (payload: PayLoad) => api("/themes/listing", payload);
