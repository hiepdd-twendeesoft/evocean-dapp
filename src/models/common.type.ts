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
    categories: string[];
    format: string[];
    hightlight: string[];
    live_preview: string;
    pages: string[];
  };
  owner_addresses: string[];
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
