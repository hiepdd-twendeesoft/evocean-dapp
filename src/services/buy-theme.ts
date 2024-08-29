import api from './axios';

type PayLoad = {
  buyer: string;
  theme_id: number;
  tx_id: string;
  currency: 'sol';
};

export const buyTheme = async (payload: PayLoad) => {
  return api('/themes/buying', payload);
};
