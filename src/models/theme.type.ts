export interface ITheme {
  id: number;
  zip_link: string;
  name: string;
  overview: string;
  media: {
    previews: string[];
    thumbnail: string;
    figma_features: any[];
    template_features: any[];
    categories: number[];
    format: string[];
    highlight: string[];
    live_preview: string;
    pages: string[];
    coverImages: string[];
    detailImages: string[];
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
  percentageOfOwnership: string;
  linkPreview?: string;
  categories: IThemeCategory[];
  tags: IThemeTag[];
}

export interface IThemeCategory {
  id: number;
  name: string;
}
export interface IThemeTag {
  id: number;
  name: string;
}

export interface IThemeItem {
  id: number;
  earning: string | null | undefined;
  price: string | null | undefined;
  name: string;
  sales: number;
  thumbnail: string;
}

export type TCreateTheme = {
  id?: number;
  zip_link?: string;
  name: string;
  overview: string;
  selling_price: number;
  owner_price: number;
  previews_links?: string[];
  thumbnail_link?: string;
  template_features: string[];
  figma_features: string[];
  highlight?: string[];
  coverImages: string[];
  detailImages: string[];
  fullPreviewImages: string[];
  status?: EThemeStatus;
  percentageOfOwnership: string;
  livePreviewLink?: string;
};

export type TCreateThemeSchema = {
  name: string;
  overview: string;
  selling_price: number;
  owner_price: number;
  template_features: string;
  figma_features: string;
  percentageOfOwnership: string;
  highlight?: string[];
  livePreviewLink?: string;
  categories?: number[];
  tags?: number[];
  linkPreview?: string;
};

export enum EThemeStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED'
}
