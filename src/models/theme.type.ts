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
  fileUrl: string;
  themeFeatures: ThemeFeature[];
}

export interface ThemeFeature {
  features: {
    name: string;
    id: number;
  }[];
  type: IThemeType;
}

export interface IThemeType {
  id: number;
  name: string;
  iconUrl: string;
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
  highlight?: string[];
  coverImages?: string[];
  detailImages?: string[];
  fullPreviewImages?: string[];
  status?: EThemeStatus;
  percentageOfOwnership: string;
  livePreviewLink?: string;
  feature_ids?: number[];
  theme_id?: number;
};

export type TCreateThemeSchema = {
  name: string;
  overview: string;
  selling_price: number;
  owner_price: number;
  percentageOfOwnership: string;
  highlight?: string[];
  livePreviewLink?: string;
  categories?: number[];
  tags?: number[];
  linkPreview?: string;
  feature_ids?: number[];
  thumbnail_link?: string;
};

export enum EThemeStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED'
}

export interface IThemeFeatureType {
  id: number;
  name: string;
  createdAt?: string;
  iconUrl: string;
}
export interface IFeatureTag {
  id: number;
  name: string;
  featureTypeId: number;
  createdAt: string;
  iconUrl: string;
}

export interface ICreateThemeResponse {
  themId: number;
  createdAt: string;
}
