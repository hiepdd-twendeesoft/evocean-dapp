import api from "./axios";

type PayLoad = {
  buyer: string;
  theme_id: number;
};

export const buyTheme = (payload: PayLoad) => api("/themes/buying", payload);
