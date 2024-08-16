import { IThemeItem } from './theme.type';

export interface ICreateCollection {
  collection_name: string;
  description: string;
  sellingPricing: string;
  percentageOfOwnership: string;
  ownershipPrice: string;
  linkPreview?: string;
  highlights?: string[];
  thumbnail: string;
  collectionCategories?: string[];
  collectionTags?: string[];
  collectionFeatureTypes?: string[];
  theme_ids?: string[];
  colleciton_id?: number;
}

export type TCreateCollectionSchema = {
  collection_name: string;
  description: string;
  sellingPricing: number;
  ownershipPrice: number;
  percentageOfOwnership: string;
  highlights?: string[];
  livePreviewLink?: string;
  collectionCategories?: number[];
  collectionTags?: number[];
  linkPreview?: string;
  feature_ids?: number[];
  thumbnail?: string;
};

export interface ICollection {
  id: number;
  name: string;
  theme_ids: number[];
  themes: IThemeItem[];
}

export type TCreateCollectionSChema = {
  collection_name: string;
};

export interface FetchCollectionParams {
  page: number;
  take: number;
  search?: string;
}

export enum ECollectionTab {
  OVERVIEW = 'Overview',
  FEATURES = 'Features',
  CHOOSE_PRODUCTS = 'ChooseProducts'
}
