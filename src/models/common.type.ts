export interface FetchThemeParams {
  page: number;
  take: number;
  author?: string;
  owner?: string;
  listing?: boolean;
}

export interface ListData<T> {
  total: number;
  page: number;
  take: number;
  data: T[];
}

export interface ItemTheme {
  id: number;
  zip_link: string;
  name: string;
  overview: string;
  media: {
    previews: string[];
    figma_features: any[];
    template_features: any[];
  };
  owner_addresses: any[];
  token_mint: string;
  author_address: string;
  Sale: null | {
    theme_id: number;
    price: string;
  };
  Listing: null | {
    theme_id: number;
    price: string;
  };
}
