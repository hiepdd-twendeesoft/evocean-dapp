import { IThemeCategory, ThemeFeature } from './theme.type';

export interface FetchThemeParams {
  page: number;
  take: number;
  author?: string;
  owner?: string;
  listing?: boolean;
  search?: string;
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
    format: string[];
    highlight: string[];
    live_preview: string;
    thumbnail: string;
  };
  owner_addresses: string[];
  token_mint: string;
  author_address: string;
  sale: null | {
    theme_id: number;
    price: string;
  };
  listing: null | {
    theme_id: number;
    price: string;
  };
  Transactions: TransactionTheme[];
  categories: IThemeCategory[];
  tags: IThemeTag[];
  themeCategories: { category: IThemCategory }[];
  themeTags: { tag: IThemCategory }[];
  themeFeatures: ThemeFeature[];
  linkPreview: string;
}

export type TransactionTheme = {
  buyer: string;
  id: number;
  kind: string;
  price: string;
  seller: string;
  theme_id: number;
  date: string;
};

export type TUploadTheme = {
  zip_file?: File;
  thumbnail?: File;
  previews?: File[];
};

export type IUploadThemeRes = {
  zip_file?: string;
  thumbnail?: string;
  previews?: string[];
};

export interface IThemCategory {
  id: number;
  createdAt: Date;
  name: string;
}
export interface IThemeTag {
  id: number;
  createdAt: Date;
  name: string;
}
