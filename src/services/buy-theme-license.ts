import api from './axios';

type PayLoad = {
  buyer: string;
  theme_id: number;
  tx_id: string;
  currency: 'sol';
};

export const buyLicenseTheme = (payload: PayLoad) =>
  api('/themes/license-buying', payload);
