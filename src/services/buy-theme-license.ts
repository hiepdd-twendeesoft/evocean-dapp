import api from "./axios";

type PayLoad = {
  buyer: string;
  theme_id: number;
};

export const buyLicenseTheme = (payload: PayLoad) =>
  api("/themes/license-buying", payload);
